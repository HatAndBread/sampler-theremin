import {UserMedia, Meter, Destination } from 'tone';

let meter: null | Meter = null;
let mic: null | UserMedia = null;

export const initializeRecorder = () => {
  meter = new Meter();
  mic = new UserMedia();
}

let meterInterval = 0;
export const recordMic = async () => {
  try{
    if (mic && meter){
      await mic.open();
      mic.connect(meter);
      meterInterval = setInterval(()=> meter && console.log(meter.getValue()), 100);
    }
  }
  catch(err){
    console.log(err);
  }
}

export const stopMic = () => {
  mic && mic.close();
  clearInterval(meterInterval);
}
