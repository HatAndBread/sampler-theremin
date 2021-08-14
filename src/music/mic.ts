import {UserMedia, Meter, Recorder, ToneAudioBuffer } from 'tone';
import { getPlayer } from './audio-player';

let recorder: null | Recorder = null;
let meter: null | Meter = null;
let mic: null | UserMedia = null;

export const initializeRecorder = () => {
  meter = new Meter();
  mic = new UserMedia();
  recorder = new Recorder();
}

let meterInterval = 0;
export const recordMic = async () => {
  try{
    if (mic && meter && recorder) {
      await mic.open();
      mic.connect(recorder);
      mic.connect(meter);
      meterInterval = setInterval(()=> meter && console.log(meter.getValue()), 100);
      recorder.start();
    }
  }
  catch(err){
    console.log(err);
  }
}

export const stopMic = async () => {
  if (mic && recorder){
    mic.close();
    mic.disconnect(recorder);
    clearInterval(meterInterval);
    const recording = await recorder.stop();
    const url = URL.createObjectURL(recording);
    const buff = new ToneAudioBuffer(url, () => {
      const player = getPlayer();
      if (player){
        player.buffer = buff;
        player.loop = true;
        player.start();
      }
      console.log(buff, 'this is the buffer!');
    });
  }
}
