const scale = 3;  // size of each animation frame in the canvas
const w = 16;   // source width of each animation frame
const h = 18;   // source height of each animation frame
const scaled_w =scale * w;  // destination width of each animation frame
const scaled_h = scale * h;  // destination height of each animation frame
const cycle_loop = [0, 1, 0, 2];  // array used for animating the character
const l = 2;  // character will move left
const r = 3;  // character will move right
const frame_limit = 12;  // maximum number of frames per second
const speed = 1;  // speed of character's movement(number of pixels moved per animation frame)

let canvas = document.querySelector('canvas');
let context = canvas.getContext('2d');
let key_presses = {};  //object where all key presses are stored
let cur_direction = r; // current direction in which character is moving
let cur_loopIndex = 0; // current index of cycle_loop
let frame_count = 0; // number of frames per second
let x_pos = 0; // x position of character in the game
let y_pos = 0; // y position of character in the game
let image = new Image(); // sprite sheet containing the animation frames

function load_image() // to load the animation frames before animation is performed
 {
  image.src = 'https://opengameart.org/sites/default/files/Green-Cap-Character-16x18.png';
  image.onload = function() 
  {
    window.requestAnimationFrame(game);  //calls game function to update an animation before next repaint
  };
}

function draw_Frame(frame_x, frame_y, canvas_x, canvas_y)  //function for drawing the animation frames
 {
  context.drawImage(image,frame_x * w, frame_y * h, w, h,canvas_x, canvas_y, scaled_w, scaled_h);
}

function movement(dx, dy, direction)  //function which updates the x-position,y-position and current direction of the character after every movement
 {
  if (x_pos + dx > 0 && x_pos + scaled_w + dx < canvas.width) 
  //x_pos + dx > 0 checks for left edge collision
  //x_pos + scaled_w + dx < canvas.width checks for right edge collision
  {
    x_pos += dx;
  }
  cur_direction = direction;
}

window.addEventListener('keydown', keyDownListener);
function keyDownListener(event) 
{
    key_presses[event.key] = true;  // when key is pressed down,character moves
}

window.addEventListener('keyup', keyUpListener);
function keyUpListener(event) 
{
    key_presses[event.key] = false;  // when key is released,character stops moving
}

load_image();

function game() //function for performing animation
 {
  context.clearRect(0, 0, canvas.width, canvas.height);

  let moved = false;

  if (key_presses.a) //character moves left when "A" key is pressed 
  {
    movement(-speed, 0, l);
    moved = true;
  }
   else if (key_presses.d) //character moves right when "D" key is pressed 
   {
    movement(speed, 0, r);
    moved = true;
  }

  if (moved) 
  {
    frame_count++;
    if (frame_count >= frame_limit) 
    {
      frame_count = 0;
      cur_loopIndex++;
      if (cur_loopIndex >= cycle_loop.length) 
      {
        cur_loopIndex = 0;
      }
    }
  }

  if (!moved)
   {
    cur_loopIndex = 0;
  }

  draw_Frame(cycle_loop[cur_loopIndex], cur_direction, x_pos, y_pos);
  window.requestAnimationFrame(game);
}

