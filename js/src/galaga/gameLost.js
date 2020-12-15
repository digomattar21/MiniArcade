class GameLost {
  constructor(canvas, score) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.score = score;
    this.mobileDevice = false;
    this.font = `40px 'Press Start 2P'`;
    this.font2 = `28px 'Press Start 2P'`;
  }

  renderSelf() {
    if (this.mobileDevice) {
      this.font = `20px 'Press Start 2P'`;
      this.font2 = `14px 'Press Start 2P'`;
    }
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 200, this.canvas.width, 250);
    this.ctx.font = this.font;
    this.ctx.fillStyle = "red";
    this.ctx.font = this.font2;
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
