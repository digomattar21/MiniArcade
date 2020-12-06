class Shot {
  constructor(canvas, shotX, shotY) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.speedY = -8;
    this.shotX = shotX;
    this.shotY = shotY;
    this.image;
  }


  drawRegular() {
    this.ctx.fillStyle = "#e83bad";
    this.ctx.fillRect(this.shotX - 2.5, this.shotY, 5, 10);
    this.updateSelf();
  }

  updateSelf() {
    this.shotY += this.speedY;
  }
}
