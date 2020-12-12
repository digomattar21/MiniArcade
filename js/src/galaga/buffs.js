class Buffs {
  constructor(canvas, x, y, buffList) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.x = x;
    this.y = y;
    this.types = buffList;
    this.speedY = 0.9;
    this.healthImage = new Image();
    this.bulletImage = new Image();
    this.shieldImage = new Image();
    this.imgSrcs = ["/img/health.png", "/img/bullet.png", "/img/shield.png"];
    this.images =[this.healthImage, this.bulletImage, this.shieldImage];
    this.loadCount = 0;
    this.buff = false;
    this.playerGrab = false;
  }

  loadImgs() {
    for (let i = 0; i<this.images.length;i ++){
      this.loadImage(this.images[i], this.imgSrcs[i]);
    }
  }

  loadImage(img,src){
    img.addEventListener('load',()=>{this.loadCount++})
    img.src=src;
  }

  chooseBuff() {
    this.buff = true;
    let rand = this.types[Math.floor(Math.random() * this.types.length)];
    switch (rand) {
      case "missel":
        this.misselBuff();
        return "missel";
      case "shield":
        this.shieldBuff();
        return "shield";
      case "health":
        this.healthBuff();
        return "health";
      case "spray":
        this.sprayBuff();
        return "spray";
      default:
        break;
    }
  }

  misselBuff() {}

  shieldBuff() {
    this.drawShieldBuff();
  }

  healthBuff() {
    this.drawHealthBuff();
  }

  sprayBuff() {
    this.drawSprayBuff();
  }

  updateSelf() {
    this.y += this.speedY;
  }

  drawMisselBuff() {}

  drawShieldBuff() {
    if (this.y < 600 && this.playerGrab === false) {
      setInterval(() => {
        if (!this.playerGrab) {
          this.ctx.drawImage(this.shieldImage, this.x, this.y, 25, 25);
          this.updateSelf();
        }
      }, 1);
    } else {
      this.buff = false;
    }
  }

  drawHealthBuff() {
    if (this.y < 600 && this.playerGrab === false) {
      setInterval(() => {
        if (!this.playerGrab) {
          this.ctx.drawImage(this.healthImage, this.x, this.y, 25, 25);
          this.updateSelf();
        }
      }, 1);
    } else {
      this.buff = false;
    }
  }

  drawSprayBuff() {
    if (this.y < 600 && this.playerGrab === false) {
      setInterval(() => {
        if (!this.playerGrab) {
          this.ctx.drawImage(this.bulletImage, this.x, this.y, 25, 25);
          this.updateSelf();
        }
      }, 5);
    } else {
      this.buff = false;
    }
  }
}
