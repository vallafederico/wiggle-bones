// import { Vector2 } from "three";
import { HalfFloatType } from "three";

import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { Shader } from "./mat/post/base";

import { N8AOPass } from "n8ao";

export class Post extends EffectComposer {
  constructor({ renderer, scene, camera }) {
    super(renderer);
    this.isOn = true;

    this.renderer = renderer;
    this.scene = scene;
    this.camera = camera;

    this.n8aopass = new N8AOPass(
      scene,
      camera,
      window.innerWidth / 2,
      window.innerHeight / 2
    );

    this.n8aopass.configuration.gammaCorrection = false;

    this.renderPass = new RenderPass(scene, camera);
    this.addPass(this.renderPass);

    this.createPasses();
  }

  createPasses() {
    this.addPass(this.n8aopass);
    this.addPass(new Shader());
  }

  createAO() {}

  renderPasses(t) {}

  resize() {
    this.n8aopass = new N8AOPass(
      this.scene,
      this.camera,
      window.innerWidth / 2,
      window.innerHeight / 2
    );
    this.n8aopass.configuration.gammaCorrection = false;
  }
}

/*
if (this.post?.isOn) {
    this.post.renderPasses(this.time);
    this.post.render();
  } else {
    this.renderer.render(this.scene, this.camera);
  }
*/
