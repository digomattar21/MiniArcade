class GalagaGame {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.welcomeImage;
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
    this.buff;
    this.chosen;
    this.enemyShots = [];
    this.enemyShot;
    this.waveMessage = false;
    this.score;
    this.healthBuff=false;
    this.sprayBuff=false;
    this.sprayShot;
    this.sprayShots=[];
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
    this.player = new Player(this.canvas, 500);
    this.score = new Score(this.canvas);
    this.createEnemies(5);

    setTimeout(() => {
      this.update();
    }, 3000);
  }

  startNextWave() {
    if (this.wave <= 4) {
      this.waveMessage = true;
    }

    setTimeout(() => {
      this.createWaves();
      this.update();
      this.waveMessage = false;
    }, 2000);
  }

  createWaves() {
    let wave = this.wave;
    switch (wave) {
      case 1:
        this.createEnemies(10);
        this.enemies.forEach((enemy, index) => {
          enemy.multiplier = 1.2;
        });
      case 2:
        this.createEnemies(15);
        this.enemies.forEach((enemy, index) => {
          enemy.multiplier = 1.5;
        });
        break;
      case 3:
        this.createEnemies(20);
        this.enemies.forEach((enemy, index) => {
          enemy.multiplier = 1.7;
        });
        break;
      case 4:
        this.createEnemies(25);
        this.enemies.forEach((enemy, index) => {
          enemy.multiplier = 1.7;
        });
        break;
      default:
        break;
    }
  }

  draw() {
    this.background.drawSelf();
    this.player.drawSelf();
    this.drawEnemies();
    this.score.drawSelf();

    if (this.shotsFired.length > 0) {
      this.shotsFired.forEach((shot, index) => {
        //shot.drawSelf();
        shot.drawRegular();
        if (shot.shotY < 0) {
          this.shotsFired.splice(index, 1);
        }
      });
    }
    if (this.sprayShots.length>0){
      this.sprayShots.forEach((shot,index)=>{
        shot.drawSelf();
        if (shot.y<0){
          this.sprayShots.splice(index,1);
        }
      })
    }
    if (this.enemyShots.length > 0) {
      this.enemyShots.forEach((enemyShot, index) => {
        enemyShot.drawRegular();
        if (enemyShot.shotY > 600) {
          this.enemyShots.splice(index, 1);
        }
      });
    }
    if (this.waveMessage) {
      this.ctx.font = '35px "Press Start 2P"';
      this.ctx.fillStyle = "red";

      this.ctx.fillText(`Wave ${this.wave} cleared`, 60, 250);
      this.ctx.fillText(`Get ready`, 150, 350);
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
    if (this.sprayBuff){
    this.sprayShot = new SprayShot(this.canvas,this.player.playerX+40, this.player.playerY-5)
    this.sprayShots.push(this.sprayShot);
    } else{
    let x = this.player.playerX + 40;
    let y = this.player.playerY;
    this.shot = new Shot(this.canvas, x, y);
    this.shotsFired.push(this.shot);
    }
    
  }

  drawEnemies() {
    if (this.enemies.length > 0) {
      this.enemies.forEach((enemy, index) => {
        enemy.drawSelf();
      });
    }
  }

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
    let rand = Math.random() * 100;

    if (this.enemies.length > 0) {
      let chosenToShoot = this.enemies[
        Math.floor(Math.random() * this.enemies.length)
      ];
      let x = chosenToShoot.enemyX;
      let y = chosenToShoot.enemyY;
      if (rand < 1) {
        this.enemyShot = new EnemyShot(
          this.canvas,
          chosenToShoot.enemyX,
          chosenToShoot.enemyY
        );
        this.enemyShots.push(this.enemyShot);
      }
    }
  }

  checkBuffGrab() {
    if (this.buff) {
      if (this.buff.buff) {
        let c1 = this.buff.x + 12.5 > this.player.playerX;
        let c2 = this.buff.x + 12.5 < this.player.playerX + 80;
        let c3 = this.buff.y + 12.5 > this.player.playerY;
        let c4 = this.buff.y + 12.5 < this.player.playerY + 80;
        if (c1 && c2 && c3 && c4) {
          switch (this.buffType) {
            case "health":
              this.player.health += 250;
              this.healthBuff=true;
              delete this.buff;
              break;
            case "spray":
              this.sprayBuff = true;
              break;
          }
        }
      }
    }
  }



  checkHealthBuff() {
    if (this.healthBuff===true){
      this.ctx.font=`45px 'Press Start 2P'`;
      this.ctx.fillStyle='green';
      this.ctx.fillText(`+250HP`, 160,100);
    }
    setTimeout(() => {this.healthBuff=false},1500)
  }

  checkShotHit() {
    //Check if enemy is hit
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
            this.explosionTime = true;
            if (this.enemies.length === 1) {
              this.wave++;
              this.startNextWave();
            }

            if (this.enemies[index] === this.chosen) {
              this.buff = new Buffs(
                this.canvas,
                this.chosen.enemyX,
                this.chosen.enemyY
              );
              this.buffType = this.buff.chooseBuff();
            }

            this.enemies.splice(index, 1);
            this.score.killUpdate();

            if ((this.explosionTime = true)) {
              this.ctx.drawImage(
                this.explosion,
                enemy.enemyX,
                enemy.enemyY,
                30,
                30
              );
            }
            setTimeout(() => {
              (this.explosionTime = false), 800;
            });
          }
        });
      });
    }
    if (this.sprayShots.length > 0) {
      this.sprayShots.forEach((shot, index) => {
        this.enemies.forEach((enemy, index) => {
          let c1 = shot.x + 2.5 >= enemy.enemyX;
          let c2 = shot.x + 2.5 <= enemy.enemyX + enemy.radius;
          let c5 = shot.x2 + 2.5 >= enemy.enemyX;
          let c6 = shot.x2 + 2.5 <= enemy.enemyX + enemy.radius;
          let c7 = shot.x3 + 2.5 >= enemy.enemyX;
          let c8 = shot.x3 + 2.5 <= enemy.enemyX + enemy.radius;
          let c3 = shot.y + 5 >= enemy.enemyY;
          let c4 = shot.y + 5 <= enemy.enemyY + enemy.radius;
          if (((c1 && c2) || (c5 &c6) || (c7 &&c8))&& (c3 && c4)) {
            this.explosion = new Image();
            this.explosion.src = "../../../img/explosion.png";
            this.explosionTime = true;
            if (this.enemies.length === 1) {
              this.wave++;
              this.startNextWave();
            }

            if (this.enemies[index] === this.chosen) {
              this.buff = new Buffs(
                this.canvas,
                this.chosen.enemyX,
                this.chosen.enemyY
              );
              this.buffType = this.buff.chooseBuff();
            }

            this.enemies.splice(index, 1);
            this.score.killUpdate();

            if ((this.explosionTime = true)) {
              this.ctx.drawImage(
                this.explosion,
                enemy.enemyX,
                enemy.enemyY,
                30,
                30
              );
            }
            setTimeout(() => {
              (this.explosionTime = false), 800;
            });
          }
        });
      });
    }
    //Check if player is hit by a shot
    if (this.enemyShots.length > 0) {
      this.enemyShots.forEach((shot, index) => {
        let c1 = shot.shotX + 2.5 > this.player.playerX;
        let c2 = shot.shotX + 2.5 < this.player.playerX + 80;
        let c3 = shot.shotY + 5 < this.player.playerY + 80;
        let c4 = shot.shotY + 5 > this.player.playerY;
        if (c1 && c2 && c3 && c4) {
          this.player.health--;
        }
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
      this.score.drawScoreIncrease();
      this.checkBuffGrab();
      this.checkHealthBuff();

      if (this.time % 200 == 0) {
        this.score.timeUpdate();
      }
    };

    window.requestAnimationFrame(update);
  }
}
