import processing.core.*; 
import processing.data.*; 
import processing.event.*; 
import processing.opengl.*; 

import java.util.HashMap; 
import java.util.ArrayList; 
import java.io.File; 
import java.io.BufferedReader; 
import java.io.PrintWriter; 
import java.io.InputStream; 
import java.io.OutputStream; 
import java.io.IOException; 

public class processing extends PApplet {

// Jonathan Lu DES 37
int width = 800;
public void setup() {
  
  noStroke();
  
  background(255);

}

float randy = 25.0f; //size of hexagon
float w = 0;
int fade = 255;

public void draw() {
  background(255);
  //draw grid of black hexagons
  for (int i = 0; i < width; i+=50) {
    for (int j = 0; j < width; j+=90) {
      // float randy = random(0, 25);
      fill(0);
      beginShape();
      //draws at 1/3 intervals of the unit circle 6 times
      for ( int hex = 0; hex < 6; hex++ ) {
          float x = sin( hex * PI / 3 ) * randy ;
          float y = cos( hex * PI / 3 ) * randy ;
          vertex( x + 25 + i, j + y + (25));
      }
      endShape();
    }
  }

  //offsets the black hexagons such that the neegative space is also hexagons
  for (int i = 25; i < width; i+=50) {
    for (int j = 45; j < width; j+=90) {

      //fills black hexagons
      fill(0);
      beginShape();
      for ( int hex = 0; hex < 6; hex++ ) {
          float x = sin( hex * PI / 3 ) * randy ;
          float y = cos( hex * PI / 3 ) * randy ;
          vertex( x + 25 + i, j + y + (25));
      }
      endShape();
    }
  }

  //creates quadrilaterals with the same method as above
  for (int i = 0; i < width; i+=50) {
    for (int j = 0; j < width; j+=90) {
      fill(0, 0, 255, fade);
      beginShape();
      float x = 0.0f;
      float y = 0.0f;
      //draws three vertices with the same hexagon function
      for ( int hex = 0; hex < 3; hex++ ) {
          x = sin( hex * PI / 3 ) * randy ;
          y = cos( hex * PI / 3 ) * randy ;
          vertex( x + 25 + i, j + y + (25));
      }
      //estimations of offset for the last vertex
      vertex(x + 2.5f + i, y + 36.5f + j);
      endShape();

      //fills red for the parallelogram
      fill(255, 0, 0, fade);
      beginShape();
      //offset by 2*(PI/3) so that it occupies a different area of the unit circle
      for ( int hex = 0; hex < 3; hex++ ) {
          x = sin( hex * PI / 3 + 2*(PI/ 3)) * randy ;
          y = cos( hex * PI / 3 + 2*(PI / 3)) * randy ;
          vertex( x + 25 + i, j + y + (25));
      }
      //more estimations of the last vertex (center vertex)
      vertex(x + 46 + i, y + 37+ j);
      endShape();

      //fills yellow
      fill(255, 255, 0, fade);
      beginShape();
      //more offsetting
      for ( int hex = 0; hex < 3; hex++ ) {
          x = sin( hex * PI / 3 - 2*(PI/ 3)) * randy ;
          y = cos( hex * PI / 3 - 2*(PI / 3)) * randy ;
          vertex( x + 25 + i, j + y + (25));
      }
      //more estimations
      vertex(x + 25 + i, y  + j);
      endShape();
    }
    //variable to control the fade of the primary colors
    fade -= 15;
  }

  //duplicate code of the above, used with the offset of the hexagons
  fade = 255;
  for (int i = -25; i < 525; i+=50) {
    for (int j = 45; j < 525; j+=90) {
      fill(0, 0, 255, fade);
      beginShape();
      float x = 0.0f;
      float y = 0.0f;
      for ( int hex = 0; hex < 3; hex++ ) {
          x = sin( hex * PI / 3 ) * randy ;
          y = cos( hex * PI / 3 ) * randy ;
          vertex( x + 25 + i, j + y + (25));
      }
      vertex(x + 2.5f + i, y + 36.5f + j);
      endShape();

      fill(255, 0, 0, fade);
      beginShape();
      for ( int hex = 0; hex < 3; hex++ ) {
          x = sin( hex * PI / 3 + 2*(PI/ 3)) * randy ;
          y = cos( hex * PI / 3 + 2*(PI / 3)) * randy ;
          vertex( x + 25 + i, j + y + (25));
      }
      vertex(x + 46 + i, y + 37+ j);
      endShape();

      fill(255, 255, 0, fade);
      beginShape();
      for ( int hex = 0; hex < 3; hex++ ) {
          x = sin( hex * PI / 3 - 2*(PI/ 3)) * randy ;
          y = cos( hex * PI / 3 - 2*(PI / 3)) * randy ;
          vertex( x + 25 + i, j + y + (25));
      }
      vertex(x + 25 + i, y  + j);
      endShape();


    }
    fade -= 15;
  }

      // ".tif", ".tga", ".jpg", and ".png" are supported, "####" is replaced with current frame number at time of save
      saveFrame("frames/####.tif");

}
  public void settings() {  size(800, 250);  smooth(); }
  static public void main(String[] passedArgs) {
    String[] appletArgs = new String[] { "processing" };
    if (passedArgs != null) {
      PApplet.main(concat(appletArgs, passedArgs));
    } else {
      PApplet.main(appletArgs);
    }
  }
}
