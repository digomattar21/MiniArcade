class Background {
    constructor(canvas){
        this.canvas= canvas;
        this.ctx=this.canvas.getContext("2d");
        this.speed=0;
        this.x=0;
        this.y=0;

    }

    drawSelf() {
        var background= new Image();
        background.src='../../img/background.png';
        background.onload=()=>{
            this.ctx.drawImage(background, 0,0);
        }
    }    
}