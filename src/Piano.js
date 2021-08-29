class Piano {
  constructor(keys) {
    this.keys = keys;
    this.keyElements = [];
  }

  setup(keyHandler) {
    let enableKeyText = false;
    this.pianoElement = document.createElement('div');
    this.pianoElement.classList.add('piano');
    this.keys.forEach((key) => {
      const keyElement = document.createElement('div');
      keyElement.classList.add('piano__key');
      if (key.includes('#')) {
        keyElement.classList.add('piano__key--sharp');
      }
      if (enableKeyText) {
        const keyText = key.substring(0, 2);
        keyElement.innerText = keyText;
      }
      keyElement.setAttribute('data-note', key);
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
