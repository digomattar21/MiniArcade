window.onload = () =>{
    document.getElementById('tetris').onclick = () => {
        startTetris(40);

        document.getElementById('homeButton').addEventListener('click', ()=>{
            renderHomeScreen()
        })
    }


    document.getElementById('galaga').onclick = () => {
        startGalaga();
    
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
    //var commands = document.getElementById('commands').cloneNode(true);

    

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
            var game = new Game(canvasTetris);
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

        canvasTetris.addEventListener('touchstart', function (e){
            let touch = e.touches;
            let x =touch[0].clientX;
            let y = touch[0].clientY;

            console.log(touch);


            if (x > 240){
                game.move(1);
                game.time++;

            } else if (x<150){
                game.move(-1);
                game.time++;
            }

            if (y < 520 && x > 145 && x<245){
                game.rotatePlayer(1);
                game.time++;
            }

            if (y>600 && x>145 && x <245){
                game.playerDrop();
                game.time++;
            }

        })


        WebFont.load({
            google: {families: ['Press Start 2P']},
          active: game.drawScore()
    });
    canvas.scrollIntoView(true)
    }


    function startGalaga(){
        let canvasContainer = document.getElementById('canvas-container');
        let galagaCanvas = document.createElement('canvas');
        let container = document.getElementById('homebutton-container');

        

        container.removeChild(container.lastChild);
        homeBtn.style.visibility='visible';
        

        while(canvasContainer.hasChildNodes()){
            canvasContainer.removeChild(canvasContainer.firstChild)
        }

        galagaCanvas.id='canvas';
        galagaCanvas.height=600;
        galagaCanvas.width=600;
        galagaCanvas.style.marginLeft='10%';
        canvasContainer.appendChild(galagaCanvas);

        let canvas = document.getElementById('canvas');
        canvas.style.marginRight='10%';

        let buttonsContainer = document.getElementById('container');

        while (buttonsContainer.hasChildNodes()){
            buttonsContainer.removeChild(buttonsContainer.firstChild);
        }


        //Initialize game
        var game1 = new GalagaGame(canvas, 5);
        game1.renderStartScreen();
        canvas.scrollIntoView(true)


        window.addEventListener('keydown', (event)=>{
            event.preventDefault();
            let code = event.code;
            switch(code){
                case "ArrowLeft":
                    game1.player.moveLeft();
                    break;
                case "ArrowRight":
                    game1.player.moveRight();
                    break;
                case "ArrowUp":
                    game1.player.moveUp();
                    break;
                case "ArrowDown":
                    game1.player.moveDown();
                    break;
                case "Space":
                    game1.createShot();
                    break;
                default:
                    break;
            }
        })

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

        button1.id='tetris';
        button2.id='galaga';

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
            startGalaga();
            highscoreContainer.style.visibility='visible';
        })



    }
    }
