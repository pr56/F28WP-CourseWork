var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var gameStarted = false; /* Game hasn't started yet*/
var keys = [];
var resistance = 0.8;
var weight = 0.98;

var player1 = {
    x: 5,
    y: canvas.height -20, /* positioned at bottom of screen */
    width: 20,
    height: 20,
    speed: 5,
    velX: 0,
    velY: 0, 
    color: "ff0000",
    jumping: false,
    grounded: false,
    jumpStrength: 7,
    draw: function(){
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}

intro();

function intro(){   
   context.font = "30px Impact";
   context.fillStyle = "#456d59";
   context.textAlign = "center";
   context.fillText("Press Enter to Start", canvas.width/2, canvas.height/2);
}

function start_Game(){
    gameStarted = true;
    clearCanvas();

    setInterval(function(){
        clearCanvas();
        loop();
    }, 1000/30)  /* 30 frames per second */
}

function draw_platforms(){
    context.fillStyle = "#4A0336";

    for(var i = 0; i < platforms.length; i++){ /* fill color in all platforms */
        context.fillRect(platforms[i].x, platforms[i].y, platforms[i].width, platforms[i].height);
    }
}

function loop(){
    draw_platforms();
    player1.draw();

     /* Up or space Key */
    if(keys[38] || keys[32]){
        if(!player1.jumping){
            player1.velY = -player1.jumpStrength*2;
            player1.jumping = true;
        }
    }
    /*right arrow */
    if(keys[39]){
        if(player1.velX < player1.speed){ /* cant increase velocity if reached max speed */
            player1.velX++;
        }
    }
    /* left arrow */
    if(keys[37]){
        if(player1.velX > -player1.speed){ /* cant increase velocity if reached max speed */
            player1.velX--;
        }
    }
        player1.x += player1.velX;
        player1.y += player1.velY;
         
        player1.velX *= resistance;  /*character can slow down */
        player1.velY += weight;   /*control character jump height*/

        
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
    }

    
 /**Collision Detection  - platforms & chararacter */
   function collisionCheck(character, platform){

	var vectorX = (character.x + (character.width/2)) - (platform.x + (platform.width/2));
	var vectorY = (character.y + (character.height/2)) - (platform.y + (platform.height/2));

	var halfWidths = (character.width/2) + (platform.width/2);
	var halfHeights = (character.height/2) + (platform.height/2);

	var collisionDirection = null;

	if(Math.abs(vectorX) < halfWidths && Math.abs(vectorY) < halfHeights){


        /* Where the collision is happening */
		var offsetX = halfWidths - Math.abs(vectorX);
		var offsetY = halfHeights - Math.abs(vectorY);
		if(offsetX < offsetY){

			if (vectorX > 0){
				collisionDirection = "left";
				character.x += offsetX;
			} else {
				collisionDirection = "right";
				character.x -= offsetX;
			}

		} else {

			if (vectorY > 0){
				collisionDirection = "top";
				character.y += offsetY;
			} else {
				collisionDirection = "bottom";
				character.y -= offsetY;
			}
		}
	}
	return collisionDirection;
}


var platforms = [];
var platform_width = 120;
var platform_height = 10;

platforms.push({    /* push on to platform array */
   x: canvas.width-170,
   y: 40,
   width: platform_width,
   height: platform_height,
});

platforms.push({
    x: canvas.width-170,
    y: canvas.height-50,
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
    y: canvas.height-240,
    width: platform_width,
    height: platform_height,
 });

 /* ground platform */
 platforms.push({
     x:0,
     y: canvas.height-5,
     width: canvas.width,
     height: platform_height
 });

document.body.addEventListener("keydown", function(event){

      if(event.keyCode == 13 && !gameStarted){  /* The Game will start when enter is pressed*/
            start_Game();
      }
      keys[event.keyCode] = true;
});

document.body.addEventListener("keyup", function(event){
    keys[event.keyCode] = false;
});

function clearCanvas(){
    context.clearRect(0,0,840,460);  /* clear canvas when game starts and game loops */
}
