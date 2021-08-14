import { initializeRecorder } from './mic';
import { initializePlayer } from './audio-player';
export const initializeInstruments = () => {
  initializeRecorder();
  initializePlayer();
}
