#define MPI 3.1415926535897932384626433832795

#include <skinning_pars_vertex>

uniform float u_time;
varying vec2 v_uv;


void main() {
   #include <skinbase_vertex>


  vec4 tr = modelViewMatrix * vec4(position, 1.0);
  // gl_Position = projectionMatrix * tr;
  v_uv = uv;

  #include <begin_vertex>
  
  #include <skinning_vertex>
  #include <project_vertex>
  #include <worldpos_vertex>
}
