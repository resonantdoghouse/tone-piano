export default class InputElement {
  constructor(type, value, label) {
    this.type = type;
    this.value = value;
    this.label = label;
    this.inputElement;
  }

  setup(eventHandler) {
    this.inputElement = document.createElement('input');

    if (this.label) {
      this.inputLabel = document.createElement('label');
      this.inputLabel.innerText = this.label;
    }
    if (this.type) {
      this.inputElement.setAttribute('type', this.type);
    } else {
      this.inputElement.setAttribute('type', 'text');
    }
    if (this.value) {
      this.inputElement.value = this.value;
    }

    switch (this.type) {
      case 'text':
        this.inputElement.addEventListener('change', eventHandler);
        break;
      case 'number':
        this.inputElement.addEventListener('change', eventHandler);
        break;
      default:
        this.inputElement.addEventListener('click', eventHandler);
    }
  }

  appendTo(element) {
    if (this.label) {
      element.appendChild(this.inputLabel);
    }
    element.appendChild(this.inputElement);
  }
}
