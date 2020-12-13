class Score {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.score = 0;
    this.animDone = 0;
  }

  drawSelf() {
    this.ctx.font = `17px 'Press Start 2P'`;
    this.ctx.fillStyle = "lightgreen";
    this.ctx.fillText(`Score: ${this.score}`, 400, 20);
  }

  killUpdate() {
    this.score += 10;
    this.animDone = 1;
  }

  drawScoreIncrease() {
    if (this.animDone > 0) {
      this.ctx.fillStyle = "lightyellow";
      this.ctx.font = `25px 'Press Start 2P'`;
      this.ctx.fillText(`+10`, this.canvas.width / 2 -10, 30);
      setTimeout(() => {
        this.animDone = 0;
      }, 500);
    }
  }

  timeUpdate() {
    this.score++;
  }
}
