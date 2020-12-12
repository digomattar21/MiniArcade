class LaserShot {
  constructor(canvas, x, y) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.x = x;
    this.y = y;
    this.slope = 0;
    this.path1 = new Path2D();
    this.path2 = new Path2D();
  }

  drawLaser(dir) {
    this.ctx.strokeStyle = "#f50000";
    this.ctx.lineWidth = 6;
    switch (dir) {
      case "left":
        this.path1.moveTo(this.x, this.y);
        this.path1.lineTo(this.x - 150, this.canvas.height);
        this.ctx.stroke(this.path1);
        
        this.path2.moveTo(this.x + 120, this.y);
        this.path2.lineTo(this.x - 30, this.canvas.height);
        this.ctx.stroke(this.path2);
        break;
      case "left-mid":
        this.path1.moveTo(this.x, this.y);
        this.path1.lineTo(this.x - 60, this.canvas.height);
        this.ctx.stroke(this.path1);
     
        this.path2.moveTo(this.x + 120, this.y);
        this.path2.lineTo(this.x + 60, this.canvas.height);
        this.ctx.stroke(this.path2);
        break;
      case "mid":
        this.path1.moveTo(this.x + 15, this.y);
        this.path1.lineTo(this.x + 15, this.canvas.height);
        this.ctx.stroke(this.path1);
     
        this.path2.moveTo(this.x + 125, this.y);
        this.path2.lineTo(this.x + 125, this.canvas.height);
        this.ctx.stroke(this.path2);
        break;
      case "mid-open":
        this.path1.moveTo(this.x + 10, this.y);
        this.path1.lineTo(this.x - 20, this.canvas.height);
        this.ctx.stroke(this.path1);
        
        this.path2.moveTo(this.x + 130, this.y);
        this.path2.lineTo(this.x + 150, this.canvas.height);
        this.ctx.stroke(this.path2);
        break;
      case "right":
        this.path1.moveTo(this.x + 15, this.y);
        this.path1.lineTo(this.x + 115, this.canvas.height);
        this.ctx.stroke(this.path1);

        this.path2.moveTo(this.x + 130, this.y);
        this.path2.lineTo(this.x + 230, this.canvas.height);
        this.ctx.stroke(this.path2);
        break;
      case "right-mid":
        this.path1.moveTo(this.x + 20, this.y);
        this.path1.lineTo(this.x + 80, this.canvas.height);
        this.ctx.stroke(this.path1);
  
        this.path2.moveTo(this.x + 135, this.y);
        this.path2.lineTo(this.x + 185, this.canvas.height);
        this.ctx.stroke(this.path2);
        break;
    }
    this.updateSelf();
  }


  updateSelf(x,y) { 
    this.x = x;
    this.y = y
  }
  
}
