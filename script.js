const board_border = 'black';
const board_background = 'rgb(89, 152, 47)';
const snake_border = 'black';
const snakeboard = document.getElementById("board");
const snakeboard_ctx = snakeboard.getContext("2d");
var snake_col = 'yellow';
const over = 'GAME OVER';
var ticks = 100;

//Initial position of snake
const init = [
  { x: 250, y: 250 },
  { x: 250, y: 240 },
  { x: 250, y: 230 },
  { x: 250, y: 220 },
  { x: 250, y: 210 }
]

//Shallow copy of snake object
let snake = Array.from(init);

// Gamescore
let score = 0;
// True if changing direction
let changing_direction = false;
// Horizontal velocity
let dx = 0;
// Vertical velocity
let dy = 10;
// Difficulty multiplier
let mult = 1;

// Food coordinates
let food_x;
let food_y;

//Used for rainbow and random colours
let dic = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
let rainbow = false;

//Objects in canvas we'll want to disapear/come back
var rand = document.getElementById('random');
var chan = document.getElementById('change');
var bla = document.getElementById('black');
var rain = document.getElementById('rainbow');
var slug = document.getElementById('slug');
var worm = document.getElementById('worm');
var python = document.getElementById('python');
var tit = document.getElementById('title');
var end = document.getElementById('end');



//Start Game
clear_board();
gen_food();
document.addEventListener("keydown", change_direction);

// main function called repeatedly to keep the game running
function main() {
  if (has_game_ended()) {
    restart();
    return;
  }
  hideButtons();
  changing_direction = false;
  setTimeout(function onTick() {
    clear_board();
    drawFood();
    move_snake();
    drawSnake();
    // Call main again
    main();
  }, ticks / mult)
}

function hideButtons() {
  if (rand.style.display == "none") {
    return;
  } else {
    rand.style.display = "none";
    bla.style.display = "none";
    chan.style.display = "none";
    rain.style.display = "none";
    worm.style.display = "none";
    slug.style.display = "none";
    python.style.display = "none";
    tit.style.display = "none";
    end.style.display = "none";
  }
}
//Start Game



//Endgame
function clear_board() {
  snakeboard_ctx.fillStyle = board_background;
  snakeboard_ctx.strokestyle = board_border;
  snakeboard_ctx.fillRect(0, 0, snakeboard.width, snakeboard.height);
  snakeboard_ctx.strokeRect(0, 0, snakeboard.width, snakeboard.height);
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

function restart() {
  backButtons();
  clear_board();
  gen_food();
  snake = Array.from(init);
  dx = 0;
  dy = 10;
  mult = 1;
  score = 0;
  document.getElementById('score').innerHTML = score;
}

function backButtons() {
  rand.style.display = "block";
  bla.style.display = "block";
  chan.style.display = "block";
  rain.style.display = "block";
  worm.style.display = "block";
  slug.style.display = "block";
  python.style.display = "block";
  end.style.display = "block";
}
//Endgame



//Draw snake and Movement
function drawSnake() {
  // Draw each part
  snake.forEach(drawSnakePart)
}

// Draw one snake part
function drawSnakePart(snakePart) {
  // Set the colour of the snake part
  if (rainbow) {
    let hex = '';
    let i = 0;
    while (i < 6) {
      let r = Math.floor((Math.random() * 16) + 1);
      hex = hex + dic[r - 1];
      i++;
    }
    snake_col = '#' + hex;
  }
  snakeboard_ctx.fillStyle = snake_col;
  // Set the border colour of the snake part
  snakeboard_ctx.strokestyle = snake_border;
  // Draw a "filled" rectangle to represent the snake part at the coordinates
  // the part is located
  snakeboard_ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
  // Draw a border around the snake part
  snakeboard_ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
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
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  // Add the new head to the beginning of snake body
  snake.unshift(head);
  var has_eaten_food = snake[0].x === food_x && snake[0].y === food_y;
  //As snake moves 10*mult per tick, head may have gone past food by 10 or 20
  if (mult != 1) {
    if (snake[0].y == food_y) {
      if (dx < 0) {
        if (snake[0].x + 10 == food_x || snake[0].x + 20 == food_x) has_eaten_food = true;
      } else {
        if (snake[0].x - 10 == food_x || snake[0].x - 20 == food_x) has_eaten_food = true;
      }
    } else if (snake[0].x == food_x) {
      if (dy < 0) {
        if (snake[0].y + 10 == food_y || snake[0].y + 20 == food_y) has_eaten_food = true;
      } else {
        if (snake[0].y - 10 == food_y || snake[0].y - 20 == food_y) has_eaten_food = true;
      }
    }
  }
  if (has_eaten_food) {
    // Increase score
    score += 10;
    // Display score on screen
    document.getElementById('score').innerHTML = score;
    // Generate new food location
    gen_food();
  } else {
    // Remove the last part of snake body
    snake.pop();
  }
}
//Draw snake and Movement



//Food
function random_food(min, max) {
  return Math.round((Math.random() * (max - min) + min) / 10) * 10;
}

function gen_food() {
  food_x = random_food(0, snakeboard.width - 10);
  food_y = random_food(0, snakeboard.height - 10);
  snake.forEach(function has_snake_eaten_food(part) {
    const has_eaten = part.x == food_x && part.y == food_y;
    if (has_eaten) gen_food();
  });
}

function drawFood() {
  snakeboard_ctx.fillStyle = 'lightgreen';
  snakeboard_ctx.strokestyle = 'darkgreen';
  snakeboard_ctx.fillRect(food_x, food_y, 10, 10);
  snakeboard_ctx.strokeRect(food_x, food_y, 10, 10);
}
//Food



//Buttons
$("#random").click(function () {
  rainbow = false;
  let hex = '';
  let i = 0;
  while (i < 6) {
    let r = Math.floor((Math.random() * 16) + 1);
    hex = hex + dic[r - 1];
    i++;
  }
  snake_col = '#' + hex;
});


$("#black").click(function () {
  rainbow = false;
  snake_col = 'black';
});

$("#change").click(function () {
  rainbow = false;
  snake_col = prompt("Enter a colour or hex code", "red of #aw12034");
});

$("#rainbow").click(function () {
  rainbow = true;
});
//Buttons