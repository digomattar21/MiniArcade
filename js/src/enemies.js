class Enemy {
    constructor(canvas,x,y) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.enemyX = x;
        this.enemyY =y;
        this.speedX = Math.random()*5 + 5;
        this.speedY = Math.random()*5 + 5;
        this.enemy;


    }

    drawSelf(){
        //possibly create another type of enemy thats stronger in a class extended
        this.enemy = new Image();
        this.enemy.src = '../../img/enemy.png';
        this.enemy.onload=()=>{
            this.ctx.drawImage(this.enemy, this.enemyX, this.enemyY, 30,30);
        }

    }

    move() {

    }




}