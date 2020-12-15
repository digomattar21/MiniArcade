class GameOver {
  constructor(score, canvas) {
    this.score = score;
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.index = 0;
  }

  gameOverScreen() {
    this.renderText();
  }

  renderText() {
    let renderText = () => {
      this.ctx.fillStyle = "black";
      this.ctx.fillRect(0, 12.5, 12, 6);
      this.ctx.font = `1.2px 'Press Start 2P'`;
      this.ctx.fillStyle = "red";
      this.ctx.textAlign = "center";
      this.ctx.textBaseline = "middle";
      this.ctx.fillText("Game Over", 6, 14);
      this.ctx.fillText(`Score: ${this.score}`, 6, 16);
      console.log("entrou");
    };
    WebFont.load({
      google: { families: ["Press Start 2P"] },
      active: renderText,
    });
  }
}
