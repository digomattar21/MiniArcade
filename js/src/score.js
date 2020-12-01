class Score {
    constructor(canvas){
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.score = 0;
    }

    timeScore() {
        this.score++;
    }

    getScore (){
        return this.score;
    }

    rowScore() {
        this.score+=12;
}
}