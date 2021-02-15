const board_border = 'black';
const board_background = 'OliveDrab';
const snake_border = 'darkblue';
const over = 'GAME OVER';
let snake_col = 'black';

    
let snake = [
      {x: 250, y: 250},
      {x: 250, y: 240},
      {x: 250, y: 230},
      {x: 250, y: 220},
      {x: 250, y: 210}
]
    
// Gamescore
let score = 0;
// True if changing direction
let changing_direction = false;  
// Horizontal velocity
let dx = 0;
// Vertical velocity
let dy = 10;
// Difficulty multiple
let mult = 1;
    
// Get the canvas element
const snakeboard = document.getElementById("board");
// Return a two dimensional drawing context
const snakeboard_ctx = snakeboard.getContext("2d");
    
document.addEventListener("keydown", change_direction);
      
// main function called repeatedly to keep the game running
function main() {
      
    if (has_game_ended()) {
        context.font = '25px Arial';
        context.fillStyle = '0,0,0';
        snakeboard_ctx.fillText(over, 100, 100);                         
        return;
    }

    changing_direction = false;
    setTimeout(function onTick() {
    clear_board();
    move_snake();
    drawSnake();
    // Call main again
    main();
    }, 100)
}
    
// draw a border around the canvas
function clear_board() {
    //  Select the colour to fill the drawing
    snakeboard_ctx.fillStyle = board_background;
    //  Select the colour for the border of the canvas
    snakeboard_ctx.strokestyle = board_border;
    // Draw a "filled" rectangle to cover the entire canvas
    snakeboard_ctx.fillRect(0, 0, snakeboard.width, snakeboard.height);
    // Draw a "border" around the entire canvas
    snakeboard_ctx.strokeRect(0, 0, snakeboard.width, snakeboard.height);
}
      
// Draw the snake on the canvas
function drawSnake() {
      // Draw each part
      snake.forEach(drawSnakePart)
}
    
// Draw one snake part
function drawSnakePart(snakePart) {

      // Set the colour of the snake part
      snakeboard_ctx.fillStyle = snake_col;
      // Set the border colour of the snake part
      snakeboard_ctx.strokestyle = snake_border;
      // Draw a "filled" rectangle to represent the snake part at the coordinates
      // the part is located
      snakeboard_ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
      // Draw a border around the snake part
      snakeboard_ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
    }
      
function has_game_ended() {
      for (let i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true
      }
      const hitLeftWall = snake[0].x < 0;
      const hitRightWall = snake[0].x > snakeboard.width - 10;
      const hitToptWall = snake[0].y < 0;
      const hitBottomWall = snake[0].y > snakeboard.height - 10;
      return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall
}

function change_direction(event) {
      const LEFT_KEY = 37;
      const RIGHT_KEY = 39;
      const UP_KEY = 38;
      const DOWN_KEY = 40;
      
    // Prevent the snake from reversing
    
      if (changing_direction) return;
      changing_direction = true;
      const keyPressed = event.keyCode;
      const goingUp = dy === -10 * mult;
      const goingDown = dy === 10 * mult;
      const goingRight = dx === 10 * mult;
      const goingLeft = dx === -10 * mult;
      if (keyPressed === LEFT_KEY && !goingRight) {
        dx = -10 * mult;
        dy = 0;
      }
      if (keyPressed === UP_KEY && !goingDown) {
        dx = 0;
        dy = -10 * mult;
      }
      if (keyPressed === RIGHT_KEY && !goingLeft) {
        dx = 10 * mult;
        dy = 0;
      }
      if (keyPressed === DOWN_KEY && !goingUp) {
        dx = 0;
        dy = 10 * mult;
      }
}
      
function move_snake() {
      // Create the new Snake's head
      const head = {x: snake[0].x + dx, y: snake[0].y + dy};
      // Add the new head to the beginning of snake body
      snake.unshift(head);
      snake.pop();
}

function createButtons(){
    const buts = document.querySelector('#btn_ctn');
    const randomColour = document.createElement('button');
    randomColour.textContent = "random colour";
    randomColour.setAttribute('class', 'randomColour');
    buts.appendChild(randomColour);

    const blackColour = document.createElement('button');
    blackColour.textContent = "black";
    blackColour.setAttribute('class', 'black');
    buts.appendChild(blackColour);

    const changeColour = document.createElement('button');
    changeColour.textContent = "change";
    changeColour.setAttribute('class', 'change');
    buts.appendChild(changeColour);
}

createButtons();


function random(){
    const ran = document.querySelector('.randomColour');
    ran.addEventListener('mousedown', function () {
        let dic =['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];
        let i = 0;
        let hex = '';
        while(i < 6){
            let r = Math.floor((Math.random() * 16) + 1);
            hex = hex + dic[r-1];
            i++;
        }
        snake_col = '#' + hex;
    })
}

random();

function black(){
    const ran = document.querySelector('.black');
    ran.addEventListener('mousedown', function () {
        snake_col = 'black';
        const r = document.querySelector('.randomColour');
        r.style.backgroundColor = 'transparent';

    });
}

black();

function change(){
    const ran = document.querySelector('.change');
    ran.addEventListener('mousedown', function () {
        snake_col = prompt("Enter a colour or hex code", "red of #aw12034");
    });
}

change();
