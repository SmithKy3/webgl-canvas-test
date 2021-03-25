// A simple vertex shader that takes the screen resolution and returns the co-ordinates without mutation or computation

attribute vec2 a_position;

void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}