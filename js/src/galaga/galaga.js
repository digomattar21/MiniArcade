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
    this.wave =4;
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
    this.healthBuff = false;
    this.sprayBuff = false;
    this.sprayShot;
    this.sprayShots = [];
    this.buffs = [];
    this.shieldBuff = false;
    this.shieldLeft = 10;
    this.bossFight;
    this.bossFightOn = false;
    this.bossShotsFired = [];
    this.buffList = ["health", "spray", "shield"];
    this.soundTheme;
    this.bossMessage = false;
    this.playerWon;
    this.playerLost;
    this.overAnimation = false;
    this.shieldBuffTime = 2000;
    this.sprayBuffTime = 2000;
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
    this.playThemeSound(true);

    setTimeout(() => {
      this.update();
    }, 3000);
  }

  startNextWave() {
    if (this.wave <= 4) {
      this.waveMessage = true;
    } else if (this.wave === 5) {
      this.bossMessage = true;
    }

    setTimeout(() => {
      this.createWaves();
      this.update();
      this.waveMessage = false;
      this.bossMessage = false;
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
      case 5:
        this.bossFight = new BossFight(this.canvas);
        this.bossFight.loadImgs();
        this.bossFightOn = true;
        this.createEnemies(10);
        this.enemies.forEach((enemy, index) => {
          enemy.multiplier = 1.2;
        });
      default:
        break;
    }
  }

  playExplosionSound(play) {
    var sound = document.getElementsByTagName("audio")[0];
    sound.setAttribute("preload", "auto");
    sound.style.display = "none";

    if (play) {
      sound.currentTime = 0;
      sound.play();
    } else {
      sound.pause();
    }
  }

  playThemeSound(play) {
    var sound = document.getElementsByTagName("audio")[1];
    sound.setAttribute("preload", "auto");
    sound.style.display = "none";

    if (play) {
      sound.currentTime = 0;
      sound.play();
    } else {
      sound.pause();
    }
  }

  playBossHitSound(play) {
    var sound = document.getElementsByTagName("audio")[2];
    sound.setAttribute("preload", "auto");
    sound.style.display = "none";

    if (play) {
      sound.currentTime = 0;
      sound.play();
    } else {
      sound.pause();
    }
  }

  playPlayerHitSound(play) {
    var sound = document.getElementsByTagName("audio")[3];
    sound.setAttribute("preload", "auto");
    sound.style.display = "none";

    if (play) {
      sound.currentTime = 0;
      sound.play();
    } else {
      sound.pause();
    }
  }

  draw() {
    this.background.drawSelf();
    this.player.drawSelf();
    this.drawEnemies();
    this.score.drawSelf();

    if (this.bossFightOn) {
      this.bossFight.drawSelf();
      if (this.bossShotsFired.length > 0) {
        this.bossShotsFired.forEach((shot, index) => {
          shot.drawRegular();
          if (shot.shotY > 600) {
            this.bossShotsFired.splice(index, 1);
          }
        });
      }
    }

    if (this.shotsFired.length > 0) {
      this.shotsFired.forEach((shot, index) => {
        //shot.drawSelf();
        shot.drawRegular();
        if (shot.shotY < 0) {
          this.shotsFired.splice(index, 1);
        }
      });
    }
    if (this.sprayShots.length > 0) {
      this.sprayShots.forEach((shot, index) => {
        shot.drawSelf();
        if (shot.y < 0) {
          this.sprayShots.splice(index, 1);
        }
      });
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
    if (this.bossMessage) {
      this.ctx.font = '35px "Press Start 2P"';
      this.ctx.fillStyle = "red";

      this.ctx.fillText(`BOSS FIGHT`, 60, 250);
      this.ctx.fillText(`You're Dead.`, 130, 350);
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
    if (this.sprayBuff) {
      this.sprayShot = new SprayShot(
        this.canvas,
        this.player.playerX + 40,
        this.player.playerY - 5
      );
      this.sprayShots.push(this.sprayShot);
    } else {
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
          this.enemy.loadImg();
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
              this.healthBuff = true;
              //setTimout(()=>{this.playerGrab=false},1000)
              this.animTime = true;
              this.buffs.splice(0, this.buffs.length);
              this.buff.playerGrab = true;
              delete this.buff;
              break;
            case "spray":
              this.player.playerBuff = true;
              this.sprayBuff = true;
              this.sprayBuffTime = 2000;
              this.animTime = true;
              this.buff.playerGrab = true;
              this.buffs.splice(0, this.buffs.length);
              delete this.buff;
              break;
            case "shield":
              this.shieldBuff = true;
              this.shieldBuffTime = 2000;
              this.shieldLeft = 10;
              this.player.shieldBuff = true;
              this.animTime = true;
              this.buff.playerGrab = true;
              this.buffs.splice(0, this.buffs.length);
              delete this.buff;
              break;
          }
          this.buffs.forEach((buff, index) => {
            buff.playerGrab = true;
          });
        }
      }
    }
  }

  checkDrawShieldLeft() {
    if (this.shieldBuff && this.shieldLeft > 0) {
      this.ctx.font = `15px 'Press Start 2P'`;
      this.ctx.fillStyle = "#0097f5";
      this.ctx.fillText(`Shield: ${this.shieldLeft}`, 440, 40);
    }
    if (this.shieldLeft <= 1 || this.shieldBuffTime <= 0) {
      this.shieldBuff = false;
      this.player.shieldBuff = false;
    }
  }

  checkDrawBuffs() {
    if (this.healthBuff && this.animTime) {
      this.ctx.font = `35px 'Press Start 2P'`;
      this.ctx.fillStyle = "green";
      this.ctx.fillText(`+250HP`, 170, 100);
    }
    if (this.sprayBuff && this.animTime && !this.shieldBuff) {
      this.ctx.font = `35px 'Press Start 2P'`;
      this.ctx.fillStyle = "lawngreen";
      this.ctx.fillText(`SPRAY BUFF ON`, 660, 200);
    }
    if (this.shieldBuff && this.animTime && !this.sprayBuff) {
      this.ctx.font = `35px 'Press Start 2P'`;
      this.ctx.fillStyle = "blue";
      this.ctx.fillText(`SHIELD BUFF ON`, 60, 200);
    }
  }

  checkShotHit() {
    //Check if enemy is hit
    if (this.shotsFired.length > 0) {
      this.shotsFired.forEach((shot, index1) => {
        this.enemies.forEach((enemy, index) => {
          let c1 = shot.shotX + 2.5 >= enemy.enemyX;
          let c2 = shot.shotX + 2.5 <= enemy.enemyX + enemy.radius;
          let c3 = shot.shotY + 5 >= enemy.enemyY;
          let c4 = shot.shotY + 5 <= enemy.enemyY + enemy.radius;
          if (c1 && c2 && c3 && c4) {
            this.explosion = new Image();
            this.explosion.src = "./img/explosion.png";
            this.explosionTime = true;
            this.playExplosionSound(true);
            this.shotsFired.splice(index1, 1);

            if (this.enemies.length === 1 && this.wave != 5) {
              this.wave++;
              this.startNextWave();
            }

            if (this.enemies[index] === this.chosen) {
              this.buff = new Buffs(
                this.canvas,
                this.chosen.enemyX,
                this.chosen.enemyY,
                this.buffList
              );
              this.buff.loadImgs();
              this.buffType = this.buff.chooseBuff();
              this.buffs.push(this.buff);
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
      this.sprayShots.forEach((shot, index1) => {
        this.enemies.forEach((enemy, index) => {
          let c1 = shot.x + 2.5 >= enemy.enemyX;
          let c2 = shot.x + 2.5 <= enemy.enemyX + enemy.radius;
          let c5 = shot.x2 + 2.5 >= enemy.enemyX;
          let c6 = shot.x2 + 2.5 <= enemy.enemyX + enemy.radius;
          let c7 = shot.x3 + 2.5 >= enemy.enemyX;
          let c8 = shot.x3 + 2.5 <= enemy.enemyX + enemy.radius;
          let c3 = shot.y + 5 >= enemy.enemyY;
          let c4 = shot.y + 5 <= enemy.enemyY + enemy.radius;
          if (((c1 && c2) || c5 & c6 || (c7 && c8)) && c3 && c4) {
            this.explosion = new Image();
            this.explosion.src = "./img/explosion.png";
            this.explosionTime = true;
            this.shotsFired.splice(index1, 1);
            this.playExplosionSound(true);
            if (this.enemies.length === 1) {
              this.wave++;
              this.startNextWave();
            }

            if (this.enemies[index] === this.chosen) {
              this.buff = new Buffs(
                this.canvas,
                this.chosen.enemyX,
                this.chosen.enemyY,
                this.buffList
              );
              this.buff.loadImgs();
              this.buffType = this.buff.chooseBuff();
              this.buffs.push(this.buff);
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
          if (!this.shieldBuff) {
            this.player.health -= 5;
          } else if (this.shieldLeft > 0) {
            this.shieldLeft--;
          }
          this.playPlayerHitSound(true);
          this.enemyShots.splice(index, 1);
        }
      });
    }
  }

  checkBossHit() {
    if (this.bossFightOn) {
      if (this.shotsFired.length > 0 || this.sprayShots.length > 0) {
        this.shotsFired.forEach((shot, index) => {
          let c1 = shot.shotX + 2.5 > this.bossFight.x;
          let c2 = shot.shotX + 2.5 < this.bossFight.x + 200;
          let c3 = shot.shotY + 5 > this.bossFight.y;
          let c4 = shot.shotY + 5 < this.bossFight.y + 120;
          if (c1 && c2 && c3 && c4) {
            this.bossFight.looseHealth();
            this.playBossHitSound(true);
            this.shotsFired.splice(index, 1);
            this.explosion = new Image();
            this.explosion.src = "./img/explosion.png";
            this.explosionTime = true;
            this.ctx.drawImage(this.explosion, shot.shotX, shot.shotY, 30, 30);
          }
        });
        this.sprayShots.forEach((shot, index) => {
          let c1 = shot.x + 2.5 > this.bossFight.x;
          let c2 = shot.x + 2.5 < this.bossFight.x + 200;
          let c3 = shot.y + 5 > this.bossFight.y;
          let c4 = shot.y + 5 < this.bossFight.y + 120;
          let c11 = shot.x2 + 2.5 > this.bossFight.x;
          let c22 = shot.x2 + 2.5 < this.bossFight.x + 200;
          let c33 = shot.y2 + 5 > this.bossFight.y;
          let c44 = shot.y2 + 5 < this.bossFight.y + 120;
          let c111 = shot.x3 + 2.5 > this.bossFight.x;
          let c222 = shot.x3 + 2.5 < this.bossFight.x + 200;
          let c333 = shot.y3 + 5 > this.bossFight.y;
          let c444 = shot.y3 + 5 < this.bossFight.y + 120;
          if (
            (c1 && c2 && c3 && c4) ||
            (c11 && c22 && c33 & c44) ||
            c111 & c222 & c333 & c444
          ) {
            this.bossFight.looseHealth();
            this.playBossHitSound(true);
            this.sprayShots.splice(index, 1);
            this.explosion = new Image();
            this.explosion.src = "./img/explosion.png";
            this.explosionTime = true;
            this.ctx.drawImage(this.explosion, shot.x, shot.y, 30, 30);
          }
        });
      }
    }
  }

  checkPlayerHitByBoss() {
    if (this.bossShotsFired.length > 0) {
      this.bossShotsFired.forEach((shot, index) => {
        let c1 = shot.shotX + 5 < this.player.playerX + 80;
        let c2 = shot.shotX + 5 > this.player.playerX;
        let c3 = shot.shotY + 5 < this.player.playerY + 80;
        let c4 = shot.shotY + 5 > this.player.playerY;
        if (c1 && c2 && c3 && c4) {
          if (!this.shieldBuff || this.shieldleft <= 0) {
            this.player.health -= 20;
          } else {
            this.shieldLeft -= 2;
          }

          this.bossShotsFired.splice(index, 1);
          this.explosion = new Image();
          this.explosion.src = "./img/explosion.png";
          this.explosionTime = true;
          this.playPlayerHitSound(true);
          this.ctx.drawImage(this.explosion, shot.x, shot.y, 30, 30);
        }
      });
    } 
  }

  drawBossHealth(increment) {
    this.ctx.strokeStyle = "white";
    this.ctx.lineWidth = 0.5;
    this.ctx.beginPath();
    this.ctx.moveTo(this.bossFight.x + 30, this.bossFight.y - 4);
    this.ctx.lineTo(this.bossFight.x + 150, this.bossFight.y - 4);
    this.ctx.moveTo(this.bossFight.x + 150, this.bossFight.y - 4);
    this.ctx.lineTo(this.bossFight.x + 150, this.bossFight.y);
    this.ctx.moveTo(this.bossFight.x + 150, this.bossFight.y);
    this.ctx.lineTo(this.bossFight.x + 30, this.bossFight.y);
    this.ctx.moveTo(this.bossFight.x + 30, this.bossFight.y);
    this.ctx.lineTo(this.bossFight.x + 30, this.bossFight.y - 4);
    this.ctx.stroke();
    this.ctx.closePath();
    this.ctx.fillStyle = "red";
    this.ctx.fillRect(
      this.bossFight.x + 30,
      this.bossFight.y - 4,
      increment / 83.333,
      4
    );
    this.ctx.font = `10px 'Press Start 2P'`;
    this.ctx.fillStyle = "white";
    this.ctx.fillText(
      `Boss Health`,
      this.bossFight.x + 35,
      this.bossFight.y - 10
    );
  }

  createBossShots() {
    let rando = Math.floor(Math.random() * 300);
    if (rando <= 4) {
      let shot = new BossShot(
        this.canvas,
        this.bossFight.x + 100,
        this.bossFight.y + 120
      );
      this.bossShotsFired.push(shot);
    }
  }

  checkIfLaserHit () {
    if (this.bossFight.laserFired.length>0){
      let hitLine = [];
    for (let i = 0; i<80; i++){
      hitLine.push({x:this.player.playerX+i, y:this.player.playerY+40})
    }
      let path1 = this.bossFight.getPath()[0];
      let path2 = this.bossFight.getPath()[1];
      
    hitLine.forEach((point,index)=>{
       console.log(this.ctx.isPointInPath(path1, point.x, point.y))
      //if ((this.ctx.isPointInPath(path1,point.x,point.y)) || (this.ctx.isPointInPath(path2,point.x,point.y))){
        //console.log('ACERTOU')
      //}
    })
  }}

  checkIfMoreBuffs() {
    if (this.bossFight) {
      if (
        this.bossFight.bossHealth === 7500 ||
        this.bossFight.bossHealth === 5000 ||
        this.bossFight.bossHealth === 2500
      ) {
        if (this.buffs.length <= 1) {
          this.buff = new Buffs(
            this.canvas,
            this.bossFight.x + 100,
            this.bossFight.y + 110,
            this.buffList
          );
          this.buff.loadImgs();
          this.buffType = this.buff.chooseBuff();
          this.buffs.push(this.buff);
        }
      }
    }
  }

  checkHealth() {
    if (this.player.health <= 0) {
      this.isOver = true;
      this.playerLost = true;
      this.overAnimation = true;
    }
    if (this.bossFight) {
      if (this.bossFight.bossHealth <= 0) {
        this.isOver = true;
        this.playerWon = true;
        this.overAnimation = true;
      }
    }
  }

  update() {
    const update = () => {

      if (!this.isOver) {
        window.requestAnimationFrame(update);
        this.time++;
      } else {
        let sound = document.getElementsByTagName("audio")[1];
        sound.pause();

        if (this.playerWon) {
          let gameWon = new GameWon(this.canvas);
          window.cancelAnimationFrame(update);
          this.explosion = new Image();
          this.explosion.src = "./img/explosion.png";
          this.playExplosionSound(true);
          if (this.overAnimation) {
            setInterval(() => {
              this.ctx.drawImage(
                this.explosion,
                this.bossFight.x,
                this.bossFight.y,
                200,
                150
              );
            }, 5);
            setTimeout(() => {
              this.overAnimation = false;
              gameWon.renderSelf();
            }, 800);
          }
        } else if (this.playerLost) {
          let gameOver = new GameLost(this.canvas, this.score.score);
          window.cancelAnimationFrame(update);
          this.explosion = new Image();
          this.explosion.src = "./img/explosion.png";
          this.playExplosionSound(true);
          if (this.overAnimation) {
            setInterval(() => {
              this.ctx.drawImage(
                this.explosion,
                this.player.playerX,
                this.player.playerY,
                80,
                80
              );
            }, 5);
            setTimeout(() => {
              this.overAnimation = false;
              gameOver.renderSelf();
            }, 800);
          }
        }
      }

      this.draw();
      this.moveEnemies();
      this.checkShotHit();
      this.checkBoundaries();
      this.enemyShoot();
      this.score.drawScoreIncrease();
      this.checkBuffGrab();
      this.checkDrawBuffs();
      this.checkHealth();
      this.checkDrawShieldLeft();

      if (this.bossFight) {
        this.createBossShots();
        this.bossFight.updateTimes();
        this.checkBossHit();
        this.checkPlayerHitByBoss();
        this.drawBossHealth(this.bossFight.bossHealth);
        this.checkIfMoreBuffs();
        this.checkIfLaserHit();
        this.bossFight.drawLasers();
      }

      if (this.time % 200 == 0) {
        this.score.timeUpdate();
      }
      if (this.time % 800 == 0) {
        setTimeout(() => {
          this.animTime = false;
        }, 400);
        this.healthBuff = false;
      }

      if (this.time % 1 == 0) {
        if (this.sprayBuff) {
          this.sprayBuffTime--;
        }
        if (this.shieldBuff) {
          this.shieldBuffTime--;
        }
      }

      if (this.sprayBuffTime <= 0) {
        this.sprayBuff = false;
        this.player.playerBuff = false;
      }

      if (this.shieldBuffTime <= 0) {
        this.shieldBuff = false;
        this.player.shieldBuff = false;
      }
    };

    window.requestAnimationFrame(update);
  }
}
