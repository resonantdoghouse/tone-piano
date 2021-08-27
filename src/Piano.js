class Piano {
  constructor(keys) {
    this.keys = keys;
    this.keyElements = [];
  }

  setup(keyHandler) {
    this.pianoElement = document.createElement('div');
    this.pianoElement.classList.add('piano');
    this.keys.forEach((key) => {
      const keyElement = document.createElement('div');
      keyElement.classList.add('piano__key');
      keyElement.innerText = key;
      keyElement.addEventListener('click', () => keyHandler(key));
      this.pianoElement.appendChild(keyElement);
      this.keyElements.push(keyElement);
    });
  }

  appendTo(el) {
    el.appendChild(this.pianoElement);
  }
}

export default Piano;
