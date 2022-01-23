import * as Tone from 'tone';
import './style.css';

import Piano from './Piano';
import InputElement from './ui/InputElement';

// song data
import avril14 from './songs/avril14.json';
import canon from './songs/canon.json';
import jynweythekYlow from './songs/jynweythekYlow.json';
import pianoKeys from './pianoKeys';

const root = document.getElementById('root');

/*
 * Config vars
 */
const songs = [
  { title: 'Avril 14', artist: 'Aphex Twin', data: avril14 },
  { title: 'Canon', artist: 'Johann Pachelbel', data: canon },
  { title: 'Jynweythek Ylow', artist: 'Aphex Twin', data: jynweythekYlow },
];

let songData = randomFromArray(songs).data;

let playing = false;
let bpm = (Tone.Transport.bpm.value = songData.header.bpm || '120');
let piano, melodyPart, bassPart;

/*
 * Effects
 */
const reverb = new Tone.JCReverb({
  roomSize: 0.85,
  wet: 0.1,
}).toDestination();

const phaser = new Tone.Phaser({
  frequency: 0.06,
  octaves: 3,
  stages: 12,
  Q: 3,
  wet: 0.2,
  baseFrequency: 350,
}).toDestination();

const pianoSampler = new Tone.Sampler(
  {
    A0: 'A0.[mp3|ogg]',
    C1: 'C1.[mp3|ogg]',
    'D#1': 'Fs1.[mp3|ogg]',
    'F#1': 'Fs1.[mp3|ogg]',
    A1: 'A1.[mp3|ogg]',
    C2: 'C2.[mp3|ogg]',
    'D#2': 'Ds2.[mp3|ogg]',
    'F#2': 'Fs2.[mp3|ogg]',
    A2: 'A2.[mp3|ogg]',
    C3: 'C3.[mp3|ogg]',
    'D#3': 'Ds3.[mp3|ogg]',
    'F#3': 'Fs3.[mp3|ogg]',
    A3: 'A3.[mp3|ogg]',
    C4: 'C4.[mp3|ogg]',
    'D#4': 'Ds4.[mp3|ogg]',
    'F#4': 'Fs4.[mp3|ogg]',
    A4: 'A4.[mp3|ogg]',
    C5: 'C5.[mp3|ogg]',
    'D#5': 'Ds5.[mp3|ogg]',
    'F#5': 'Fs5.[mp3|ogg]',
    A5: 'A5.[mp3|ogg]',
    C6: 'C6.[mp3|ogg]',
    'D#6': 'Ds6.[mp3|ogg]',
    'F#6': 'Fs6.[mp3|ogg]',
    A6: 'A6.[mp3|ogg]',
    C7: 'C7.[mp3|ogg]',
    'D#7': 'Ds7.[mp3|ogg]',
    'F#7': 'Fs7.[mp3|ogg]',
    A7: 'A7.[mp3|ogg]',
    C8: 'C8.[mp3|ogg]',
  },
  {
    release: 1,
    baseUrl: './audio/piano-samples/',
    onload: () => {
      console.log('pianoSampler samples loaded');
    },
  }
).toDestination();

let musicPartsCreated = false;

function musicParts(pianoKeyElements) {
  // melody music part
  melodyPart = new Tone.Part(function (time, note) {
    pianoSampler.triggerAttackRelease(
      note.name,
      note.duration,
      time,
      note.velocity
    );
    keyPlaying(note, pianoKeyElements, 'rh');
  }, songData.tracks[0].notes).start();

  // bass music part
  bassPart = new Tone.Part(function (time, note) {
    pianoSampler.triggerAttackRelease(
      note.name,
      note.duration,
      time,
      note.velocity
    );
    keyPlaying(note, pianoKeyElements, 'lh');
  }, songData.tracks[1].notes).start();
  musicPartsCreated = true;
}

function keyPlaying(note, pianoKeyElements, hand) {
  const keyElement = pianoKeyElements.find(
    (element) => element.getAttribute('data-note') === note.name
  );
  if (keyElement) {
    if (hand === 'rh') {
      keyElement.classList.add('piano__key--rh-active');
    } else if (hand === 'lh') {
      keyElement.classList.add('piano__key--lh-active');
    }
    setTimeout(() => {
      keyElement.classList.remove('piano__key--lh-active');
      keyElement.classList.remove('piano__key--rh-active');
    }, note.duration * 1000);
  }
}

function playSong(playBtn, pianoKeyElements) {
  if (!playing) {
    Tone.Transport.start();
    playing = true;
    playBtn.innerText = 'stop';
    if (!musicPartsCreated) {
      musicParts(pianoKeyElements);
    }
  } else {
    Tone.Transport.stop();
    playing = false;
    playBtn.innerText = 'play';
  }
  if (Tone.context.state !== 'running') {
    Tone.context.resume();
  }
}

function handleKeyPress(key) {
  pianoSampler.triggerAttackRelease([key], 0.5);
}

function init() {
  piano = new Piano(pianoKeys);
  piano.setup(handleKeyPress);
  piano.appendTo(root);

  const playBtn = document.createElement('button');
  playBtn.classList.add('play-btn');
  playBtn.innerText = 'play';
  playBtn.addEventListener('click', () => {
    playSong(playBtn, piano.keyElements);
  });
  root.appendChild(playBtn);

  const bpmInputElement = new InputElement('number', bpm, 'bpm');
  bpmInputElement.setup(handleBPMInputChange);
  bpmInputElement.appendTo(root);

  const changeSongButton = new InputElement('button', 'random song');
  changeSongButton.setup(handleChangeSong);
  changeSongButton.appendTo(root);
}

function handleChangeSong(event) {
  musicPartsCreated = false;
  songData = randomFromArray(songs).data;
  melodyPart.clear();
  bassPart.clear();
  musicParts(piano.keyElements);
}

function handleBPMInputChange(event) {
  bpm = event.target.value;
  Tone.getTransport().bpm.rampTo(bpm, 0.5);
}

function randomFromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}

init();
