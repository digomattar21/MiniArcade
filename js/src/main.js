window.onload = () =>{
    document.getElementById('hard').onclick = () => {
        startTetris(20);
        homeBtn.style.visibility='visible';
        restartBtn.style.visibility='visible';
        highscoreContainer.style.visibility= 'visible';
        clicked++;
        document.getElementById('homeButton').addEventListener('click', ()=>{
            renderHomeScreen()
        })
    }

    document.getElementById('medium').onclick = () => {
        startTetris(40);
        clicked++;
        homeBtn.style.visibility='visible';
        restartBtn.style.visibility='visible';
        highscoreContainer.style.visibility= 'visible';
        document.getElementById('homeButton').addEventListener('click', ()=>{
            renderHomeScreen()
        })
    }

    document.getElementById('bbBtn').onclick = () => {
        //startTetris(60);
        homeBtn.style.visibility='visible';
        restartBtn.style.visibility='visible';

        
        clicked++;
        document.getElementById('homeButton').addEventListener('click', ()=>{
            renderHomeScreen()
        })
    }

    var restartBtn = document.getElementById('restart')
    var homeBtn = document.getElementById('homeButton')
    var btnsCopy = document.getElementById('buttons').cloneNode(true);
    var highscoreContainer = document.getElementById('highscores-container');
    
    let clicked = 1;

    function startTetris(interval){
        let element=document.getElementById('canvas-container');
        let canvas = document.createElement('canvas');
        //let tetrisInstructions = document.createElement('img');
        let commands = document.getElementById('commands')
        commands.style.visibility= 'visible';
        

        canvas.id='canvas';
        canvas.height= 540;
        canvas.width=240;
        element.appendChild(canvas);
        
        let canvasTetris = document.getElementById('canvas');


        //Removing the buttons that user pressed to choose game
        let buttonsContainer = document.getElementById('container');

        while (buttonsContainer.hasChildNodes()){
            buttonsContainer.removeChild(buttonsContainer.firstChild);
        }


        if (clicked==1){
            if (interval===20){
                var game = new Game(canvasTetris, 'hard');
            } else if (interval===40){
                var game = new Game(canvasTetris, 'medium');
            } else if (interval===60){
                var game = new Game(canvasTetris, 'easy');
            }
            
            game.start(interval)
            WebFont.load({
                google: {families: ['Press Start 2P']},
              active: game.scoreAnimation()
        });
        }
        
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

    function renderHomeScreen () {
        let canvasContainer = document.getElementById('canvas-container')
        var canvas = document.getElementById('canvas')
        var ctx = canvas.getContext('2d');
        var btnDiv = document.getElementById('btn');
        var homeBtn = document.getElementById('homeButton');
        
        

        while(btnDiv.hasChildNodes()){
            btnDiv.removeChild(btnDiv.firstChild);
        }
        
            
        
        while (canvasContainer.hasChildNodes()){
            canvasContainer.removeChild(canvasContainer.firstChild);
        }

        var buttons = documen.createElement('div');
        var container = document.createElement('div');
        container.id='container';
        buttons.id='buttons';
        btnDiv.appendChild(buttons);
        buttons.appendChild(container);

        var button1 = documen.createElement('button');
        var button2 = documen.createElement('button');
        var button3 = documen.createElement('button');


        


            





    }
    }