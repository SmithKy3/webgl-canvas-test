import '../index.css';
import fragShaderSource from '../shaders/ks-shader.frag';
import vertShaderSource from '../shaders/ks-shader.vert';

window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.querySelector('#background-canvas');
    if (!canvas) throw new Error('Canvas not found');
    const context = canvas.getContext('webgl');
    if (!context) throw new Error('WebGL rendering context not available');

    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    context.viewport(0, 0, canvas.width, canvas.height);

    const buffer = context.createBuffer();
    context.bindBuffer(context.ARRAY_BUFFER, buffer);
    context.bufferData(
        context.ARRAY_BUFFER,
        new Float32Array([
        -1.0,
        -1.0,
        1.0,
        -1.0,
        -1.0,
        1.0,
        -1.0,
        1.0,
        1.0,
        -1.0,
        1.0,
        1.0,
        ]),
        context.STATIC_DRAW
    );

    const vertexShader = context.createShader(context.VERTEX_SHADER);
    context.shaderSource(vertexShader, vertShaderSource);
    context.compileShader(vertexShader);

    const fragmentShader = context.createShader(context.FRAGMENT_SHADER);
    context.shaderSource(fragmentShader, fragShaderSource);
    context.compileShader(fragmentShader);

    // Connect the shaders and program to the renderer
    const program = context.createProgram();
    context.attachShader(program, vertexShader);
    context.attachShader(program, fragmentShader);
    context.linkProgram(program);
    context.useProgram(program);

    const positionLocation = context.getAttribLocation(program, 'a_position');
    context.enableVertexAttribArray(positionLocation);

    // const resolutionPosition = context.getUniformLocation(program, "resolution");
    // const resolution = [canvas.clientWidth, canvas.clientHeight];
    // context.uniform2fv(resolutionPosition, resolution);
    context.vertexAttribPointer(positionLocation, 2, context.FLOAT, false, 0, 0);
    context.drawArrays(context.TRIANGLES, 0, 6);
});