import { Player, Destination } from 'tone';

let player: null | Player = null;

export const initializePlayer = () => {
  player = new Player();
  player.connect(Destination);
}

export const getPlayer = () => player
