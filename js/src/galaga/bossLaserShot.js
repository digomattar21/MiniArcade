class LaserShot {
  constructor(canvas, x, y, speedX, speedY) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.x = x;
    this.y = y;
    this.speedX = speedX;
    this.speedY = speedY;
    this.slope = 0;
  }

  drawLaser(dir) {
    this.ctx.strokeStyle = "#f50000";
    this.ctx.lineWidth = 6;
    switch (dir) {
      case "left":
        this.ctx.beginPath();
        this.ctx.moveTo(this.x, this.y);
        this.ctx.lineTo(this.x - 150, this.canvas.height);
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.beginPath();
        this.ctx.moveTo(this.x + 120, this.y);
        this.ctx.lineTo(this.x - 30, this.canvas.height);
        this.ctx.stroke();
        this.ctx.closePath();
        //this.slope = (this.canvas.height-this.y)/((this.x-150)-this.x)
        break;
      case "left-mid":
        this.ctx.beginPath();
        this.ctx.moveTo(this.x, this.y);
        this.ctx.lineTo(this.x - 60, this.canvas.height);
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.beginPath();
        this.ctx.moveTo(this.x + 120, this.y);
        this.ctx.lineTo(this.x + 60, this.canvas.height);
        this.ctx.stroke();
        this.ctx.closePath();
        //this.slope = (this.canvas.height-this.y)/((this.x-60)-this.x)
        break;
      case "mid":
        this.ctx.beginPath();
        this.ctx.moveTo(this.x + 15, this.y);
        this.ctx.lineTo(this.x + 15, this.canvas.height);
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.beginPath();
        this.ctx.moveTo(this.x + 125, this.y);
        this.ctx.lineTo(this.x + 125, this.canvas.height);
        this.ctx.stroke();
        this.ctx.closePath();
        //this.slope = 100000000;
        break;
      case "mid-open":
        this.ctx.beginPath();
        this.ctx.moveTo(this.x + 10, this.y);
        this.ctx.lineTo(this.x - 20, this.canvas.height);
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.beginPath();
        this.ctx.moveTo(this.x + 130, this.y);
        this.ctx.lineTo(this.x + 150, this.canvas.height);
        this.ctx.stroke();
        this.ctx.closePath();
        //this.slope = (this.canvas.height-this.y)/((this.x-150)-this.x)
        break;
      case "right":
        this.ctx.beginPath();
        this.ctx.moveTo(this.x + 10, this.y);
        this.ctx.lineTo(this.x + 110, this.canvas.height);
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.beginPath();
        this.ctx.moveTo(this.x + 130, this.y);
        this.ctx.lineTo(this.x + 230, this.canvas.height);
        this.ctx.stroke();
        this.ctx.closePath();
        break;
      case "right-mid":
        this.ctx.beginPath();
        this.ctx.moveTo(this.x + 20, this.y);
        this.ctx.lineTo(this.x + 80, this.canvas.height);
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.beginPath();
        this.ctx.moveTo(this.x + 135, this.y);
        this.ctx.lineTo(this.x + 185, this.canvas.height);
        this.ctx.stroke();
        this.ctx.closePath();
        break;
    }

    this.updateSelf();
  }

  updateSelf() {
    if (this.y > 600) {
      this.laserFired.splice(0, 1);
    }
  }
}
