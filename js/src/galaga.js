 class GalagaGame{
    constructor(canvas,lives){
        this.canvas=canvas;
        this.ctx = this.canvas.getContext('2d');
        this.welcomeImage;
        this.lives = lives;
        this.isOver = false;
        this.time = 0;
        this.background;
        this.player;
        this.shotsFired=[];
        this.shot;
        this.enemies =[];
        this.enemy;
        this.enemyStartPos = {x:100,y:50}

    }

    renderStartScreen() {

        setTimeout(()=>{
            this.ctx.fillStyle='black';
            this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
            this.ctx.font= `60px 'Press Start 2P'`;
            this.ctx.fillStyle='red';
            this.ctx.fillText('READY', this.canvas.width/2-130, this.canvas.height/2+10);
        },100);

        setTimeout(()=>{
            this.ctx.fillStyle='black';
            this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
            this.ctx.font= `60px 'Press Start 2P'`;
            this.ctx.fillStyle='red';
            this.ctx.fillText('GO!', this.canvas.width/2-70, this.canvas.height/2+10);
        },1500);
    
        setTimeout(()=>{
            this.start();
        },2500);


       WebFont.load({
        google: {families: ['Press Start 2P']},
      active: this.start()
});
    }

    start() {
        //Initialize everything and call update()
        this.background= new Background(this.canvas);
        this.player = new Player (this.canvas, this.lives);



        setTimeout(()=>{
            this.update()},3000)
    }

    
    draw(){
        this.background.drawSelf();
        this.player.drawSelf();
        this.drawEnemies()
        


        if (this.shotsFired.length>0){
            this.shotsFired.forEach((shot,index)=>{
                shot.drawSelf();
                //check if shot is out of bounds and delet it 
                //avoids overstacking
                if (shot.shotY<0){
                    this.shotsFired.splice(index,1);
                }
            })
        }


    }

    createShot() {
        let x = this.player.playerX+40;
        let y = this.player.playerY;
        this.shot = new Shot(this.canvas, x,y);
        this.shotsFired.push(this.shot);
        
    }

    drawEnemies () {
        this.createEnemies();
        this.enemies.forEach((enemy, index)=>{
            enemy.drawSelf();
        })
    }

    createEnemies() {
        while (this.enemies.length<18){
        if (this.enemyStartPos.x<500 && this.enemyStartPos.x >=10){
        this.enemy = new Enemy(this.canvas, this.enemyStartPos.x, this.enemyStartPos.y);
        this.enemies.push(this.enemy);
        this.enemyStartPos.x+=70;
        } else {
            this.enemyStartPos.x=100;
            this.enemyStartPos.y+=60
        }
    }}



    update() {


        const update=()=>{
            
            if (!this.isOver){
                window.requestAnimationFrame(update)
                this.time++;
            }


            this.draw();

        }

        window.requestAnimationFrame(update);
    }

}