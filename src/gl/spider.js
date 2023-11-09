import { Group, MeshNormalMaterial } from "three";
import { Spinner } from "./util/spinner";
import { lerp } from "../util/math";

import Material from "./mat/spider";

export class Spider extends Group {
  bones = [];
  a = {
    y: 0,
    ty: 0,
    x: 0,
    tx: 0,
  };

  constructor() {
    super();

    this.rotation.x = Math.PI * 0.2;

    this.spinner = new Spinner();

    this.mat = new Material();

    const { model } = window.app.gl.assets.model;
    this.traverse(model);
    this.model = model;
    this.add(this.model);
  }

  traverse(model) {
    model.traverse((o) => {
      if (o.isMesh) {
        o.material = this.mat;
      } else if (o.isBone) {
        // console.log(o);

        if (o.name.substring(0, 1) === "_") {
          // console.log("bone", o.name);

          o.baseCtrlxxx = {
            x: o.rotation._x,
            y: o.rotation._y,
            z: o.rotation._z,
          };

          this.bones.push(o);
        }
      }
    });
  }

  render(t) {
    this.spinner.render();

    this.model.rotation.x = this.spinner.velocity.y * 1;
    this.model.rotation.y = this.spinner.spin.x * 0.1;

    this.a.y = lerp(this.a.y, -this.spinner.velocity.y * 2, 0.05);
    this.a.x = lerp(this.a.x, this.spinner.velocity.x, 0.05);

    this.model.position.y = this.a.y;
    this.model.position.x = this.a.x;

    this.bones.forEach((b, i) => {
      b.rotation.x = b.baseCtrlxxx.x - this.spinner.velocity.y * 0.8;
      b.rotation.z = b.baseCtrlxxx.z + this.spinner.velocity.x * 0.4;
    });
  }
}
