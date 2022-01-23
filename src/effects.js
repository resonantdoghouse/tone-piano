import { JCReverb, Phaser } from 'tone';

export const reverb = new JCReverb({
  roomSize: 0.85,
  wet: 0.1,
}).toDestination();

export const phaser = new Phaser({
  frequency: 0.06,
  octaves: 3,
  stages: 12,
  Q: 3,
  wet: 0.2,
  baseFrequency: 350,
}).toDestination();
