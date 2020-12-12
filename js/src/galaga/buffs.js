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
    this.buff = false;
    this.playerGrab = false;
  }

  loadImgs() {
    this.healthImage.src = "../../../img/health.png";
    this.bulletImage.src = "../../../img/bullet.png";
    this.shieldImage.src = "../../../img/shield.png";
    this.healthImage.addEventListener("load", () => {
      console.log("Health img loaded");
    });
    this.bulletImage.addEventListener("load", () => {
      console.log("Spray img loaded");
    });
    this.shieldImage.addEventListener("load", () => {
      console.log("Shield img loaded");
    });
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
