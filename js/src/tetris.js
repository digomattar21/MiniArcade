class Game {
    constructor(canvas){
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.ctx.scale(20,20);
        this.nextPiece=[Math.floor(Math.random()*7)+1];
        this.player = {
            pos:{x:5,y:3},
            matrix:this.createPiece(this.nextPiece[0]),
        }
        this.isOver = false;
        this.time =0;
        this.arena;
        this.colors=['lightgreen','darkgreen', 'darkblue', 'lightblue', 'purple', 'yellow', 'orange'];
        this.score=0;
        this.gameOver;
        this.inc;
        this.nextLvlWarning = true;
        this.next;
        this.noGameArea = 7;
    }
    
    start (interval){
        setTimeout(()=>{
            let renderText1 = ()=>{
            this.ctx.fillStyle= 'black';
            this.ctx.fillRect(0,this.noGameArea,this.canvas.width, 400)
            this.ctx.fillStyle='red';
            this.ctx.font="2px 'Press Start 2P'"
            this.ctx.fillText('READY?', 0.1,this.noGameArea+ 8)
            }
            WebFont.load({
                google: {families: ['Press Start 2P']},
              active: renderText1
        });
        },100)


        setTimeout(()=>{
        let renderText2 = ()=>{
        this.ctx.fillStyle= 'black';
        this.ctx.fillRect(0,this.noGameArea,this.canvas.width, 400)
        this.ctx.fillStyle='red';
        this.ctx.font="2px 'Press Start 2P'"
        this.ctx.fillText('SET?', 3,this.noGameArea+8)
        }
        WebFont.load({
            google: {families: ['Press Start 2P']},
          active: renderText2
    });
    },1000)

    setTimeout(()=>{
        let renderText3 = ()=>{
        this.ctx.fillStyle= 'black';
        this.ctx.fillRect(0,this.noGameArea,this.canvas.width, 400)
        this.ctx.fillStyle='red';
        this.ctx.font="2px 'Press Start 2P'"
        this.ctx.fillText('GO!', 3,this.noGameArea+8)
        }
        WebFont.load({
            google: {families: ['Press Start 2P']},
          active: renderText3
    });
    },2000)


        
        setTimeout(()=>{
            
            this.arena = this.createMatrix(12,20);
            const update = () => {
            this.draw();

            if (!this.isOver){
                window.requestAnimationFrame(update)
                this.time++;
            } else{
                window.cancelAnimationFrame(update);
                var gameOver = new GameOver(this.score,this.canvas);
                gameOver.renderText();
                
            }  
            
            if (this.time % interval==0){
                this.playerDrop();
                if (this.time%150==0){
                    this.score++;
                }
            }
        
            //console.log(this.inc)
        }
        window.requestAnimationFrame(update);
    },3000)
        
    

    }

    draw () {
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
        this.drawMatrix(this.arena, {x:0,y:0})
        this.drawMatrix(this.player.matrix, this.player.pos);
        this.ctx.fillStyle='red';
        this.drawScore();
        if  (this.inc >0){
        this.scoreAnimation()
        setTimeout(()=>{
            this.inc=0;
        },800)}
        if (this.nextLvlWarning){
            this.drawWarning();
            setTimeout(()=>{
                this.nextLvlWarning=false;
            },1000)
        }

        this.drawNextPiece();
        this.drawLine();
        
    }

    drawMatrix(matrix, offset){
        matrix.forEach((row,y)=>{
            row.forEach((value,x)=>{
                if (value!==0){
                this.ctx.fillStyle= this.colors[value-1];
                //this.ctx.strokeRect(x+offset.x+0.1,y+offset.y+0.1,1,1)
                this.ctx.fillRect(x + offset.x,this.noGameArea+y+offset.y,1,1);
                } 
            })
        })
    }

    drawPiece(matrix, offset){
        matrix.forEach((row,y)=>{
            row.forEach((value,x)=>{
                if (value!==0){
                this.ctx.fillStyle= this.colors[value-1];
                //this.ctx.strokeRect(x+offset.x+0.1,y+offset.y+0.1,1,1)
                this.ctx.fillRect(x + offset.x,y+offset.y,1.1,1.2);
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
           this.resetPiece();
           this.player.pos.y=3;
       }
       //check if row is filled then clear it 
       let newArray = [0,0,0,0,0,0,0,0,0,0,0,0]
       let filled = 0;

       for (let y = 0; y<this.arena.length;y++){
        let rowFilled = this.arena[y].every(function (e){
            return e>0;
        })
        if (rowFilled){
            filled++;
            this.arena.splice(y,1);
            this.arena.unshift(newArray);
            
        };
    }
        if (filled!=0){
            this.inc = 10*filled*(filled);
            this.scoreAnimation();
            this.score+=this.inc;
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
        while(this.collision(this.arena, this.player.matrixmatrix)){
            this.player.pos.x+=inc;
            inc = -(inc +(inc>0?1:-1));

            if(inc > this.player.matrix[0].length){
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
        this.nextPiece.push(Math.floor(Math.random()*7)+1);
        this.player.matrix = this.createPiece(this.nextPiece[0]);
        this.player.pos.y = 3;
        this.player.pos.x = 6;
        this.nextPiece.shift();
        this.next = this.nextPiece[0];

        if(this.collision(this.arena, this.player)){
            this.isOver=true;
            console.log(true)

        }
 
    }

   

    drawNextPiece () {
        if (this.next){
            this.ctx.fillStyle = 'white';
            this.ctx.font='1px georgia';
            this.ctx.fillText('Next',5,1.2);
            let matrix = this.createPiece(this.next)
            this.drawPiece(matrix, {x:5,y:1.9})  
        }
    }

    drawLine() {
        this.ctx.strokeStyle = 'darkgray';
        this.ctx.lineWidth=0.1
        this.ctx.beginPath();
        this.ctx.moveTo(0,this.noGameArea-0.5);
        this.ctx.lineTo(this.canvas.width, this.noGameArea-0.5);
        this.ctx.stroke();
    }


    drawWarning() {
        //console.log('implementar')
    }

    scoreAnimation() {
        this.ctx.font = '2px "Press Start 2p"';
        this.ctx.fillStyle='green';
        this.ctx.fillText(`+${this.inc}`,5.5,this.noGameArea+15);

    }


    drawScore() {
        this.ctx.font='0.7px "Press Start 2P"';
        this.ctx.fillStyle='blue';
        this.ctx.fillText(`Score:${this.score}`,5.5,this.noGameArea+1)
    }

    createPiece(x) {
        switch(x){
            case 1:
                return [
                    [0,1,0],
                    [1,1,1],
                    [0,0,0]
                ]
            case 2:
                return [
                    [0,2,0,0],
                    [0,2,0,0],
                    [0,2,0,0],
                    [0,2,0,0],
                ]
            case 3:
                return [
                    [3,3],
                    [3,3],
                ]
            case 4:
                return [
                    [0,4,0],
                    [0,4,0],
                    [4,4,0]
                ]

            case 5:
                return [
                    [0,5,0],
                    [0,5,0],
                    [0,5,5]
                ]
            case 6:
                return [
                    [6,6,0],
                    [0,6,6],
                    [0,0,0]
                ]
            case 7:
                return [
                    [0,7,7],
                    [7,7,0],
                    [0,0,0]
                ]
            default:
                break;
        }
        }

    
}
    
