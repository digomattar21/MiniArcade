class LaserShot {
  constructor(canvas, x, y) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.x = x;
    this.y = y;
    this.slope1 = 0;
    this.slope2 = 0;
    this.path1 = new Path2D();
    this.path2 = new Path2D();
    this.yInt1 = 0;
    this.yInt2 =0;
    this.mobile=false;
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

        this.slope1 = (this.canvas.height-this.y)/-150;
        this.slope2 = (this.canvas.height-this.y)/-150;
        this.yInt1 = this.y - (this.slope1*this.x);
        this.yInt2 = this.y - (this.slope2*(this.x+120));
        break;
      case "left-mid":
        this.path1.moveTo(this.x, this.y);
        this.path1.lineTo(this.x - 60, this.canvas.height);
        this.ctx.stroke(this.path1);
     
        this.path2.moveTo(this.x + 120, this.y);
        this.path2.lineTo(this.x + 60, this.canvas.height);
        this.ctx.stroke(this.path2);

        this.slope1 = (this.canvas.height-this.y)/-60;
        this.slope2 = (this.canvas.height-this.y)/-60;
        this.yInt1 = this.y - (this.slope1*this.x);
        this.yInt2 = this.y - (this.slope2*(this.x+120));
        break;
      case "mid":
        this.path1.moveTo(this.x + 15, this.y);
        this.path1.lineTo(this.x + 15, this.canvas.height);
        this.ctx.stroke(this.path1);
     
        this.path2.moveTo(this.x + 125, this.y);
        this.path2.lineTo(this.x + 125, this.canvas.height);
        this.ctx.stroke(this.path2);

        this.slope1 = 100000;
        this.slope2 = 100000;
        this.yInt1 = this.x+15;
        this.yInt2 = this.x+125
        break;
      case "mid-open":
        this.path1.moveTo(this.x + 10, this.y);
        this.path1.lineTo(this.x - 20, this.canvas.height);
        this.ctx.stroke(this.path1);
        
        this.path2.moveTo(this.x + 130, this.y);
        this.path2.lineTo(this.x + 160, this.canvas.height);
        this.ctx.stroke(this.path2);

        this.slope1 = (this.canvas.height-this.y)/-30;
        this.slope2 = (this.canvas.height-this.y)/30;
        this.yInt1 = this.y - (this.slope1*(this.x+10));
        this.yInt2 = this.y - (this.slope2*(this.x+130));
        break;
      case "right":
        this.path1.moveTo(this.x + 15, this.y);
        this.path1.lineTo(this.x + 165, this.canvas.height);
        this.ctx.stroke(this.path1);

        this.path2.moveTo(this.x + 130, this.y);
        this.path2.lineTo(this.x + 280, this.canvas.height);
        this.ctx.stroke(this.path2);

        this.slope1 = (this.canvas.height-this.y)/150;
        this.slope2 = (this.canvas.height-this.y)/150;
        this.yInt1 = this.y - (this.slope1*(this.x+15));
        this.yInt2 = this.y - (this.slope2*(this.x+130));
        break;
      case "right-mid":
        this.path1.moveTo(this.x + 20, this.y);
        this.path1.lineTo(this.x + 80, this.canvas.height);
        this.ctx.stroke(this.path1);
  
        this.path2.moveTo(this.x + 135, this.y);
        this.path2.lineTo(this.x + 195, this.canvas.height);
        this.ctx.stroke(this.path2);

        this.slope1 = (this.canvas.height-this.y)/60;
        this.slope2 = (this.canvas.height-this.y)/60;
        this.yInt1 = this.y - (this.slope1*(this.x+20));
        this.yInt2 = this.y - (this.slope2*(this.x+135));
        break;
    }
    this.updateSelf();
  }


  updateSelf(x,y) { 
    this.x = x;
    this.y = y
  }

}
