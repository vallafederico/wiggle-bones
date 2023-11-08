import { Scene } from "three";
// import Quad from "./_quad.js";
import { Spider } from "./spider.js";

export default class extends Scene {
  constructor(data = {}) {
    super();
    this.data = data;

    this.create();
  }

  create() {
    // console.log("asstes", window.app.gl.assets);
    // this.quad = new Quad();
    // this.add(this.quad);

    this.spider = new Spider();
    this.add(this.spider);
  }

  render(t) {
    if (this.quad) this.quad.render(t);
    this.spider?.render(t);
  }

  resize() {}
}
