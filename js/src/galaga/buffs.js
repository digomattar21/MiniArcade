class Buffs {
  constructor(canvas, x, y) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.x = x;
    this.y = y;
    //this.types = ['missel', 'shield', 'health', 'spray']
    this.types = ["health"];
    this.speedY = 0.9;
    this.healthImage = new Image();
    this.healthImage.src = "../../../img/health.png";
    this.buff = false;
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

  shieldBuff() {}

  healthBuff() {
    this.drawHealthBuff();
  }

  sprayBuff() {}

  updateSelf() {
    this.y += this.speedY;
  }

  drawMisselBuff() {}

  drawShieldBuff() {}

  drawHealthBuff() {
    if (this.y < 600) {
      this.healthImage.onload = () => {
        setInterval(() => {
          this.ctx.drawImage(this.healthImage, this.x, this.y, 25, 25);
          this.updateSelf();
        }, 5);
      };
    } else {
      this.buff = false;
    }
  }

  drawSprayBuff() {}
}
