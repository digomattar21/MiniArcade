window.onload = () =>{
    document.getElementById('hard').onclick = () => {
        startTetris(20);
        homeBtn.style.visibility='visible';
        restartBtn.style.visibility='visible'
        highscoreContainer.style.visibility= 'visible'
        clicked++
        document.getElementById('homeButton').addEventListener('click', ()=>{
            renderHomeScreen(btnsCopy)
        })
    }

    document.getElementById('medium').onclick = () => {
        startTetris(40)
        clicked++
        homeBtn.style.visibility='visible';
        restartBtn.style.visibility='visible';
        highscoreContainer.style.visibility= 'visible'
        document.getElementById('homeButton').addEventListener('click', ()=>{
            renderHomeScreen(btnsCopy)
        })
    }

    document.getElementById('easy').onclick = () => {
        startTetris(60);
        homeBtn.style.visibility='visible'
        restartBtn.style.visibility='visible';
        highscoreContainer.style.visibility= 'visible'
        clicked++
        document.getElementById('homeButton').addEventListener('click', ()=>{
            renderHomeScreen(btnsCopy)
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

    function renderHomeScreen (btnsCopy) {
        let canvasContainer = document.getElementById('canvas-container')
        var canvas = document.getElementById('canvas')
        var ctx = canvas.getContext('2d');
        var btnDiv = document.getElementsByClassName('btn');
        var buttons = document.getElementById('buttons')
        var homeBtn = document.getElementById('homeButton')
        var container = document.getElementById('container')
        

            //while(btnDiv.hasChildNodes){
                //btnDiv.removeChild(btnDiv.firstChild);
                //while(btnDiv.childNode.hasChildNodes){
                  //  btnDiv.childNode.removeChild(btnDiv.childNode.firstChild)
                //}
            //}
            
            container.remove();
            buttons.remove();
            while (canvasContainer.hasChildNodes){
                canvasContainer.removeChild(canvasContainer.firstChild);
            }
            


            btnDiv.innerHTML=`
            <div>
            <div>
            <button>Tetris Hard</button>
            <button>Tetris Medium</button>
            <button>Tetris Easy</button>
            </div>
            </div>`;

            btnDiv.childNodes[0].id='buttons';
            btnDiv.childNodes.childNodes[0].id='container'
            btnDiv.childNodes[0].childNodes[0].childNodes[0].id ='hard';
            btnDiv.childNodes[0].childNodes[0].childNodes[1].id ='medium';
            btnDiv.childNodes[0].childNodes[0].childNodes[2].id ='easy';


        


    }
    }