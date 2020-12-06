class EnemyShot {
  constructor(canvas, x, y) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.shotX = x;
    this.shotY = y;
    this.speedY = 3;
  }

  drawRegular() {
    this.ctx.fillStyle = "#e8ee11";
    this.ctx.fillRect(this.shotX - 2.5, this.shotY, 5, 10);
    this.updateSelf();
  }

  updateSelf() {
    this.shotY += this.speedY;
  }
}
