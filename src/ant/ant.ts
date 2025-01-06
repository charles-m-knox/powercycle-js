import * as Ant from 'ant-plus-next';

import { logger } from '../shared/logger/logger';
import { resetFiles } from './files';
import { onFeAttached, onFeData, onFesData, onStartup } from './events';
import { AntConfig } from './types';

export const setupAnt = async (antConfig: AntConfig) => {
  await resetFiles();
  const stick = new Ant.GarminStick3();
  const fe = new Ant.FitnessEquipmentSensor(stick);
  const fes = new Ant.FitnessEquipmentScanner(stick);

  fes.on('fitnessData', onFesData);
  fe.on('fitnessData', onFeData);
  fe.on('attached', onFeAttached(fe));
  stick.on('startup', onStartup(fe, antConfig));

  const result = await stick.open();
  if (!result) logger.error('Stick not found!');
};

const channelId = process.env.POWERCYCLE_ANT_CHANNEL_ID
  ? parseInt(process.env.POWERCYCLE_ANT_CHANNEL_ID)
  : 0;

const deviceId = process.env.POWERCYCLE_ANT_DEVICE_ID
  ? parseInt(process.env.POWERCYCLE_ANT_DEVICE_ID)
  : 5555;

logger.info('starting up');
setupAnt({ channelId, deviceId })
  .then(() => {
    logger.info('done');
  })
  .catch((e) => logger.error(e));
