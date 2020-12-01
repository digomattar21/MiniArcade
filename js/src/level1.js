class Game {
    constructor(canvas, level){
        this.canvas = canvas;
        this.level=level;
        this.ctx = this.canvas.getContext('2d');
        this.ctx.scale(20,20);
        this.matrix=this.createPiece(Math.floor(Math.random()*7));
        this.player = {
            pos:{x:5,y:3},
            matrix:this.matrix,
        }
        this.isOver = false;
        this.time =0;
        this.arena;
        this.colors=['red','green', 'darkblue', 'lightblue', 'purple', 'yellow', 'orange'];
        this.score;
        this.gameOver;
        this.levelCleared;
    }

    start (){
        this.arena = this.createMatrix(12,20);
        this.score = new Score(this.canvas);
        
        const update = () => {
            this.draw();

            if (!this.isOver){
                window.requestAnimationFrame(update)
                this.time++;
            } else{
                this.gameOver = new GameOver(this.score.getScore());
                this.gameOver.gameOverScreen();
            }

            if (this.time % 60==0 && this.level=='easy'){
                this.playerDrop(); 
            }
            else if (this.time % 40==0 && this.level=='medium'){
                this.playerDrop();
            }
            else if (this.time % 20==0 && this.level=='hard'){
                this.playerDrop();
            }
            
        }
        
        window.requestAnimationFrame(update);

    }

    draw () {
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
        this.drawMatrix(this.arena, {x:0,y:0})
        this.drawMatrix(this.player.matrix, this.player.pos);
    }

    drawMatrix(matrix, offset,color){
        matrix.forEach((row,y)=>{
            row.forEach((value,x)=>{
                if (value!==0){
                    this.ctx.fillStyle= this.colors[value];
                    this.ctx.strokeStyle='black'
                    //this.ctx.strokeRect(x+offset.x+0.1,y+offset.y+0.1,1,1)
                    this.ctx.fillRect(x + offset.x,y+offset.y,1,1);
                }
            })
        })
    }

    createMatrix(w,h){
        const matrix =[];
        while(h--){
            matrix.push(new Array(w).fill(0));
        }
        return matrix;
    }

    collision(arena,player){
        const m = this.player.matrix;
        const o = this.player.pos;
        for (let y =0; y<m.length; ++y){
            for (let x =0;x<m[y].length;x++){
                if (m[y][x]!==0 && (arena[y + o.y] && arena[y+o.y][x+o.x])!==0){
                    return true;
                }
            }
        }
        return false;
    }

    merge(arena,player) {
        player.matrix.forEach((row,y)=>{
            row.forEach((value,x)=>{
                if (value!==0){
                    arena[y+player.pos.y][x+player.pos.x] = value;
                }
            })
        })
    }   

    playerDrop(){
        this.player.pos.y++;
       if (this.collision(this.arena, this.player)){
           this.player.pos.y--;
           this.merge(this.arena, this.player);
           this.resetPiece()
           this.player.pos.y=0;
       }
       //check if row is filled then clear it 
       let newArray = [0,0,0,0,0,0,0,0,0,0,0,0]

       for (let y = 0; y<this.arena.length;y++){
        let rowFilled = this.arena[y].every(function (e){
            return e>0;
        })
        if (rowFilled){
            this.arena.splice(y,1);
            this.arena.unshift(newArray);
            this.score.rowScore();
        }
        ;
    }
    }

    move(dir) {
        this.player.pos.x += dir;
        if (this.collision(this.arena,this.player)){
            this.player.pos.x-=dir;
        }
    }

    rotatePlayer(direction) {
        const pos = this.player.pos.x;
        let inc =1;
        this.rotate(this.player.matrix, direction)
        while(this.collision(this.arena, this.matrix)){
            this.player.pos.x+=inc;
            inc = -(inc +(inc>0?1:-1));

            if(inc > this.matrix[0].length){
                this.rotate(this.player.matrix, -direction);
                this.player.pos.x=pos;
                return;
            }
        }

    }

    rotate(matrix,direction) {
        for (let y=0;y<matrix.length;y++){
            for (let x=0; x<y;x++){
                [
                    matrix[x][y],
                    matrix[y][x],
                ] =[
                    matrix[y][x],
                    matrix[x][y],
                ];
            }
        }
        if (direction>0){
            matrix.forEach(row=> row.reverse());

        }else{
            matrix.reverse();
        }
    }


    resetPiece() {
        this.player.matrix = this.createPiece(Math.floor(Math.random()*7));
        this.player.pos.y =-1;
        this.player.pos.x = 6;

        if(this.collision(this.arena, this.player)){
            this.isOver=true;

        }
 
    }

    createPiece(x) {
        switch(x){
            case 0:
                return [
                    [0,0,0],
                    [1,1,1],
                    [0,1,0]
                ]
            case 1:
                return [
                    [0,0,0],
                    [2,2,2],
                    [0,0,0]
                ]
            case 2:
                return [
                    [0,0,0],
                    [0,3,3],
                    [0,3,3]
                ]
            case 3:
                return [
                    [0,0,0],
                    [4,0,0],
                    [4,4,4]
                ]

            case 4:
                return [
                    [0,0,0],
                    [0,0,5],
                    [5,5,5]
                ]
            case 5:
                return [
                    [0,0,0],
                    [6,6,0],
                    [0,6,6]
                ]
            case 6:
                return [
                    [0,0,0],
                    [0,7,7],
                    [7,7,0]
                ]
            default:
                break;
        }
        }

    
}
    
