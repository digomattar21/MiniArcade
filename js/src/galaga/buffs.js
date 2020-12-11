class Buffs {
  constructor(canvas, x, y, buffList) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.x = x;
    this.y = y;
    //this.types = ['missel', 'shield', 'health', 'spray']
    this.types = buffList
    this.speedY = 0.9;
    this.healthImage = new Image();
    this.bulletImage= new Image();
    this.buff = false;
    this.playerGrab=false;
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
    if (this.playerGrab==false){
      this.drawHealthBuff();
    } else{
      return 'Grabbed'
    }
  }

  sprayBuff() {
    if (this.playerGrab==false){
      this.drawSprayBuff();
    } else{
      return 'Grabbed'
    }
      
  }

  updateSelf() {
    this.y += this.speedY;
  }

  drawMisselBuff() {}

  drawShieldBuff() {}

  drawHealthBuff() {
    if (this.y < 600 && this.playerGrab===false) {
        this.healthImage.src = "../../../img/health.png";
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

  drawSprayBuff() {
      if (this.y < 600 && this.playerGrab === false){
        this.bulletImage.src = "../../../img/bullet.png";
          this.bulletImage.onload=()=>{
              setInterval(()=>{
                  this.ctx.drawImage(this.bulletImage, this.x,this.y, 25, 25);
                  this.updateSelf();
              },5);
          }
      } else {
          this.buff= false;
      }
  }
}
