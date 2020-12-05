class GalagaGame {
  constructor(canvas, lives) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.welcomeImage;
    this.lives = lives;
    this.isOver = false;
    this.time = 0;
    this.background;
    this.player;
    this.shotsFired = [];
    this.shot;
    this.enemies = [];
    this.enemy;
    this.enemyStartPos = { x: 100, y: 50 };
    this.wave = 0;
    this.explosion;
    this.now;
    this.then;
    this.delta;
    this.buffs = [0, 1, 2, 3];
    this.buff;
    this.chosen;
    this.enemyShots = [];
    this.enemyShot;
  }

  renderStartScreen() {
    setTimeout(() => {
      this.ctx.fillStyle = "black";
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.font = `60px 'Press Start 2P'`;
      this.ctx.fillStyle = "red";
      this.ctx.fillText(
        "READY",
        this.canvas.width / 2 - 130,
        this.canvas.height / 2 + 10
      );
    }, 100);

    setTimeout(() => {
      this.ctx.fillStyle = "black";
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.font = `60px 'Press Start 2P'`;
      this.ctx.fillStyle = "red";
      this.ctx.fillText(
        "GO!",
        this.canvas.width / 2 - 70,
        this.canvas.height / 2 + 10
      );
    }, 1500);

    setTimeout(() => {
      this.start();
    }, 2500);

    WebFont.load({
      google: { families: ["Press Start 2P"] },
      active: this.start(),
    });
  }

  start() {
    //Initialize everything and call update()
    this.background = new Background(this.canvas);
    this.player = new Player(this.canvas, this.lives);
    this.createEnemies(18);

    setTimeout(() => {
      this.update();
    }, 3000);
  }

  startNextWave() {
    setTimeout(() =>{
        this.createWaves();
        this.update();
    },2000)
  }

  createWaves() {
    let wave = this.wave;
    switch (wave) {
      case 1:
        this.createEnemies(25);
      case 2:
        this.createEnemies(20);
        this.enemies.forEach((enemy, index) => {
          enemy.multiplier = Math.random() * 2 + 1;
        });
    }
  }

  draw() {
    this.background.drawSelf();
    this.player.drawSelf();
    this.drawEnemies();

    if (this.shotsFired.length > 0) {
      this.shotsFired.forEach((shot, index) => {
        //shot.drawSelf();
        shot.drawRegular();
        if (shot.shotY < 0) {
          this.shotsFired.splice(index, 1);
        }
      });
    }
    if (this.enemyShots.length>0){
        this.enemyShots.forEach((enemyShot, index)=>{
            enemyShot.drawRegular();
            if (enemyShot.shotY>600){
                this.enemyShots.splice(index, 1);
            }
        })
    }
  }

  checkBoundaries() {
    if (this.player) {
      if (this.player.playerX < 0) {
        this.player.playerX = 0;
      } else if (this.player.playerX >= 520) {
        this.player.playerX = 520;
      }
      if (this.player.playerY < 0) {
        this.player.playerY = 0;
      } else if (this.player.playerY > 520) {
        this.player.playerY = 520;
      }
    }
    if (this.shotsFired.length > 0) {
      this.shotsFired.forEach((shot, index) => {
        if (shot.shotY <= 0) {
          this.shotsFired.splice(index, 1);
        }
      });
    }
  }

  createShot() {
    let x = this.player.playerX + 40;
    let y = this.player.playerY;
    this.shot = new Shot(this.canvas, x, y);
    this.shotsFired.push(this.shot);
  }

  drawEnemies() {
    if (this.enemies.length>0){
    this.enemies.forEach((enemy, index) => {
      enemy.drawSelf();
    });
  }}

  createEnemies(armySize) {
    let rand = Math.floor(Math.random() * armySize);

    while (this.enemies.length < armySize) {
      if (this.enemyStartPos.x < 500 && this.enemyStartPos.x >= 100) {
        if (this.enemyStartPos.y < 350) {
          this.enemy = new Enemy(
            this.canvas,
            this.enemyStartPos.x,
            this.enemyStartPos.y
          );
          this.enemies.push(this.enemy);
          this.enemyStartPos.x += 70;
        } else {
          this.enemyStartPos.y = 50;
        }
      } else {
        this.enemyStartPos.x = 100;
        this.enemyStartPos.y += 60;
      }
    }
    this.chosen = this.enemies[rand];

  }

  moveEnemies() {
    if (this.enemies.length > 0) {
      this.enemies.forEach((enemy, index) => {
        enemy.moveSelf();
      });
    }
  }

  enemyShoot() {
    let rand = Math.random() *100;

      if (this.enemies.length > 0) {
        let chosenToShoot = this.enemies[Math.floor(Math.random() *this.enemies.length)];
        let x = chosenToShoot.enemyX;
        let y = chosenToShoot.enemyY;
        if (rand<1){
            this.enemyShot = new EnemyShot(this.canvas, chosenToShoot.enemyX, chosenToShoot.enemyY);
            this.enemyShots.push(this.enemyShot);
        }
      }
  }

  checkShotHit() {
    if (this.shotsFired.length > 0) {
      this.shotsFired.forEach((shot, index) => {
        this.enemies.forEach((enemy, index) => {
          let c1 = shot.shotX + 2.5 >= enemy.enemyX;
          let c2 = shot.shotX + 2.5 <= enemy.enemyX + enemy.radius;
          let c3 = shot.shotY + 5 >= enemy.enemyY;
          let c4 = shot.shotY + 5 <= enemy.enemyY + enemy.radius;
          if (c1 && c2 && c3 && c4) {
            this.explosion = new Image();
            this.explosion.src = "../../../img/explosion.png";
            if (this.enemies.length === 1) {
              this.wave++;
              this.startNextWave();
            }

            if(this.enemies[index]===this.chosen){
                console.log('Escolhido')
            }


            this.enemies.splice(index, 1);

            //this.now= Date.now();

            this.ctx.drawImage(this.explosion,enemy.enemyX,enemy.enemyY,30,30);

          }
        });
      });
    }
  }

  update() {
    const update = () => {
      if (!this.isOver) {
        window.requestAnimationFrame(update);
        this.time++;
      }

      this.draw();
      this.moveEnemies();
      this.checkShotHit();
      this.checkBoundaries();
      this.enemyShoot();

    };

    window.requestAnimationFrame(update);
  }
}
