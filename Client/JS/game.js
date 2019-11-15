var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var gameStarted = false;   // Game hasn't started yet
var keys = [];
var resistance = 0.8;
var weight = 0.98;
const SPRITE_SIZE = 16;
var coinCount_player1 = 0;
var coinCount_player2 = 0;
var gameOver = false;

var image = new Image();
image.src = "Client/sprites/alienPink.png";
var image2 = new Image();
image2.src = "Client/sprites/alienGreen.png";

var coin_sound=document.getElementById('coin_sound_effect');
var jump_sound=document.getElementById('jump_sound_effect');
var collision_sound=document.getElementById('collision_sound_effect');

intro();

function intro(){
   context.font = "30px Impact";
   context.fillStyle = "#FFFFFF";
   context.textAlign = "center";
   context.fillText("Press Enter to Start", canvas.width/2, canvas.height/2);
   context.fillText("Instructions", 250, 350);
   context.fillText("Settings", 600, 350);
}

function start_Game(){
    gameStarted = true;
    clearCanvas();

    setInterval(function(){
        clearCanvas();
        loop();
    }, 1000/30)  // 30 frames per second
}

function end_game()
{
      // Display game over message when timer is over
    gameOver= true;
    clearCanvas();

        context.font = "30px Impact";
        context.fillStyle = "#FFFFFF";
        context.textAlign = "center";
        if (coinCount_player1 > coinCount_player2)
        {
            context.fillText("TIME IS UP! Player 1 has won. Thanks for playing~", canvas.width/2, canvas.height/2);
        }
        else if (coinCount_player2 > coinCount_player1)
        {
            context.fillText("TIME IS UP!Player 2 has won. Thanks for playing~", canvas.width/2, canvas.height/2);
        }
        else
        {
        context.fillText("TIME IS UP! Both of you are in a tie. Thanks for playing~", canvas.width/2, canvas.height/2);
        }
 
}

//Player 1
var player1 = {
    x: 10,
    y: canvas.height -52,   // Positioned at bottom of screen
    width: 35,
    height: 47,
    speed: 5,
    velX: 0,
    velY: 0,
    color: "blue",
    jumping: false,
    grounded: false,
    jumpStrength: 7,
    draw: function(){
        context.drawImage(image, 0, 0, 35, 47, this.x, this.y, 35, 47)
    }
}

/* Player 2 */
var player2 = {
    x: 100,
    y: canvas.height -52,   // Positioned at bottom of screen
    width: 35,
    height: 47,
    speed: 5,
    velX: 0,
    velY: 0,
    color: "red",
    jumping: false,
    grounded: false,
    jumpStrength: 7,
    draw: function(){
        context.drawImage(image2, 0, 0, 35, 48, this.x, this.y, 35, 48)
    }
}





  //we are calculating for collision
function getDistance(px,py,cx,cy)
{
    let xDistance = cx-px;
    let yDistance = cy-py;

    return Math.sqrt(Math.pow(xDistance,2) + Math.pow(yDistance,2));
}

function getDistance(p2x,p2y,cx,cy)
{
    let xDistance = cx-p2x;
    let yDistance = cy-p2y;

    return Math.sqrt(Math.pow(xDistance,2) + Math.pow(yDistance,2));
}

function distance(p1x,p1y,p2x,p2y)
{
    let xDist = p2x-p1x;
    let yDist = p2y-p1y;

    return Math.sqrt(Math.pow(xDist,2) + Math.pow(yDist,2));
}


//coin
var show_coin = false;
var coin_image = new Image();
coin_image.onload = function ()
{
  // show the coin image
  show_coin = true;
};

coin_image.src = "Client/images/coin.png";
var coin = {};

//clock
var show_clock = false;
var time_img = new Image(); 
time_img.onload = function()
{
    show_clock = true;
} // Draw when image has loaded
time_img.src = 'Client/images/time.gif';

// Place the coin somewhere on the canvas randomly
var reset = function ()
{
    coin.x = 32 + (Math.random() * (canvas.width - 64));
    coin.y = 32 + (Math.random() * (canvas.height - 64));
};
var collisionCoin = function()
{

    if(getDistance(player1.x,player1.y,coin.x,coin.y)<player1.width)
    {
        var coin_flag_1=true;
        reset();
        //coin is colliding
        coinCount_player1++;
        if(coin_flag_1)
        {
            coin_sound.pause();
            coin_sound.currentTime=0;
            coin_sound.play();
            coin_flag_1=false;
        }
    }

    if(getDistance(player2.x,player2.y,coin.x,coin.y)<player2.width)
    {
        var coin_flag_2=true;
        reset();
        //coin is colliding
        coinCount_player2++;
        if(coin_flag_2)
        {
            coin_sound.pause();
            coin_sound.currentTime=0;
            coin_sound.play();
            coin_flag_2=false;
        }
    }
//coin is colliding

};

var collisionCharacter = function()
{
    var tp1X = player1.velX;
    var tp2X = player2.velX
    if((distance(player1.x,player1.y,player2.x,player2.y) < player1.width+1))
    {
        iscollision = true;
            
	var collision_flag=true;
        if(collision_flag)
        {
            collision_sound.pause();
            collision_sound.currentTime=0;
            collision_sound.play();
            collision_flag=false;
        }

        if ((player1.velX > player2.velX))
        {
            player1.velX = player1.velX - 5;
            player2.velX = player2.velX + 5;
        } else {
            player1.velX = player1.velX + 5;
            player2.velX = player2.velX - 5;
        }

        if ((player1.velY > player2.velY))
        {
            player1.velY = player1.velY - 5;
            player2.velY = player2.velY + 5;
        } else if((player1.velY < player2.velY))
        {
            player1.velY = player1.velY + 5;
            player2.velX = player2.velX - 5;
        }
    }
    else
    {
        iscollision = false;
        player1.speed = 6;
        player2.speed = 6;
       
    }
    
};

function draw_platforms()
{
    context.fillStyle = "#4A0336";

    for(var i = 0; i < platforms.length; i++){  //Fill color in all platforms
        context.fillRect(platforms[i].x, platforms[i].y, platforms[i].width, platforms[i].height);
    }
}


var render = function()
{
    if (show_coin)
    {
        context.drawImage(coin_image, coin.x, coin.y);
    }

    if(show_clock)
    {
         context.drawImage(time_img, 340, 5);

    }

    context.fillStyle = "white"; //changes font color
    context.font = "24px Courier New";//changes font style
    context.textAlign = "left";//changes direction
    context.textBaseline = "top";//changes text placement
    context.fillText(":"+ time, 390, 20);//changes exact placement of the area
    context.fillText("P1: " + coinCount_player1 ,30, 20);
    context.fillText("P2: " + coinCount_player2 ,730, 20);


//   // Display game over message when timer is over
   if(gameOver==true)
   {
       end_game();       //     context.font = "30px Impact";
//      context.textAlign = "center";
//     context.fillText("The game has ended", canvas.width/2, canvas.height/2);
   }
 };

//time
var timeReady = false;
var time = 120;

var timer = function()
{
    timeReady = true;
    time = time-1;

    if(time <= 0)
    {
        clearInterval(timer);
        gameOver = true;
        time = 0;

    }
}



function loop(){
    draw_platforms();
    player1.draw();
    distance(player1.x,player1.y,player2.x,player2.y);
    collisionCharacter();

    render();
     /*getDistance(player1.x,player1.y,coin.x,coin.y);*/
    collisionCoin();

    /* PLAYER 1 */

     /* Up Key */
    if(keys[38]){
        if(!player1.jumping){
            var jump_flag_1=true;
            player1.velY = -player1.jumpStrength*2;
            player1.jumping = true;
            if(jump_flag_1)
            {
            jump_sound.pause();
            jump_sound.currentTime=0;
            jump_sound.play();
            jump_flag_1=false;
            }
        }
    }
    /* Right Key */
    if(keys[39]){
        if(player1.velX < player1.speed){  //Cant increase velocity if reached max speed
            player1.velX++;
        }
    }
    /* Left Key */
    if(keys[37]){
        if(player1.velX > -player1.speed){ //Cant increase velocity if reached max speed
            player1.velX--;
        }
    }

    player1.x += player1.velX;
    player1.y += player1.velY;


    player1.velX *= resistance;           // character can slow down
    player1.velY += weight;               // control character jump height


    player1.grounded = false;
    for(var i = 0; i < platforms.length; i++){
        var direction = collisionCheck(player1,platforms[i]);

        if (direction == "left" || direction == "right"){
            player1.velX = 0;
        } else if (direction == "bottom"){
            player1.jumping = false;
            player1.grounded = true;
        } else if (direction == "top"){
            player1.velY *= -1;
        }
    }
    if(player1.grounded){
        player1.velY = 0;
    }

    /* PLAYER 2 */

    player2.draw();

    /* Up Key */
    if(keys[87]){                        //Press 'w' to jump
        if(!player2.jumping){
            var jump_flag_2=true;
            player2.velY = -player2.jumpStrength*2;
            player2.jumping = true;
            if(jump_flag_2)
            {
            jump_sound.pause();
            jump_sound.currentTime=0;
            jump_sound.play();
            jump_flag_2=false;
            }
        }
    }
    /* Right Key */
    if(keys[68]){                        //Press 'd' move right
    if(player2.velX < player2.speed){    //Cant increase velocity if reached max speed
        player2.velX++;
        }

                    /* PLAYER 2 */
    }
    /* Left Key */
    if(keys[65]){                        //Press 'a' to move left
    if(player2.velX > -player2.speed){   //Cant increase velocity if reached max speed
        player2.velX--;
        }
    }

    player2.x += player2.velX;
    player2.y += player2.velY;

    player2.velX *= resistance;          //Character can slow down
    player2.velY += weight;              //Control character jump height

    player2.grounded = false;
    for(var i = 0; i < platforms.length; i++){
        var direction = collisionCheck(player2,platforms[i]);

       if (direction == "left" || direction == "right"){
            player2.velX = 0;
        } else if (direction == "bottom"){
            player2.jumping = false;
            player2.grounded = true;
        } else if (direction == "top"){
            player2.velY *= -1;
            }
        }
    if(player2.grounded){
        player2.velY = 0;
        }
    }



/* Collision Detection  - platforms & chararacter */

/* PLAYER 1 */

function collisionCheck(player1, platform){

	var vectorX = (player1.x + (player1.width/2)) - (platform.x + (platform.width/2));
	var vectorY = (player1.y + (player1.height/2)) - (platform.y + (platform.height/2));

	var halfWidths = (player1.width/2) + (platform.width/2);
	var halfHeights = (player1.height/2) + (platform.height/2);

	var collisionDirection = null;

	if(Math.abs(vectorX) < halfWidths && Math.abs(vectorY) < halfHeights){


        /* Where the collision is happening */
		var offsetX = halfWidths - Math.abs(vectorX);
		var offsetY = halfHeights - Math.abs(vectorY);
		if(offsetX < offsetY){

			if (vectorX > 0){
				collisionDirection = "left";
				player1.x += offsetX;
			} else {
				collisionDirection = "right";
				player1.x -= offsetX;
			}

		} else {

			if (vectorY > 0){
				collisionDirection = "top";
				player1.y += offsetY;
			} else {
				collisionDirection = "bottom";
				player1.y -= offsetY;
			}
		}
    }
    return collisionDirection;
}

 /* PLAYER 2 */

    function collisionCheck(player2, platform){
    var vectorX2 = (player2.x + (player2.width/2)) - (platform.x + (platform.width/2));
    var vectorY2 = (player2.y + (player2.height/2)) - (platform.y + (platform.height/2));

    var halfWidths2 = (player2.width/2) + (platform.width/2);
    var halfHeights2 = (player2.height/2) + (platform.height/2);

    var collisionDirection2 = null;

    if(Math.abs(vectorX2) < halfWidths2 && Math.abs(vectorY2) < halfHeights2){


        /**  Where the collision is happening */
        var offsetX2 = halfWidths2 - Math.abs(vectorX2);
        var offsetY2 = halfHeights2 - Math.abs(vectorY2);
        if(offsetX2 < offsetY2){

            if (vectorX2 > 0){
                collisionDirection2 = "left";
                player2.x += offsetX2;
                } else {
                    collisionDirection2 = "right";
                    player2.x -= offsetX2;
                }

        } else {

            if (vectorY2 > 0){
                collisionDirection2 = "top";
                player2.y += offsetY2;
           } else {
                collisionDirection2 = "bottom";
                player2.y -= offsetY2;
            }
        }
    }
        return collisionDirection2;
  }


var platforms = [];
var platform_width = 120;
var platform_height = 10;

platforms.push({    //Push on to platform array
   x: canvas.width-170,
   y: 80,
   width: platform_width,
   height: platform_height,
});

  platforms.push({
    x: canvas.width-170,
    y: canvas.height-90,
    width: platform_width,
    height: platform_height,
 });

 platforms.push({
    x: canvas.width-380,
    y: canvas.height-120,
    width: platform_width,
    height: platform_height,
 });

 platforms.push({
    x: canvas.width-380,
    y: canvas.height-240,
    width: platform_width,
    height: platform_height,
 });

 platforms.push({
    x: canvas.width-590,
    y: canvas.height-180,
    width: platform_width,
    height: platform_height,
 });

 platforms.push({
    x: canvas.width-760,
    y: canvas.height-230,
    width: platform_width,
    height: platform_height,
 });


 platforms.push({
    x: canvas.width-600,
    y: canvas.height-320,
    width: platform_width,
    height: platform_height,
 });

platforms.push({
    x: canvas.width-700,
    y: canvas.height-400,
    width: platform_width,
    height: platform_height,
 });

 platforms.push({
    x: canvas.width-200,
    y: canvas.height-290,
    width: platform_width,
    height: platform_height,
 });

 platforms.push({
    x: canvas.width-750,
    y: canvas.height-95,
    width: platform_width,
    height: platform_height,
 });

 /* floor platform */
 platforms.push({
     x:0,
     y: canvas.height-5,
     width: canvas.width,
     height: platform_height
 });

 //left Wall
 platforms.push({
    x:-10,
    y:0,
    width: 10,
    height: canvas.height
});

//Right Wall
platforms.push({
    x:canvas.width,
    y:0,
    width: 10,
    height: canvas.height
});

//Ceiling
platforms.push({
    x:0,
    y:-10,
    width:canvas.width,
    height:platform_height
});



document.body.addEventListener("keydown", function(event){

      if(event.keyCode == 13 && !gameStarted){  //The Game will start when enter is pressed
            start_Game();
            timeReady = true;
            setInterval(timer,1000);
      }
      keys[event.keyCode] = true;
});

document.body.addEventListener("keydown", function(event){  //Instructions will prompt
    if(event.keyCode == 73)
    alert(" \t\t\t\t\t Instructions \n\n This game is all about the chase to collect the maxium number of coins. \n \t\t Player 1 \t\t\t\t\t Player 2 \n Use up arrow to jump \t\t\t Use 'W' key to jump \n Use right arrow to move right \t\t Use 'W' key to move right \n Use left arrow to move left \t\t Use 'A' key to move left ");
})
 
document.body.addEventListener("keydown", function(event){ //Setting tools will prompt
    if(event.keyCode == 83)
    alert("\t\t\t\t\t\t Settings \n\n Sound");
})

document.body.addEventListener("keyup", function(event){
    keys[event.keyCode] = false;
});


function clearCanvas(){
    context.clearRect(0,0,840,460);          //Clear canvas when game starts and game loops
}

reset();
