precision highp float;

vec2 resolution = vec2(983.0, 821.0);

void main() {
    vec2 normalizedXY = gl_FragCoord.xy/resolution;
	gl_FragColor = vec4(0.0, normalizedXY.x, normalizedXY.y, 1.0);
}