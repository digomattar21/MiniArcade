class BossShot {
    constructor(canvas, shotX, shotY) {
      this.canvas = canvas;
      this.ctx = this.canvas.getContext("2d");
      this.speedY = 1;
      this.shotX = shotX;
      this.shotY = shotY;
      this.image;
    }
  
  
    drawRegular() {
      this.ctx.fillStyle = "lawngreen";
      //this.ctx.arc(this.shotX,this.shotY,5,0,Math.PI*2);
      this.ctx.fillRect(this.shotX,this.shotY,10,10)
      this.updateSelf();
    }
  
    updateSelf() {
      this.shotY += this.speedY;
      
    }
  }