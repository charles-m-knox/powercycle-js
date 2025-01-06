import * as Ant from 'ant-plus-next';
import { watch } from 'chokidar';
import { readFile, unlink, writeFile } from 'fs/promises';

import { logger } from '../shared/logger/logger';
import { CONTROL_FILE, QUIT_FILE, RECONNECT_FILE, STATS_FILE } from '../shared/lib/file';
import { AntConfig, FitnessData } from './types';
import { inotifyFiles, state } from './state';
import { readOrCreatePower } from './files';

export const onFesData = (data: FitnessData) => {
  logger.debug(`id: ${data.DeviceId}`);
};

export const onFeData = async (data: FitnessData) => {
  logger.debug(`fe fitnessData id: ${data.DeviceId}`);
  logger.debug(`fe fitnessData ${JSON.stringify(data)}`);
  const logs: string[] = [];
  if (data?.InstantaneousPower) logs.push(`Power: ${data?.InstantaneousPower}/${state.target}`);
  if (data?.Cadence) logs.push(`Cadence: ${data?.Cadence}`);
  if (data?.ElapsedTime) logs.push(`ElapsedTime: ${Math.round(data?.ElapsedTime)}`);
  if (logs.length > 0) logger.info(logs.join('\t|\t'));
  try {
    await writeFile(STATS_FILE, logs.join('\n'));
  } catch (e) {
    logger.error(`failed to write stats: ${e}`);
  }
};

export const onFeAttached = (fe: Ant.FitnessEquipmentSensor) => async () => {
  logger.info('fe sensor attached');

  try {
    await unlink(RECONNECT_FILE);
  } catch {
    /* empty */
  }

  setInterval(async () => {
    if (state.target === state.previous) return;
    logger.info(`new power target ${state.target} (prev: ${state.previous})`);

    fe.setTargetPower(state.target, (result) => {
      if (!result) {
        logger.warn('failed to set target power');
        return;
      }
      state.previous = state.target;

      logger.info(`set target power to ${state.target}`);
    });

    logger.info(`setting target power to ${state.target}`);
  }, 500);
};

export const onStartup = (fe: Ant.FitnessEquipmentSensor, antConfig: AntConfig) => async () => {
  // logger.info('startup scan');
  // await fes.scan();
  // logger.info('scan done');

  const watcher = watch(inotifyFiles, {
    persistent: true,
    // awaitWriteFinish: true,
    cwd: process.cwd(),
  });

  const react = async (path: string) => {
    logger.info(`${path} change detected`);
    try {
      if (path.includes(CONTROL_FILE)) {
        const newTarget = await readOrCreatePower();
        if (!newTarget) return;
        state.target = newTarget;
      } else if (path.includes(QUIT_FILE)) {
        try {
          const quitTimeBuf = await readFile(QUIT_FILE);

          if (!quitTimeBuf) return;

          const quitTimeStr = quitTimeBuf.toString();
          if (!quitTimeStr) return;

          logger.info('quit request detected, detaching...');

          await fe.detach();

          logger.info('exiting now.');

          process.exit(0);
        } catch (err) {
          logger.error('failed to process quit request', err);
        }
      } else if (path.includes(RECONNECT_FILE)) {
        try {
          await fe.detach();
          logger.info('detaching, will reattach in 3 seconds...');
          setTimeout(async () => {
            try {
              await fe.attach(antConfig.channelId, antConfig.deviceId);
            } catch (e) {
              logger.error('failed to reattach', e);
            }
          }, 3000);
        } catch (e) {
          logger.error(`failure detaching`, e);
        }
      }
    } catch (err) {
      logger.error('react failure', err);
    }
  };

  watcher.on('add', react).on('change', react) /* .on('unlink', react) */;
  watcher.on('error', (e) => logger.error('watcher error', e));
  watcher.on('ready', () => logger.info('watcher ready'));

  await fe.attach(antConfig.channelId, antConfig.deviceId);
};
