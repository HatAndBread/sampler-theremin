import { Player, Destination, ToneAudioBuffer, AmplitudeEnvelope } from 'tone';
export default class AudioPlayer {
  envelope: AmplitudeEnvelope;
  envelope2: AmplitudeEnvelope;
  player: Player;
  player2: Player;
  players: Player[];
  envelopes: AmplitudeEnvelope[];
  currentPlayerNumber: number;
  buffer: ToneAudioBuffer;
  play: () => void;
  setBuffer: (buff: ToneAudioBuffer) => void;
  constructor(buffer: ToneAudioBuffer){
    const options = {
      attack: 0.3,
      decay: 0.2,
      sustain: 1.0,
      release: 0.3
    }
    this.envelope = new AmplitudeEnvelope(options).connect(Destination);
    this.envelope2 = new AmplitudeEnvelope(options).connect(Destination);
    this.envelopes = [this.envelope, this.envelope2];
    this.player = new Player().connect(this.envelope);
    this.player2 = new Player().connect(this.envelope2);
    this.players = [this.player, this.player2];
    this.currentPlayerNumber = 0;
    this.players.forEach((p) => p.loop = true);
    this.buffer = buffer;
    this.setBuffer = (buff: ToneAudioBuffer) => {
      this.buffer = buff;
      this.player.buffer = buff;
      this.player2.buffer = buff;
      this.player.start();
      setTimeout(() => this.player2.start(), 300);
    };
    this.setBuffer(buffer);
    this.play = () => {
      if (!this.buffer) return console.warn('buffer is not initialized');
      this.currentPlayerNumber ? this.currentPlayerNumber = 0 : this.currentPlayerNumber = 1;
      const notPlayingPlayerNumber = this.currentPlayerNumber ? 0 : 1;
      this.envelopes[notPlayingPlayerNumber].triggerRelease();
      this.envelopes[this.currentPlayerNumber].triggerAttack();
    }
  }
}
