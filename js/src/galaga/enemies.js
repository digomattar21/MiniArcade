class Enemy {
  constructor(canvas, x, y, lives) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.enemyX = x;
    this.enemyY = y;
    this.lives = lives;
    this.multiplier = 0;
    this.speedX = Math.random() * 2.5 + 0.5 * this.multiplier;
    this.speedY = Math.random() * 1 + 0.5 * this.multiplier;
    this.enemy;
    this.directionX = 1;
    this.directionY = 1;
    this.enemy = new Image();
    this.hit=false
    this.radius = 30;
  }

  drawSelf() {
    //possibly create another type of enemy thats stronger in a class extended
      this.enemy.src = "../../img/enemy.png";
      this.enemy.onload = () => {
        this.ctx.drawImage(
        this.enemy,
        this.enemyX,
        this.enemyY,
        this.radius,
        this.radius
      );
    };
    
    
  }

  moveSelf() {
    let boo = Math.floor(Math.random() * 2);
    let newDir;
    if (boo < 1) {
      newDir = -1;
    } else {
      newDir = 1;
    }
    if (this.enemyX >= 565) {
      this.directionX = -1;
      this.directionY = newDir;
    } else if (this.enemyX <= 5) {
      this.directionX = 1;
      this.directionY = newDir;
    }
    if (this.enemyY > 350) {
      this.directionY = -1;
      this.directionX = newDir;
    } else if (this.enemyY <= 5) {
      this.directionY = 1;
      this.directionX = newDir;
    }
    this.enemyX += this.speedX * this.directionX;
    this.enemyY += this.speedY * this.directionY;
  }
}
