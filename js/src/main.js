window.onload = () =>{
    document.getElementById('hard').onclick = () => {
        startTetris(20);
        clicked++
    }

    document.getElementById('medium').onclick = () => {
        startTetris(40)
        clicked++
    }

    document.getElementById('easy').onclick = () => {
        startTetris(60);
        clicked++
    }

    let clicked = 1;

    function startTetris(interval){
        let element=document.getElementById('canvas-container');
        let canvas = document.createElement('canvas');
        let tetrisInstructions = document.createElement('img')
        tetrisInstructions.src='/./img/commands.png';

        canvas.id='canvas';
        canvas.height= 540;
        canvas.width=240;
        element.appendChild(canvas);
        element.appendChild(tetrisInstructions);
        let canvasTetris = document.getElementById('canvas')


        //Removing the buttons that user pressed to choose game
        let buttonsContainer = document.getElementById('container')

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
            
            game.start(interval);
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
}