class GameWon {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
  }

  renderSelf() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 200, 600, 250);
    this.ctx.font = `25px 'Press Start 2P'`;
    this.ctx.fillStyle = "red";
    this.ctx.fillText("You Won!!!", 150, 300);
    this.ctx.fillText("Thank You for Playing", 30, 375);
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
