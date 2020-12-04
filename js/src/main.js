window.onload = () =>{
    document.getElementById('hard').onclick = () => {
        startTetris(40);

        document.getElementById('homeButton').addEventListener('click', ()=>{
            renderHomeScreen()
        })
    }


    document.getElementById('bbBtn').onclick = () => {
        startBrickBreaker()
    
        document.getElementById('homeButton').addEventListener('click', ()=>{
            renderHomeScreen();
    
        })
    }

    //var restartBtn = document.getElementById('restart')
    var homeBtn = document.getElementById('homeButton')
    var btnsCopy = document.getElementById('buttons').cloneNode(true);
    var highscoreContainer = document.getElementById('highscores-container');
    var mainImg = document.getElementById('title');
    let canvasContainer = document.getElementById('canvas-container');
    var commands = document.getElementById('commands').cloneNode(true);

    

    function startTetris(interval){
        let element=document.getElementById('canvas-container');
        let canvas = document.createElement('canvas');
        let div = document.createElement('div');

        highscoreContainer.style.visibility= 'visible';

        homeBtn.style.visibility='visible';
        
        canvas.id='canvas';
        canvas.height= 540;
        canvas.width=240;
        element.appendChild(canvas);

        var commands = new Image();
        commands.src='../../img/commands.png';
        commands.id='commands'
        element.appendChild(div);
        div.appendChild(commands);
        console.log(commands)
    
        
        let canvasTetris = document.getElementById('canvas');


        //Removing the buttons that user pressed to choose game
        let buttonsContainer = document.getElementById('container');

        while (buttonsContainer.hasChildNodes()){
            buttonsContainer.removeChild(buttonsContainer.firstChild);
        }

        if (interval==40){
            var game = new Game(canvasTetris, 'hard');
        }
        game.start(interval)
        
        
        WebFont.load({
            google: {families: ['Press Start 2P']},
        active: game.scoreAnimation()
        });
        
        
        window.addEventListener('keydown', (event)=>{
            let key = event.key;
            if(!game.isOver){
            event.preventDefault()}
            switch (key){
                case "ArrowLeft":
                    game.time++;
                    game.move(-1);
                    break;
                case 'ArrowRight':
                    game.time++;
                    game.move(1)
                    break;
                case 'ArrowDown':
                    game.playerDrop();
                    game.time++;
                    break;
                case 'ArrowUp':
                    game.time++;
                    game.rotatePlayer(1);
                    break;
            }
        })
        WebFont.load({
            google: {families: ['Press Start 2P']},
          active: game.drawScore()
    });
    homeBtn.scrollIntoView(false)
    }


    function startBrickBreaker(){
        let canvasContainer = document.getElementById('canvas-container');
        let bbCanvas = document.createElement('canvas');
        let container = document.getElementById('homebutton-container');

        

        container.removeChild(container.lastChild);
        homeBtn.style.visibility='visible';
        

        while(canvasContainer.hasChildNodes()){
            canvasContainer.removeChild(canvasContainer.firstChild)
        }

        bbCanvas.id='canvas';
        bbCanvas.height=320;
        bbCanvas.width=480;
        bbCanvas.style.marginLeft='10%';
        canvasContainer.appendChild(bbCanvas);

        let canvas = document.getElementById('canvas');

        let buttonsContainer = document.getElementById('container');

        while (buttonsContainer.hasChildNodes()){
            buttonsContainer.removeChild(buttonsContainer.firstChild);
        }


        //Initialize game
        var game1 = new bbGame(canvas, 4);
        game1.renderStartScreen()

    }





    function renderHomeScreen () {
        var btnDiv = document.getElementById('btn');
        var homeBtn = document.getElementById('homeButton');
        var highscoreContainer = document.getElementById('highscores-container').cloneNode(true);
        
        while(btnDiv.hasChildNodes()){
            btnDiv.removeChild(btnDiv.firstChild);
        }
        
        console.log(commands)
        
        while (canvasContainer.hasChildNodes()){
            canvasContainer.removeChild(canvasContainer.firstChild);
        }

        var buttons = document.createElement('div');
        var container = document.createElement('div');
        container.id='container';
        buttons.id='buttons';
        btnDiv.appendChild(buttons);
        buttons.appendChild(container);

        var button1 = document.createElement('button');
        var button2 = document.createElement('button');

        button1.id='hard';
        button2.id='bbBtn';

        container.appendChild(button1);
        container.appendChild(button2);

        //restartBtn.style.visibility='hidden';
        homeBtn.style.visibility='hidden';

        canvasContainer.appendChild(highscoreContainer);
        highscoreContainer.style.visibility='hidden';
        //canvasContainer.appendChild(commands);
        //commands.style.visibility='hidden';

        button1.onclick=()=>{
            startTetris(40);
            highscoreContainer.style.visibility='visible';
        }

        button2.addEventListener('click', ()=>{
            startBrickBreaker();
            highscoreContainer.style.visibility='visible';
        })



    }
    }

    /*setTimeout(()=>{
        this.ctx.fillStyle='black';
        this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
        this.ctx.font= `60px 'Press Start 2P'`;
        this.ctx.fillStyle='red';
        this.ctx.fillText('GO!', this.canvas.width/2-70, this.canvas.height/2+10);
    },1500);

    setTimeout(()=>{
        this.start()
    },2000)K*/