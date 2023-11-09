import { WebGLRenderer, SRGBColorSpace } from "three";
// import { OrbitControls } from "three/addons/controls/OrbitControls.js";

import Loader from "./util/loader.js";

import Viewport from "./util/viewport.js";
import Scene from "./scene.js";
import Camera from "./_camera.js";

import { Post } from "./post.js";

export class Gl {
  constructor(sel) {
    this.vp = new Viewport();
    this.renderer = new WebGLRenderer({
      antialias: false,
      stencil: false,
      depth: false,
      outputColorSpace: SRGBColorSpace,
    });

    this.renderer.setPixelRatio(this.vp.dpr);
    this.renderer.setSize(this.vp.w, this.vp.h);
    this.renderer.setClearColor(0x000000, 1);
    this.vp.container.appendChild(this.renderer.domElement);

    this.camera = this.vp.camera = new Camera();

    this.camera.position.set(0, 0, 3);
    // this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.paused = false;
    this.time = 0;

    this.init();
  }

  async init() {
    this.loader = new Loader();
    this.assets = await this.loader.load();

    this.create();
    this.initEvents();
    this.render();
  }

  initEvents() {
    // prettier-ignore
    new ResizeObserver((entry) => this.resize(entry[0].contentRect)).observe(this.vp.container);
  }

  create() {
    this.scene = new Scene();

    this.post = new Post({
      renderer: this.renderer,
      scene: this.scene,
      camera: this.camera,
    });
  }

  render() {
    if (this.paused) return;
    this.time += 0.05;

    // this.controls?.update();
    if (this.scene && this.scene.render) this.scene.render(this.time);

    requestAnimationFrame(this.render.bind(this));

    // render post if on
    if (this.post?.isOn) {
      this.post.renderPasses(this.time);
      this.post.render();
    } else {
      this.renderer.render(this.scene, this.camera);
    }
  }

  resize() {
    this.vp.resize();
    this.renderer.setSize(this.vp.w, this.vp.h);
    this.camera.aspect = this.vp.w / this.vp.h;
    this.camera.updateProjectionMatrix();

    this.post?.resize();

    if (this.scene) this.scene.resize();
  }

  /* Utils
   */

  get viewSize() {
    const fovInRad = (this.camera.fov * Math.PI) / 180;
    const height = Math.abs(
      this.camera.position.z * Math.tan(fovInRad / 2) * 2
    );
    return { w: height * (this.vp.w / this.vp.h), h: height };
  }
}
