class GameLost {
  constructor(canvas, score) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.score = score;
  }

  renderSelf() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 200, 600, 250);
    this.ctx.font = `40px 'Press Start 2P'`;
    this.ctx.fillStyle = "red";
    this.ctx.font = `28px 'Press Start 2P'`;
    this.ctx.fillText("Game Over", 150, 300);
    this.ctx.fillText(`Score: ${this.score}`, 150, 375);
    this.playLoserSound(true);
  }

  playLoserSound(play) {
    var sound = document.getElementsByTagName("audio")[4];
    sound.setAttribute("preload", "auto");
    sound.style.display = "none";

    if (play) {
      sound.currentTime = 0;
      sound.play();
    } else {
      sound.pause();
    }
  }
}
