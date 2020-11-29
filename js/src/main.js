window.onload = () =>{
    document.getElementById('hard').onclick = () => {
        startHardGame();
        clicked++
    }

    document.getElementById('medium').onclick = () => {
        startMediumGame();
        clicked++
    }

    document.getElementById('easy').onclick = () => {
        startEasyGame();
        clicked++
    }

    let clicked = 1;

    function startHardGame(){
        let canvas = document.getElementById('canvas');
        if (clicked==1){
            var game = new Game(canvas, 'hard');
            game.start();
        }

        window.addEventListener('keydown', (event)=>{
            let key = event.key;
            switch (key){
                case "ArrowLeft":
                    game.move(-1);
                    break;
                case 'ArrowRight':
                    game.move(1)
                    break;
                case 'ArrowDown':
                    game.playerDrop();
                    game.time=0;
                    break;
                case 'ArrowUp':
                    game.rotatePlayer(1);
                    break;
            }
        })
    }

    function startMediumGame(){
        let canvas = document.getElementById('canvas');
        if (clicked==1){
            var game = new Game(canvas, 'medium');
            game.start();
        }

        window.addEventListener('keydown', (event)=>{
            let key = event.key;
            switch (key){
                case "ArrowLeft":
                    game.move(-1);
                    break;
                case 'ArrowRight':
                    game.move(1)
                    break;
                case 'ArrowDown':
                    game.playerDrop();
                    game.time=0;
                    break;
                case 'ArrowUp':
                    game.rotatePlayer(1);
                    break;
            }
        })
    }


    function startEasyGame(){
        let canvas = document.getElementById('canvas');
        if (clicked==1){
            var game = new Game(canvas, 'easy');
            game.start();
        }

        window.addEventListener('keydown', (event)=>{
            let key = event.key;
            switch (key){
                case "ArrowLeft":
                    game.move(-1);
                    break;
                case 'ArrowRight':
                    game.move(1)
                    break;
                case 'ArrowDown':
                    game.playerDrop();
                    game.time=0;
                    break;
                case 'ArrowUp':
                    game.rotatePlayer(1);
                    break;
            }
        })
    }

    


}