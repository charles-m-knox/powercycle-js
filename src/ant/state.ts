import { CONTROL_FILE, QUIT_FILE, RECONNECT_FILE } from '../shared/lib/file';
import { PowerState } from './types';

export const inotifyFiles = [CONTROL_FILE, RECONNECT_FILE, QUIT_FILE];

/**
 * Shared state across multiple event handlers
 */
export const state: PowerState = {
  previous: 0,
  target: 0,
};
