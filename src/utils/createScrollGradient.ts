import { resumeColors } from '../theme';

const vertexSource = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const fragmentSource = `
precision highp float;
uniform vec2 u_size;
uniform float u_progress;
uniform vec3 u_background;
uniform vec3 u_accent;

void main() {
  vec2 position = vec2(gl_FragCoord.x, u_size.y - gl_FragCoord.y);
  float angle = radians(125.0 + 110.0 * u_progress);
  vec2 direction = vec2(sin(angle), -cos(angle));
  float height = u_size.y * 1.35;
  float shift = (-85.0 + 170.0 * u_progress) * u_size.y / 470.0;
  vec2 center = vec2(u_size.x * 0.5, u_size.y * 0.5 + shift);
  float extent = abs(u_size.x * direction.x) + abs(height * direction.y);
  float t = 0.5 + dot(position - center, direction) / extent;

  vec4 blue = vec4(vec3(110.0, 139.0, 210.0) / 255.0 * 0.34, 0.34);
  vec4 accent = vec4(u_accent * 0.42, 0.42);
  vec4 rose = vec4(vec3(188.0, 114.0, 156.0) / 255.0 * 0.24, 0.24);
  vec4 light;
  if (t < 0.03) light = vec4(0.0);
  else if (t < 0.33) light = mix(vec4(0.0), blue, (t - 0.03) / 0.30);
  else if (t < 0.52) light = mix(blue, accent, (t - 0.33) / 0.19);
  else if (t < 0.70) light = mix(accent, rose, (t - 0.52) / 0.18);
  else if (t < 0.98) light = mix(rose, vec4(0.0), (t - 0.70) / 0.28);
  else light = vec4(0.0);

  // Composite the gradient and its edge fade before quantizing the final opaque color.
  float fade = clamp(position.x / u_size.x, 0.0, 1.0) * 0.65;
  vec3 color = u_background * (1.0 - light.a * fade) + light.rgb * fade;

  // A fixed spatial threshold breaks rounding boundaries without a grain overlay.
  float threshold = fract(52.9829189 * fract(dot(gl_FragCoord.xy, vec2(0.06711056, 0.00583715))));
  gl_FragColor = vec4(floor(clamp(color, 0.0, 1.0) * 255.0 + threshold) / 255.0, 1.0);
}
`;

function colorChannels(hex: string) {
  return [1, 3, 5].map((offset) => parseInt(hex.slice(offset, offset + 2), 16) / 255);
}

export function createScrollGradient(canvas: HTMLCanvasElement) {
  const gl = canvas.getContext('webgl', {
    alpha: false,
    antialias: false,
    depth: false,
    stencil: false,
    premultipliedAlpha: false,
  });
  if (!gl) return null;

  function compile(type: number, source: string) {
    const shader = gl!.createShader(type);
    if (!shader) return null;
    gl!.shaderSource(shader, source);
    gl!.compileShader(shader);
    if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
      gl!.deleteShader(shader);
      return null;
    }
    return shader;
  }

  const vertex = compile(gl.VERTEX_SHADER, vertexSource);
  const fragment = compile(gl.FRAGMENT_SHADER, fragmentSource);
  const program = gl.createProgram();
  const buffer = gl.createBuffer();
  const dispose = () => {
    gl.deleteBuffer(buffer);
    gl.deleteProgram(program);
    gl.deleteShader(vertex);
    gl.deleteShader(fragment);
  };
  if (!vertex || !fragment || !program || !buffer) {
    dispose();
    return null;
  }
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    dispose();
    return null;
  }
  gl.useProgram(program);
  gl.disable(gl.DITHER);
  gl.disable(gl.BLEND);
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
    gl.STATIC_DRAW,
  );
  const position = gl.getAttribLocation(program, 'a_position');
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
  const size = gl.getUniformLocation(program, 'u_size');
  const progress = gl.getUniformLocation(program, 'u_progress');
  gl.uniform3fv(gl.getUniformLocation(program, 'u_background'), colorChannels(resumeColors.canvas));
  gl.uniform3fv(gl.getUniformLocation(program, 'u_accent'), colorChannels(resumeColors.accent));
  const limits = gl.getParameter(gl.MAX_VIEWPORT_DIMS) as Int32Array;
  let previousProgress = -1;

  return {
    draw(value: number) {
      const bounds = canvas.getBoundingClientRect();
      const width = Math.round(bounds.width * window.devicePixelRatio);
      const height = Math.round(bounds.height * window.devicePixelRatio);
      if (!width || !height || width > limits[0] || height > limits[1] || gl.isContextLost()) {
        canvas.style.visibility = 'hidden';
        return false;
      }
      const resized = canvas.width !== width || canvas.height !== height;
      if (!resized && previousProgress === value && canvas.style.visibility === 'visible')
        return false;
      if (resized) {
        canvas.width = width;
        canvas.height = height;
      }
      gl.viewport(0, 0, width, height);
      gl.uniform2f(size, width, height);
      gl.uniform1f(progress, value);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      previousProgress = value;
      canvas.style.visibility = 'visible';
      return true;
    },
    dispose,
  };
}
