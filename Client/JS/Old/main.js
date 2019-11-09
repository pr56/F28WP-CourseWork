var canvas = document.getElementById("game").getContext("2d");

var H = canvas.canvas.height, W = canvas.canvas.width;
var level = new ObjectGroup();
level.add(new Platform(canvas, 0, H-5, W, 10, "#4A0336"))
level.add(new Platform(canvas, 15, H-110, 100, 5, "#000099"))
level.add(new Platform(canvas, 150, H-200, 100, 5, "#000099"))
level.add(new Platform(canvas, 250, H-250, 100, 5, "#000099"))
level.add(new Platform(canvas, 700, H-300, 100, 5, "#000099"))

var morio = new Player(canvas, 100, 10, "Morio", level);

document.addEventListener("keydown", function(event) {
    morio.handleKeys(event);
});
document.addEventListener("keyup", function(event) {
    morio.handleKeys(event);
});

console.log(morio);
function step() {
    canvas.fillStyle = "#a2c4b8";
    canvas.fillRect(0, 0, W, H);
    morio.update(level);
    level.draw();
    morio.draw();
}
main_loop(30, step);
