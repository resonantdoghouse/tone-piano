class Point {
  constructor(x, y, color, note, p5) {
    this.x = x;
    this.y = y;
    this.color = p5.color(color);
    this.color.setAlpha(100);
    this.opacity = 0.5;
    this.prevNote = null;
    this.note = note;
  }

  highlight() {
    this.color.setAlpha(255);
  }

  removeHighlight() {
    this.color.setAlpha(100);
  }

  render(s) {
    s.push();
    s.fill(this.color);
    s.circle(this.x, this.y, 20);
    s.pop();
  }
}

export default Point;
