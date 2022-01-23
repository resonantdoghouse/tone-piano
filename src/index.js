// import * as Tone from 'tone';
import './style.css';
import pianoSampler from './pianoSampler';
// import { reverb, phaser } from './effects';
import p5 from 'p5';
import Point from './Point';
import Line from './Line';
import notes from './notes';

// utils
const bpmToFps = (bpm) => Number((bpm / 60).toFixed(1));

const root = document.getElementById('root');

root.innerHTML = `p5 with tone random music`;

const state = {
  prevNote: null,
  isPlaying: false,
};

const points = [];
const colors = [
  'skyblue',
  'magenta',
  'darkorchid',
  'blue',
  'coral',
  'forestgreen',
];

const sketch = (s) => {
  s.setup = () => {
    s.createCanvas(window.innerWidth * 0.9, window.innerHeight * 0.9);
    s.frameRate(bpmToFps(160));

    notes.forEach((note) => {
      let point = new Point(
        s.random(10, s.width - 20),
        s.random(100, s.height - 100),
        s.random(colors),
        note,
        s
      );
      points.push(point);
    });
  };

  s.mousePressed = () => {
    state.isPlaying = !state.isPlaying;
  };

  s.draw = () => {
    s.background(242);

    if (pianoSampler.loaded) {
      let note = s.random(notes);

      points.forEach((point) => {
        if (state.isPlaying && point.note === note) {
          state.prevNote = note;
          point.highlight();
        } else {
          point.removeHighlight();
        }
        point.render(s);
      });

      if (state.isPlaying) {
        state.isPlaying && pianoSampler.triggerAttackRelease(note, 0.1);
        s.push();
        s.textSize(24);
        s.text(note, s.width * 0.5, s.height * 0.5);
        s.pop();
      } else {
        s.push();
        s.textSize(24);
        s.text('play', s.width * 0.5, s.height * 0.5);
        s.pop();
      }
    }
  };
};

const sketchInstance = new p5(sketch);
