class SprayShot {
  constructor(canvas, x, y) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.x = x;
    this.y = y;
    this.speedY = -6;
    this.x2 = this.x;
    this.y2 = this.y;
    this.x3 = this.x;
    this.y3 = this.y;
  }

  drawSelf() {
    this.ctx.fillStyle = "lawngreen";
    this.ctx.fillRect(this.x - 2.5, this.y, 5, 10);
    this.ctx.fillRect(this.x2 - 2.5, this.y2, 5, 10);
    this.ctx.fillRect(this.x3 - 2.5, this.y3, 5, 10);
    this.updateSelf();
  }

  updateSelf() {
    this.y += this.speedY;
    this.x += 0;
    this.x2 += 0.5;
    this.y2 += this.speedY;
    this.x3 += -0.5;
    this.y3 += this.speedY;
  }
}
