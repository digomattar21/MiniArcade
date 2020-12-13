class BossFight {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.laserDir = [
      "left",
      "left-mid",
      "mid",
      "mid-open",
      "right-mid",
      "right",
    ];
    this.randlaserDir = this.laserDir[
      Math.floor(Math.random() * (this.laserDir.length-1))
    ];
    this.bossLeft = new Image();
    this.bossRight = new Image();
    this.bossMid = new Image();
    this.bossMidOpen = new Image();
    this.imgSrcs = [
      "./img/boss_left.png",
      "./img/boss_right.png",
      "./img/boss_middle.png",
      "./img/boss_middle_open.png",
    ];
    this.imgs = [this.bossLeft, this.bossRight, this.bossMid, this.bossMidOpen];
    this.loadCount = 0;
    this.bossHealth = 10000;
    this.x = this.canvas.width / 2 - 100;
    this.y = 5;
    this.shotsFired = [];
    this.shot;
    this.laserFired = [];
    this.laser;
    this.directionY = 1;
    this.directionX = 1;
    this.speedX = Math.random() * 0.5 + 0.1;
    this.speedY = Math.random() * 0.5;
    this.laserLoad = 0;
    this.laserOn = false;
    this.shotX = this.x + 100;
    this.shotY = this.y + 120;
    this.freeze=false;
  }

  getSlope() {
      if(this.laserFired.length>0){
          return [this.laserFired[0].slope1, this.laserFired[0].slope2, this.laserFired[0].yInt1, this.laserFired[0].yInt2]
      } 
  }

  looseHealth() {
    this.bossHealth += -50;
  }

  loadImgs() {
    for (let i = 0; i < this.imgs.length; i++) {
      this.loadImage(this.imgs[i], this.imgSrcs[i]);
    }
  }

  loadImage(img, src) {
    img.addEventListener("load", () => {
      this.loadCount++;
    });
    img.src = src;
  }

  drawSelf() {
    switch (this.randlaserDir) {
      case "left":
        this.ctx.drawImage(this.bossLeft, this.x, this.y);
        break;
      case "left-mid":
        this.ctx.drawImage(this.bossLeft, this.x, this.y);
        break;
      case "mid":
        this.ctx.drawImage(this.bossMid, this.x, this.y);
        break;
      case "mid-open":
        this.ctx.drawImage(this.bossMidOpen, this.x, this.y);
        break;
      case "right-mid":
        this.ctx.drawImage(this.bossRight, this.x, this.y);
        break;
      case "right":
        this.ctx.drawImage(this.bossRight, this.x, this.y);
        break;
      default:
        break;
    }
    this.updateSelf();
    if (this.laserFired.length>0){
        this.laserFired[this.laserFired.length-1].updateSelf(this.x+30,this.y+115)
    }
  }

  updateSelf() {
    if (!this.freeze){  
    let rando = Math.floor(Math.random() * 2);
    let newDir;
    if (rando < 1) {
      newDir = -1;
    } else {
      newDir = 1;
    }
    if (this.y <= 0) {
      this.directionY = 1;
      this.directionX = newDir;
    } else if (this.y >= 250) {
      this.directionY = -1;
      this.directionX = newDir;
    }
    if (this.x >= 400) {
      this.directionX = -1;
      this.directionY = newDir;
    } else if (this.x <= 0) {
      this.directionX = 1;
      this.directionY = newDir;
    }
    this.x += this.speedX * this.directionX;
    this.y += this.speedY * this.directionY;}
  }

  createLaserShot() {
    if (this.laserOn) {
      switch (this.randlaserDir) {
        case "left":
          let laserShot = new LaserShot(
            this.canvas,
            this.x + 30,
            this.y + 115
          );
          this.laserFired.push(laserShot);
          break;
        case "left-mid":
          let laserShot1 = new LaserShot(
            this.canvas,
            this.x + 30,
            this.y + 115
          );
          this.laserFired.push(laserShot1);
          break;
        case "right":
          let laserShot2 = new LaserShot(
            this.canvas,
            this.x + 30,
            this.y + 115
          );
          this.laserFired.push(laserShot2);
          break;
        case "right-mid":
          let laserShot3 = new LaserShot(
            this.canvas,
            this.x + 30,
            this.y + 115
          );
          this.laserFired.push(laserShot3);
          break;
        case "mid":
          let laserShot4 = new LaserShot(
            this.canvas,
            this.x + 30,
            this.y + 115
          );
          this.laserFired.push(laserShot4);
          break;
        case "mid-open":
          let laserShot5 = new LaserShot(
            this.canvas,
            this.x + 30,
            this.y + 115
          );
          this.laserFired.push(laserShot5);
          break;
        default:
          break;
      }
    }
  }


  drawLasers() {
      if (this.laserFired.length>0){
          let last = this.laserFired[this.laserFired.length-1];
          last.drawLaser(this.randlaserDir);
      }
  }

  playLaserCharge(play) {
    var sound = document.getElementsByTagName("audio")[7];
    sound.setAttribute("preload", "auto");
    sound.style.display = "none";

    if (play) {
      sound.play();
    } else {
      sound.pause();
    }
  }

  playLaserFired(play) {
    var sound = document.getElementsByTagName("audio")[6];
    sound.setAttribute("preload", "auto");
    sound.style.display = "none";

    if (play) {
      sound.currentTime = 0;
      sound.play();
    } else {
      sound.pause();
    }
  }

  updateTimes() {
    this.laserLoad++;
    if (this.laserLoad > 2250 && this.laserLoad < 2750) {
      this.ctx.font = `15px 'Press Start 2P'`;
      this.ctx.fillStyle = "orange";
      this.ctx.fillText(`LASER INCOMING`, this.x - 10, this.y - 24);
      this.playLaserCharge(true);
    }
    if (this.laserLoad === 2750) {
      this.laserOn = true;
      this.createLaserShot();
      this.laserLoad = 0;
      this.freeze=true;
      this.playLaserFired(true)
      setTimeout(() => {
        this.playLaserFired(false)
        this.laserOn = false;
        this.randlaserDir = this.laserDir[
          Math.floor(Math.random() * this.laserDir.length)
        ];
        this.laserFired.splice(0, this.laserFired.length);
        this.freeze=false;
      }, 1200);
    }
  }
}
