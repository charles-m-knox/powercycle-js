import { readFile, unlink, writeFile } from 'fs/promises';
import { RECONNECT_FILE, QUIT_FILE, CONTROL_FILE } from '../shared/lib/file';
import { logger } from '../shared/logger/logger';

export const resetFiles = async () => {
  try {
    await unlink(RECONNECT_FILE);
  } catch {
    /* empty */
  }
  try {
    await writeFile(QUIT_FILE, '');
  } catch {
    /* empty */
  }
};

export const readOrCreatePower = async (): Promise<number | null> => {
  try {
    const data = await readFile(CONTROL_FILE, 'utf8');
    if (!data) return null;
    return Promise.resolve(parseInt(data));
  } catch (err) {
    logger.error('failed to read control file', err);
    return Promise.resolve(null);
  }
};
