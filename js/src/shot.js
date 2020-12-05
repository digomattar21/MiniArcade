class Shot {
    constructor(canvas, shotX,shotY){
        this.canvas=canvas;
        this.ctx = this.canvas.getContext('2d');
        this.speedY = -5;
        this.shotX = shotX;
        this.shotY = shotY;
        
    }


    drawSelf() {
        this.ctx.fillStyle = '#e8eb6a';
        this.ctx.fillRect(this.shotX, this.shotY+10+this.speedY, 5, 10);

        this.updateSelf();
    }

    updateSelf(){
        this.speedY--;
    }



}