uniform float u_time;
uniform sampler2D u_diff; 

varying vec2 v_uv;
// varying vec3 vPosition;


void main() {
  vec4 diff = texture2D(u_diff, v_uv);


  gl_FragColor.rgb = diff.rgb;
  gl_FragColor.a = 1.;


  // gl_FragColor = vec4(v_uv, 0., 1.);
  // gl_FragColor = vec4(1., 0., 0., 1.);
}
