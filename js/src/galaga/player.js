class Player {
  constructor(canvas, health) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.health = health;
    this.player = new Image();
    this.playerBuff = false;
    this.playerX = this.canvas.width / 2 - 40;
    this.playerY = this.canvas.height - 120;
    this.speedX = 0;
    this.speedY = 0;
    this.shieldBuff = false;
  }

  drawSelf() {
    if (this.playerBuff && this.shieldBuff) {
      this.player.src = "./img/sprayShieldBuff.png";
    } else if (this.shieldBuff) {
      this.player.src = "./img/shieldBuff.png";
    } else if (this.playerBuff) {
      this.player.src = "./img/spaceship_buff.png";
    } else {
      this.player.src = "./img/spaceship.png";
    }

    this.player.onload = () => {
      this.ctx.drawImage(this.player, this.playerX, this.playerY, 80, 80);
    };

    this.drawHealth();
  }

  drawHealth() {
    this.ctx.font = `17px "Press Start 2P"`;
    this.ctx.fillStyle = "lightblue";
    this.ctx.fillText(`Health ${this.health}`, 20, 20);
  }

  moveRight() {
    //We can use set interval to change the speed gradually.
    this.playerX += 25;
  }

  moveLeft() {
    //We can use set interval to change the speed gradually.
    this.playerX -= 25;
  }

  moveUp() {
    //We can use set interval to change the speed gradually.
    this.playerY -= 20;
  }

  moveDown() {
    //We can use set interval to change the speed gradually.
    this.playerY += 20;
  }
}
