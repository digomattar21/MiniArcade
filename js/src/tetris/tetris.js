class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.ctx.scale(20, 20);
    this.nextPiece = [Math.floor(Math.random() * 7) + 1];
    this.player = {
      pos: { x: 5, y: 3 },
      matrix: this.createPiece(this.nextPiece[0]),
    };
    this.isOver = false;
    this.time = 0;
    this.arena;
    this.colors = [
      "lightgreen",
      "darkgreen",
      "darkblue",
      "lightblue",
      "purple",
      "yellow",
      "orange",
    ];
    this.score = 0;
    this.gameOver;
    this.inc;
    this.next;
    this.noGameArea = 7;
    this.scores = [];
  }

  start(interval) {
    var isStorage = 'undefined' !== localStorage;
    var extra=[];
    var items = [];
    if (isStorage && localStorage.length===10) {
        for (let i = 0;i < 10; i++) {
            items.push(localStorage.key(i));
        }
        items.forEach((item,index)=>{
            var it = localStorage.getItem(item);
            this.scores.push({name:`${item}`,score:it})
        })

        this.scores.sort((a,b)=>{a.score-b.score})
    }
    else if (localStorage.length>10){
        for (let i=10;i<localStorage.length;i++){
            extra.push(localStorage.key(i))
        }
        extra.forEach((extra,index)=>{
            localStorage.removeItem(`${extra}`)
        })
        for (let i = 0;i < 10; i++) {
            items.push(localStorage.key(i));
        }
        items.forEach((item,index)=>{
            var it = localStorage.getItem(item);
            this.scores.push({name:`${item}`,score:it})
        })
        this.scores.sort((a,b)=>{a.score-b.score})
    } else if (localStorage.length<=9){
        this.scores = [{name:'Fedora', score: 501},
        {name:'Kevin Mitnick', score: 380},
        {name:'Carrao da Monica', score: 345},
        {name:'Pied Piper', score: 324},
        {name:'Richar Jenkins', score: 313},
        {name:'Hans Solo', score: 219},
        {name:'Gozdzila', score: 149},
        {name:'Firefox', score: 91},
        {name:'Kali', score: 66},
        {name:'I Love You', score: 0}
        ]
    }
    setTimeout(() => {
      let renderText1 = () => {
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, this.noGameArea, this.canvas.width, 400);
        this.ctx.fillStyle = "red";
        this.ctx.font = "2px 'Press Start 2P'";
        this.ctx.fillText("READY?", 0.1, this.noGameArea + 8);
        this.ctx.font = "1px Press Start";
        this.ctx.fillStyle = "white";
        this.ctx.fillText("Rotate", 5, this.noGameArea + 2);
        this.ctx.fillText("Left", 1, this.noGameArea + 10);
        this.ctx.fillText("Right", 9, this.noGameArea + 10);
        this.ctx.fillText("down", 5, 24);
      };
      WebFont.load({
        google: { families: ["Press Start 2P"] },
        active: renderText1,
      });
    }, 100);

    setTimeout(() => {
      let renderText2 = () => {
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, this.noGameArea, this.canvas.width, 400);
        this.ctx.fillStyle = "red";
        this.ctx.font = "2px 'Press Start 2P'";
        this.ctx.fillText("SET?", 3, this.noGameArea + 8);
        this.ctx.font = "1px Press Start";
        this.ctx.fillStyle = "white";
        this.ctx.fillText("Rotate", 5, this.noGameArea + 2);
        this.ctx.fillText("Left", 1, this.noGameArea + 10);
        this.ctx.fillText("Right", 9, this.noGameArea + 10);
        this.ctx.fillText("down", 5, 24);
      };
      WebFont.load({
        google: { families: ["Press Start 2P"] },
        active: renderText2,
      });
    }, 2000);

    setTimeout(() => {
      let renderText3 = () => {
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, this.noGameArea, this.canvas.width, 400);
        this.ctx.fillStyle = "red";
        this.ctx.font = "2px 'Press Start 2P'";
        this.ctx.fillText("GO!", 3, this.noGameArea + 8);
      };
      WebFont.load({
        google: { families: ["Press Start 2P"] },
        active: renderText3,
      });
    }, 4000);

    setTimeout(() => {
      this.arena = this.createMatrix(12, 20);
      const update = () => {
        this.draw();

        if (!this.isOver) {
          window.requestAnimationFrame(update);
          this.time++;
        } else {
          window.cancelAnimationFrame(update);
          var gameOver = new GameOver(this.score, this.canvas);
          gameOver.renderText();
          this.updateScore();
        }

        if (this.time % interval == 0) {
          this.playerDrop();
          if (this.time % 150 == 0) {
            this.score++;
          }
        }
      };
      window.requestAnimationFrame(update);
    }, 5000);
  }

  draw() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawMatrix(this.arena, { x: 0, y: 0 });
    this.drawMatrix(this.player.matrix, this.player.pos);
    this.ctx.fillStyle = "red";
    this.drawScore();
    if (this.inc > 0) {
      this.scoreAnimation();
      setTimeout(() => {
        this.inc = 0;
      }, 800);
    }

    this.drawNextPiece();
    this.drawLine();
  }

  drawMatrix(matrix, offset) {
    matrix.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          this.ctx.fillStyle = this.colors[value - 1];
          //this.ctx.strokeRect(x+offset.x+0.1,y+offset.y+0.1,1,1)
          this.ctx.fillRect(x + offset.x, this.noGameArea + y + offset.y, 1, 1);
        }
      });
    });
  }

  drawPiece(matrix, offset) {
    matrix.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          this.ctx.fillStyle = this.colors[value - 1];
          //this.ctx.strokeRect(x+offset.x+0.1,y+offset.y+0.1,1,1)
          this.ctx.fillRect(x + offset.x, y + offset.y, 1.1, 1.2);
        }
      });
    });
  }

  createMatrix(w, h) {
    const matrix = [];
    while (h--) {
      matrix.push(new Array(w).fill(0));
    }
    return matrix;
  }

  collision(arena, player) {
    const m = this.player.matrix;
    const o = this.player.pos;
    for (let y = 0; y < m.length; ++y) {
      for (let x = 0; x < m[y].length; x++) {
        if (
          m[y][x] !== 0 &&
          (arena[y + o.y] && arena[y + o.y][x + o.x]) !== 0
        ) {
          return true;
        }
      }
    }
    return false;
  }

  merge(arena, player) {
    player.matrix.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          arena[y + player.pos.y][x + player.pos.x] = value;
        }
      });
    });
  }

  playerDrop() {
    this.player.pos.y++;
    if (this.collision(this.arena, this.player)) {
      this.player.pos.y--;
      this.merge(this.arena, this.player);
      this.resetPiece();
      this.player.pos.y = 3;
    }
    //check if row is filled then clear it
    let newArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let filled = 0;

    for (let y = 0; y < this.arena.length; y++) {
      let rowFilled = this.arena[y].every(function (e) {
        return e > 0;
      });
      if (rowFilled) {
        filled++;
        this.arena.splice(y, 1);
        this.arena.unshift(newArray);
      }
    }
    if (filled != 0) {
      this.inc = 10 * filled * filled;
      this.scoreAnimation();
      this.score += this.inc;
    }
  }

  move(dir) {
    this.player.pos.x += dir;
    if (this.collision(this.arena, this.player)) {
      this.player.pos.x -= dir;
    }
  }

  rotatePlayer(direction) {
    const pos = this.player.pos.x;
    let inc = 1;
    this.rotate(this.player.matrix, direction);
    while (this.collision(this.arena, this.player.matrixmatrix)) {
      this.player.pos.x += inc;
      inc = -(inc + (inc > 0 ? 1 : -1));

      if (inc > this.player.matrix[0].length) {
        this.rotate(this.player.matrix, -direction);
        this.player.pos.x = pos;
        return;
      }
    }
  }

  rotate(matrix, direction) {
    for (let y = 0; y < matrix.length; y++) {
      for (let x = 0; x < y; x++) {
        [matrix[x][y], matrix[y][x]] = [matrix[y][x], matrix[x][y]];
      }
    }
    if (direction > 0) {
      matrix.forEach((row) => row.reverse());
    } else {
      matrix.reverse();
    }
  }

  resetPiece() {
    this.nextPiece.push(Math.floor(Math.random() * 7) + 1);
    this.player.matrix = this.createPiece(this.nextPiece[0]);
    this.player.pos.y = 3;
    this.player.pos.x = 6;
    this.nextPiece.shift();
    this.next = this.nextPiece[0];

    if (this.collision(this.arena, this.player)) {
      this.isOver = true;
    }
  }

  drawNextPiece() {
    if (this.next) {
      this.ctx.fillStyle = "white";
      this.ctx.font = '1px "Press Start 2P';
      this.ctx.fillText("Next", 4.2, 1.2);
      let matrix = this.createPiece(this.next);
      this.drawPiece(matrix, { x: 5, y: 1.9 });
    }
  }

  drawLine() {
    this.ctx.strokeStyle = "darkgray";
    this.ctx.lineWidth = 0.1;
    this.ctx.beginPath();
    this.ctx.moveTo(0, this.noGameArea - 0.5);
    this.ctx.lineTo(this.canvas.width, this.noGameArea - 0.5);
    this.ctx.stroke();
  }

  scoreAnimation() {
    this.ctx.font = '2px "Press Start 2p"';
    this.ctx.fillStyle = "green";
    this.ctx.fillText(`+${this.inc}`, 5.5, this.noGameArea + 15);
  }

  drawScore() {
    this.ctx.font = '0.7px "Press Start 2P"';
    this.ctx.fillStyle = "blue";
    this.ctx.fillText(`Score:${this.score}`, 5.5, this.noGameArea + 1);
  }


  updateScore() {
    var score = document.getElementById("score");
    var highscoreList = document.getElementById('highscores')
    score.value = this.score;
    var submitBtn  = document.getElementsByClassName("submitBtn")[0];
    submitBtn.addEventListener('click', (event)=>{
    event.preventDefault();
    var playerName = document.getElementById("player_name").value;
        
      for (let i = 0; i<this.scores.length;i++){
        if ((this.scores[i].score<this.score) && (this.scores[i+1].score>=this.score)){
            this.scores[i].name = playerName;
            this.scores[i].score=this.score;
        } else if (this.scores[this.scores.length-1].score< this.score){
          this.scores[this.scores.length-1].name = playerName;
          this.scores[this.scores.length-1].score= this.score;
        }
      }

      this.scores.forEach((player)=>{
          var li = document.createElement('LI');
          li.innerHTML= `${player.name} : ${player.score}`;
          highscoreList.appendChild(li);
          highscoreList.style.visibility='visible';
          highscoreList.style.color='lightgray';
      })

      document.getElementById("myform").style.display='none';
      submitBtn.style.visibility='hidden';
    });

  }

  createPiece(x) {
    switch (x) {
      case 1:
        return [
          [0, 1, 0],
          [1, 1, 1],
          [0, 0, 0],
        ];
      case 2:
        return [
          [0, 2, 0, 0],
          [0, 2, 0, 0],
          [0, 2, 0, 0],
          [0, 2, 0, 0],
        ];
      case 3:
        return [
          [3, 3],
          [3, 3],
        ];
      case 4:
        return [
          [0, 4, 0],
          [0, 4, 0],
          [4, 4, 0],
        ];

      case 5:
        return [
          [0, 5, 0],
          [0, 5, 0],
          [0, 5, 5],
        ];
      case 6:
        return [
          [6, 6, 0],
          [0, 6, 6],
          [0, 0, 0],
        ];
      case 7:
        return [
          [0, 7, 7],
          [7, 7, 0],
          [0, 0, 0],
        ];
      default:
        break;
    }
  }
}
