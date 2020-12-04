 class bbGame{
    constructor(canvas,lives){
        this.canvas=canvas;
        this.ctx = this.canvas.getContext('2d');
        this.welcomeImage;
        this.lives = lives;
        this.isOver = false;
        this.time = 0;


    }

    renderStartScreen() {
        setTimeout(()=>{
            this.ctx.fillStyle='black';
            this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
            this.ctx.font= `60px 'Press Start 2P'`;
            this.ctx.fillStyle='red';
            this.ctx.fillText('coming', this.canvas.width/2-170, this.canvas.height/2+10)
            this.ctx.fillText('soon...', this.canvas.width/2-170, this.canvas.height/2+80);
        },100);

        
        
       
       
       WebFont.load({
        google: {families: ['Press Start 2P']},
      active: this.start()
});
    }

    start() {
        //we create the player, ball and background pieces now before the update loop

        const update = () =>{
            

            if (!this.isOver){
                window.requestAnimationFrame(update)
                this.time++;
            }

             //All update functions come here

        }

        window.requestAnimationFrame(update)
    }
    
    draw(){

    }

}