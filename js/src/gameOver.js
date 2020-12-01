class GameOver {
    constructor(score){
        this.score = score;
        this.canvas= document.getElementById('canvas')
        this.ctx = this.canvas.getContext('2d');
    }

    gameOverScreen() {
        console.log(this.score);
    }



}