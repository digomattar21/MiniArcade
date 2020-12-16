class Score {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.score = 0;
    this.animDone = 0;
    this.mobile = false;
    this.font = `17px 'Press Start 2P'`;
    this.font2 = `25px 'Press Start 2P'`;
  }

  drawSelf() {
    if (this.mobile) {
      this.font = `8px 'Press Start 2P'`;
      this.font2 = `12px 'Press Start 2P'`;
    }
    this.ctx.font = this.font;
    this.ctx.fillStyle = "lightgreen";
    if (this.mobile) {
      this.ctx.fillText(`Score: ${this.score}`, this.canvas.width - 100, 20);
    } else {
      this.ctx.fillText(`Score: ${this.score}`, this.canvas.width - 200, 20);
    }
  }

  killUpdate() {
    this.score += 10;
    this.animDone = 1;
  }

  drawScoreIncrease() {
    if (this.animDone > 0) {
      this.ctx.fillStyle = "lightyellow";
      this.ctx.font = this.font2;
      this.ctx.fillText(`+10`, this.canvas.width / 2 - 10, 30);
      setTimeout(() => {
        this.animDone = 0;
      }, 500);
    }
  }

  timeUpdate() {
    this.score++;
  }
}
