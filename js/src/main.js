window.onload = () =>{
    document.getElementById('hard').onclick = () => {
        var btnsCopy = document.getElementById('buttons').cloneNode(true);
        startTetris(20);
        clicked++
        document.getElementById('homeButton').addEventListener('click', ()=>{
            renderHomeScreen(btnsCopy)
        })
    }

    document.getElementById('medium').onclick = () => {
        var btnsCopy = document.getElementById('buttons').cloneNode(true);
        startTetris(40)
        clicked++
        document.getElementById('homeButton').addEventListener('click', ()=>{
            renderHomeScreen(btnsCopy)
        })
    }

    document.getElementById('easy').onclick = () => {
        var btnsCopy = document.getElementById('buttons').cloneNode(true);
        startTetris(60);
        clicked++
        document.getElementById('homeButton').addEventListener('click', ()=>{
            renderHomeScreen(btnsCopy)
        })
    }



    let clicked = 1;

    function startTetris(interval){
        let element=document.getElementById('canvas-container');
        let canvas = document.createElement('canvas');
        let tetrisInstructions = document.createElement('img');
        tetrisInstructions.src='https://www.canva.com/design/DAEPOP_rM4c/view';

        canvas.id='canvas';
        canvas.height= 540;
        canvas.width=240;
        element.appendChild(canvas);
        element.appendChild(tetrisInstructions);
        
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
            event.preventDefault();
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
            


            btnDiv.innerHTML=`<div id="buttons">
            <div id="container">
            <button id = "hard">Tetris Hard</button>
            <button id = "medium">Tetris Medium</button>
            <button id = "easy">Tetris Easy</button>
            </div>
        </div>`;

        


    }
    }