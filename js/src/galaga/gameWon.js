class GameWon {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.mobileDevice = false;
    this.font = `25px 'Press Start 2P'`;
    this.font2 = `12px 'Press Start 2P'`;
  }

  renderSelf() {
    if (this.mobileDevice) {
      this.font = `13px 'Press Start 2P'`;
      this.font2 = `7px 'Press Start 2P'`;
    }
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 200, this.canvas.width, 250);
    this.ctx.font = this.font;
    this.ctx.fillStyle = "red";
    this.ctx.fillText("You Won!!!", 150, 300);
    this.ctx.fillText("Thank You for Playing", 30, 375);
    this.ctx.fillStyle = "white";
    this.ctx.font = this.font2;
    this.ctx.fillText(
      "  Play with arrow instead of mouse if you dare",
      15,
      410
    );
    this.playWinnerSound(true);
  }

  playWinnerSound(play) {
    var sound = document.getElementsByTagName("audio")[5];
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
