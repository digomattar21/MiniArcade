window.onload = () => {
  document.getElementById("tetris").onclick = () => {
    startTetris(20);

    document.getElementById("homeButton").addEventListener("click", () => {
      renderHomeScreen();
    });
  };

  document.getElementById("galaga").onclick = () => {
    startGalaga();
  };

  function getScreenSize() {
    let win = window;
    let doc = document;
    let docElem = doc.documentElement;
    let body = doc.getElementsByTagName("body")[0];
    let x = win.innerWidth || docElem.clientWidth || body.clientWidth;
    let y = win.innerHeight || docElem.clientHeight || body.clientHeight;
    return [x, y];
  }

  var homeBtn = document.getElementById("homeButton");
  let canvasContainer = document.getElementById("canvas-container");

  function startTetris(interval) {
    let element = document.getElementById("canvas-container");
    let canvas = document.createElement("canvas");
    var highscoreContainer = document.getElementById("highscores-container");
    var submitBtn = document.getElementsByClassName("submitBtn")[0];

    highscoreContainer.style.visibility = "visible";
    submitBtn.style.visibility = "visible";

    homeBtn.style.visibility = "visible";

    canvas.id = "canvasTetris";
    canvas.height = 540;
    canvas.width = 240;
    element.appendChild(canvas);

    let canvasTetris = document.getElementById("canvasTetris");

    let buttonsContainer = document.getElementById("container");

    while (buttonsContainer.hasChildNodes()) {
      buttonsContainer.removeChild(buttonsContainer.firstChild);
    }

    if (interval === 20) {
      var game = new Game(canvasTetris);
    }
    game.start(interval);

    WebFont.load({
      google: { families: ["Press Start 2P"] },
      active: game.scoreAnimation(),
    });

    window.addEventListener("keydown", (event) => {
      let key = event.key;
      if (!game.isOver) {
        event.preventDefault();
      }
      switch (key) {
        case "ArrowLeft":
          game.time++;
          game.move(-1);
          break;
        case "ArrowRight":
          game.time++;
          game.move(1);
          break;
        case "ArrowDown":
          game.playerDrop();
          game.time++;
          break;
        case "ArrowUp":
          game.time++;
          game.rotatePlayer(1);
          break;
      }
    });

    canvasTetris.addEventListener("touchstart", function (e) {
      let touch = e.touches;
      let x = touch[0].clientX;
      let y = touch[0].clientY;

      if (x > 240) {
        game.move(1);
        game.time++;
      } else if (x < 150) {
        game.move(-1);
        game.time++;
      }

      if (y < 520 && x > 145 && x < 245) {
        game.rotatePlayer(1);
        game.time++;
      }

      if (y > 600 && x > 145 && x < 245) {
        game.playerDrop();
        game.time++;
      }
    });

    WebFont.load({
      google: { families: ["Press Start 2P"] },
      active: game.drawScore(),
    });
    canvas.scrollIntoView(true);
  }

  function startGalaga() {
    let canvasContainer = document.getElementById("canvas-container");
    let galagaCanvas = document.createElement("canvas");
    let homeBtn = document.getElementById("homeButton");

    homeBtn.style.visibility = "visible";

    while (canvasContainer.hasChildNodes()) {
      canvasContainer.removeChild(canvasContainer.firstChild);
    }

    if (getScreenSize()[0] < 400) {
      galagaCanvas.id = "canvas";
      galagaCanvas.height = 500;
      galagaCanvas.width = 350;
      galagaCanvas.style.marginLeft = "10%";
      canvasContainer.appendChild(galagaCanvas);
    } else {
      galagaCanvas.id = "canvas";
      galagaCanvas.height = 600;
      galagaCanvas.width = 600;
      galagaCanvas.style.marginLeft = "10%";
      canvasContainer.appendChild(galagaCanvas);
    }

    let canvas = document.getElementById("canvas");
    canvas.style.marginRight = "10%";

    let buttonsContainer = document.getElementById("container");

    while (buttonsContainer.hasChildNodes()) {
      buttonsContainer.removeChild(buttonsContainer.firstChild);
    }

    let game1 = new GalagaGame(canvas, 5);

    if (getScreenSize()[0] < 400) {
      game1.mobileDevice = true;
    }
    game1.renderStartScreen();
    canvas.scrollIntoView(true);

    homeBtn.onclick = () => {
      game1.isOver = true;
      game1.playThemeSound(false);
      renderHomeScreen();
    };

    window.addEventListener("keydown", (event) => {
      event.preventDefault();
      let code = event.code;
      switch (code) {
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
    });
    canvas.addEventListener("mousemove", (event) => {
      let x = event.offsetX;
      let y = event.offsetY;
      game1.player.move(x, y);
    });

    canvas.addEventListener("touchmove", (event) => {
      event.preventDefault();
      let x = event.touches[0].clientX;
      let y = event.touches[0].clientY - 200;
      game1.player.move(x - 50, y);
      game1.createShot();
    });
  }

  function renderHomeScreen() {
    var btnDiv = document.getElementById("btn");
    var homeBtn = document.getElementById("homeButton");

    if (highscoreContainer) {
      var highscoreContainer = document
        .getElementById("highscores-container")
        .cloneNode(true);
    } else {
      var highscoreContainer = document.createElement("div");
      highscoreContainer.innerHTML = `<div id = 'highscores-container' >
          <img id='highscores-img' src="img/highscores.png" alt="highscores">
          <div id ='error'></div>
          <ol id ='highscores'></ol>
          <input type="hidden" id='lowscore'>
          <form id='myform'>
              Your Name: <br>
              <input type="text" name='player_name' class='greenBtn' id='player_name' placeholder="Type your name" required></input>
              <br>Your Score: <br>
              <input type="text" name ='player_score' class='greenBtn' type= 'number' value =0 id='score' readonly></input><br>
              <button type='submit' class='submitBtn'>Submit</button>
          </form>
      </div>`;
    }

    while (btnDiv.hasChildNodes()) {
      btnDiv.removeChild(btnDiv.firstChild);
    }

    while (canvasContainer.hasChildNodes()) {
      canvasContainer.removeChild(canvasContainer.firstChild);
    }

    var buttons = document.createElement("div");
    var container = document.createElement("div");
    container.id = "container";
    buttons.id = "buttons";
    btnDiv.appendChild(buttons);
    buttons.appendChild(container);

    var button1 = document.createElement("button");
    var button2 = document.createElement("button");

    button1.id = "tetris";
    button2.id = "galaga";

    container.appendChild(button1);
    container.appendChild(button2);

    var img = document.getElementById("title");
    img.scrollIntoView(true);

    homeBtn.style.visibility = "hidden";

    button1.onclick = () => {
      canvasContainer.appendChild(highscoreContainer);
      startTetris(20);
      var submitBtn = document.getElementsByClassName("submitBtn")[0];
      submitBtn.style.visibility = "visible";
    };

    button2.addEventListener("click", () => {
      startGalaga();
    });
  }
};
