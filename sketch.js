var camera;
var pframe;

function setup() {


  camera = createCapture(VIDEO);
  camera.size(windowWidth, windowHeight);
  camera.hide();
  pframe = createImage(camera.width, camera.height);
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.style('display', 'block');
}

function draw() {
  background(0);
  scale(-1, 1);
  translate(-width, 0);
  push();
  rectMode(CORNER);
  var blackwhite = camera.get();
  blackwhite.filter(GRAY);  
  image(blackwhite, 0, 0, width, height);
  fill(0);
  rect(0, 0, width / 2, height);
  pop();
  

  camera.loadPixels();
  pframe.loadPixels();

  pframe.copy(camera, 0, 0, camera.width, camera.height, 0, 0, camera.width, camera.height);

  var square = 6;

  for (var x = 0; x < camera.width; x += square) {
    for (var y = 0; y < camera.height; y += square) {
      if(x < camera.width/2){
        var index = ((y * camera.width) + x) * 4;

        var r1 = pframe.pixels[index];
        var g1 = pframe.pixels[index + 1];
        var b1 = pframe.pixels[index + 2];

        var r2 = camera.pixels[index];
        var g2 = camera.pixels[index + 1];
        var b2 = camera.pixels[index + 2];

        var pixDist = dist(r1, g1, b1, r2, g2, b2);

        if (pixDist > 30) {
          noStroke();
          if (r2 > g2 && r2 > b2 && r2 > 127) {
            fill(255, 140, 0); 
          } else if (g2 > r2 && g2 > b2 && g2 > 127) {
            fill(0, 255, 0); 
          } else if (b2 > r2 && b2 > g2 && b2 > 127) {
            fill(0, 0, 255);
          } else if (r2 > g2 && r2 > b2 && r2 <= 127) {
            fill(255, 105, 180); 
          } else if (g2 > r2 && g2 > b2 && g2 <= 127) {
            fill(255, 255, 0); 
          } else {
            fill(255); 
          }
          rectMode(CENTER);
          rect(x, y, square, square);
        }
      }
    }
  }

}

