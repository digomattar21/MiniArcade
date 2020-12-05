class Shot {
  constructor(canvas, shotX, shotY) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.speedY = -8;
    this.shotX = shotX;
    this.shotY = shotY;
    this.image;
  }

  drawFirstBuff() {
    this.image = new Image();
    this.image.src = "../../../img/laser.png";
    this.image.onload=()=>{
    this.ctx.drawImage(this.image, this.shotX - 15, this.shotY + 40, 30, 40);}
    this.updateSelf()
  }

  drawRegular () {
    this.ctx.fillStyle = "#e83bad";
    this.ctx.fillRect(this.shotX-2.5, this.shotY, 5, 10);
    this.updateSelf();
  }

  updateSelf() {
    this.shotY += this.speedY;
  }
}
