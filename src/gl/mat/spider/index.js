import { ShaderMaterial, DoubleSide } from "three";

import vertexShader from "./vertex.vert";
import fragmentShader from "./fragment.frag";

export default class extends ShaderMaterial {
  constructor(options) {
    const { diffuse } = window.app.gl.assets;
    super({
      vertexShader,
      fragmentShader,
      side: DoubleSide,
      uniforms: {
        u_time: { value: options?.u_time || 0 },
        u_diff: { value: diffuse || null },
      },
    });
  }

  set time(t) {
    this.uniforms.u_time.value = t;
  }
}
