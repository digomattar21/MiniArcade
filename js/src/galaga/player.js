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
    this.isOver = false;
    this.mobile = false;
    this.font = `17px "Press Start 2P"`;
  }

  drawSelf() {
    if (this.mobile) {
      this.font = `8px "Press Start 2P"`;
    }
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
    this.ctx.font = this.font;
    this.ctx.fillStyle = "lightblue";
    this.ctx.fillText(`Health ${this.health}`, 5, 20);
  }

  moveRight() {
    if (!this.isOver) {
      this.playerX += 25;
    }
  }

  moveLeft() {
    if (!this.isOver) {
      this.playerX -= 25;
    }
  }

  moveUp() {
    if (!this.isOver) {
      this.playerY -= 20;
    }
  }

  moveDown() {
    if (!this.isOver) {
      this.playerY += 20;
    }
  }

  move(x, y) {
    if (!this.isOver) {
      this.playerX = x;
      this.playerY = y;
    }
  }
}
