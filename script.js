
function setup() {
  var myCanvas = createCanvas(800, 250);
  myCanvas.parent('mySketch');
}
var offset = 0.0;
var framer = 0;
var circle = 210;
var numCicles = 80;
var easing = 0.06;
var xpos = 0;

function draw() {
  smooth();
  background(255);
  stroke(51);
  strokeWeight(2);
  noFill();
  var x = 0.0;
  var y = 0.0;
  var j = 0.0;

  translate(width/2, height/2);

  //framer is determined with cos func, so it inverts the circles
  // if (framer < 0) {
  //   offset -= 5;
  //
  // }
  // else {
  //   offset += 5;
  // } //expansion of circles

  var targetX = mouseX;
  var dx = targetX - xpos;
  xpos += dx * easing;
  offset = xpos - 400;
  //left cicle series
  for (i = 0; i < numCicles; i+=10) {

    ellipse(offset * i * 1/100, 0, circle, circle);
  }

  //bottom circle series
  for (i = 0; i < numCicles; i+=10) {

    ellipse(0, offset * i * 1/100, circle, circle);
  }

  //bottom right diag
  for (i = 0; i < numCicles; i+=10) {

    ellipse(offset * i * 1/100, offset * i * 1/100, circle, circle);
  }

  //bottom left diag
  for (i = 0; i < numCicles; i+=10) {

    ellipse(-(offset * i * 1/100), offset * i * 1/100, circle, circle);
  }

  //top right diag
  for (i = 0; i < numCicles; i+=10) {

    ellipse((offset * i * 1/100), -(offset * i * 1/100), circle, circle);
  }

  //top left diag
  for (i = 0; i < numCicles; i+=10) {

    ellipse(-(offset * i * 1/100), -(offset * i * 1/100), circle, circle);
  }

  //left circle
  for (i = 0; i < numCicles; i+=10) {

    ellipse(-(offset * i * 1/100), 0, circle, circle);
  }

  //top circle series
  for (i = 0; i < numCicles; i+=10) {

    ellipse(0, -(offset * i * 1/100), circle, circle);
  }

  //fills in big circle that goes off screen to create the mask
  strokeWeight(320);
  stroke(255);
  ellipse(0, 0, 530, 530);

  //Failed attemps at doing the thing above:
  // curve(-250, 0, -250, 0, 250, 0, 250, 0);
  //   beginShape();

  //   bezier(-250, 0, -275, 350, 275, 350, 250, 0);

  // endShape();

  //increment framer so it alternates pos and neg

}
