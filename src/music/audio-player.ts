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
      attack: 0.1,
      decay: 0.1,
      sustain: 1.0,
      release: 0.1,
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
      this.player.fadeIn = 0.3;
      this.player.fadeOut = 0.1;
      this.player2.fadeIn = 0.1;
      this.player2.fadeOut = 0.3;
      this.player.start();
      this.player2.start();
    };
    this.setBuffer(buffer);
    this.play = () => {
      if (!this.buffer) return console.warn('buffer is not initialized');
      const alternatePlayers = () => {
        const notPlayingPlayerNumber = this.currentPlayerNumber ? 0 : 1;
        this.players[notPlayingPlayerNumber].restart();
        this.envelopes[notPlayingPlayerNumber].triggerAttack();
        setTimeout(()=>{
          this.envelopes[this.currentPlayerNumber].triggerRelease();
          this.currentPlayerNumber ? this.currentPlayerNumber = 0 : this.currentPlayerNumber = 1;
          setTimeout(alternatePlayers, (this.buffer.duration * 1000) - 200);
        }, 100);
      }
      this.envelopes[this.currentPlayerNumber].triggerAttack();
      setTimeout(alternatePlayers, (this.buffer.duration * 1000) - 200);
    }
  }
}
