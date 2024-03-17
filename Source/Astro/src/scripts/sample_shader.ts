let gl: WebGLRenderingContext | null = null;
let glCanvas: HTMLCanvasElement | null = null;

// Aspect ratio and coordinate system
// details

let aspectRatio: number;
let currentRotation: Array<number>  = [0, 1];
let currentScale: Array<number>     = [1.0, 1.0];

// Vertex information

let vertexArray: Float32Array;
let vertexBuffer: WebGLBuffer | null;
let vertexNumComponents: number;
let vertexCount: number;

// Rendering data shared with the
// scalers.

let uScalingFactor;
let uGlobalColor;
let uRotationVector;
let aVertexPosition;

// Animation timing

let shaderProgram: WebGLProgram | null;
let currentAngle: number;
let previousTime: number = 0.0;
let degreesPerSecond: number = 0.0;

class ShaderSet {
    public id: string;
    public type: number;
    
    constructor(id: string, type: number) {
        this.id = id;
        this.type = type;
    }
}

window.addEventListener("load", startup, false);


function startup(): boolean {
    glCanvas = <HTMLCanvasElement> document.getElementById("glcanvas");
    gl = <WebGLRenderingContext> glCanvas.getContext("webgl");

    const shaderSets = [
        new ShaderSet("vertex-shader", gl.VERTEX_SHADER),
        new ShaderSet("fragment-shader", gl.FRAGMENT_SHADER)
    ];

    shaderProgram = buildShaderProgram(shaderSets);

    aspectRatio = glCanvas.width / glCanvas.height;
    currentRotation = [0, 1];
    currentScale = [1.0, aspectRatio];

    vertexArray = new Float32Array([
        -0.5, 0.5, 0.5, 0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5, -0.5, -0.5,
    ]);

    vertexBuffer = gl.createBuffer();
    if (vertexBuffer == null) {
        return false;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertexArray, gl.STATIC_DRAW);

    vertexNumComponents = 2;
    vertexCount = vertexArray.length / vertexNumComponents;

    currentAngle = 0.0;

    if (!animateScene()) {
        return false;
    }

    return true;
}


function buildShaderProgram(shaderInfo: Array<ShaderSet>): WebGLProgram | null {
    if (gl == null) {
        return null;
    }
    
    const program: WebGLProgram | null = gl.createProgram();
    if (program == null) {
        return null;
    }

    shaderInfo.forEach((desc: ShaderSet) => {
        const shader = compileShader(desc.id, desc.type);
        if (gl == null) {
            return;
        }

        if (shader) {
            gl.attachShader(program, shader);
        }
    });

    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.log("Error linking shader program:");
        console.log(gl.getProgramInfoLog(program));
    }

    return program;
}


function compileShader(id: string, type: number): WebGLShader | null {
    if (gl == null) {
        return null;
    }

    const shaderElement: HTMLElement | null = document.getElementById(id)
    if (shaderElement == null) {
        return null;
    }

    const shaderNode: ChildNode | null = shaderElement.firstChild
    if (shaderNode == null) {
        return null;
    }

    const code: string | null = shaderNode.nodeValue;
    const shader: WebGLShader | null = gl.createShader(type);
    if (code == null || shader == null) {
        return null;
    }

    gl.shaderSource(shader, code);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.log(
        `Error compiling ${
            type === gl.VERTEX_SHADER ? "vertex" : "fragment"
        } shader:`,
        );
        console.log(gl.getShaderInfoLog(shader));
    }

    return shader;
}


function animateScene(): boolean {
    if (glCanvas == null || gl == null || shaderProgram == null) {
        return false;
    }
    gl.viewport(0, 0, glCanvas.width, glCanvas.height);
    gl.clearColor(0.33, 0.33, 0.33, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    const radians = (currentAngle * Math.PI) / 180.0;
    currentRotation[0] = Math.sin(radians);
    currentRotation[1] = Math.cos(radians);

    gl.useProgram(shaderProgram);

    uScalingFactor = gl.getUniformLocation(shaderProgram, "uScalingFactor");
    uGlobalColor = gl.getUniformLocation(shaderProgram, "uGlobalColor");
    uRotationVector = gl.getUniformLocation(shaderProgram, "uRotationVector");

    gl.uniform2fv(uScalingFactor, currentScale);
    gl.uniform2fv(uRotationVector, currentRotation);
    gl.uniform4fv(uGlobalColor, [0.1, 0.7, 0.2, 1.0]);

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

    aVertexPosition = gl.getAttribLocation(shaderProgram, "aVertexPosition");

    gl.enableVertexAttribArray(aVertexPosition);
    gl.vertexAttribPointer(
        aVertexPosition,
        vertexNumComponents,
        gl.FLOAT,
        false,
        0,
        0,
    );

    gl.drawArrays(gl.TRIANGLES, 0, vertexCount);

    requestAnimationFrame((currentTime) => {
        const deltaAngle =
        ((currentTime - previousTime) / 1000.0) * degreesPerSecond;

        currentAngle = (currentAngle + deltaAngle) % 360;

        previousTime = currentTime;
        animateScene();
    });

    return true;
}