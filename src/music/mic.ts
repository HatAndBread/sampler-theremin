import {UserMedia, Meter, Recorder, ToneAudioBuffer } from 'tone';
import  AudioPlayer from './audio-player';

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
      await recorder.start();
      meterInterval = setInterval(()=> meter && console.log(meter.getValue()), 100);
    }
  }
  catch(err){
    console.log(err);
  }
}

export const stopMic = async () => {
  if (mic && recorder) {
    mic.close();
    mic.disconnect(recorder);
    clearInterval(meterInterval);
    const recording = await recorder.stop();
    const url = URL.createObjectURL(recording);
    const buff = new ToneAudioBuffer(url, () => {
      // @ts-ignore
      let buffArray = buff.toMono().toArray();
      console.log(buffArray);
      if (buffArray[0]){ // remove silence for firefox
        // @ts-ignore
        buffArray = buffArray.filter(i => !(i > 0 && i < 0.000001));
        // @ts-ignore
        buffArray = buffArray.filter(i => !(i < 0 && i > -0.000001));
        console.log('hey ho!')
      }else{
        // @ts-ignore
        buffArray = buffArray.filter(i => i); // remove silence
      }
      console.log(buffArray);
      buff.fromArray(buffArray)
      console.log(buff, 'this is buf!')
      const ap = new AudioPlayer(buff);
      ap.play()
    });
  }
}
