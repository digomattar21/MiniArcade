class Background {
    constructor(canvas){
        this.canvas= canvas;
        this.ctx=this.canvas.getContext("2d");
        this.speed=1;
        this.x=0;
        this.y=0;

    }

    drawSelf() {
        var background= new Image();
        background.src='../../img/background.png';
        this.y+=this.speed;

        background.onload=()=>{
            this.ctx.drawImage(background, this.x,this.y);
            this.ctx.drawImage(background, this.x, this.y - this.canvas.height);
        }

        if (this.y >= this.canvas.height){
			this.y = 0;};
	}

      
}