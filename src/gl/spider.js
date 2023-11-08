import { Group, MeshNormalMaterial } from "three";

export class Spider extends Group {
  bones = [];
  constructor() {
    super();

    const { model } = window.app.gl.assets.model;
    // console.log(model);
    this.traverse(model);

    this.add(model);
  }

  traverse(model) {
    model.traverse((o) => {
      //   console.log(i);
      if (o.isMesh) {
        // console.log(o);
        o.material = new MeshNormalMaterial();
      } else if (o.isBone) {
        // console.log(o.rotation);

        if (o.name.substring(0, 4) !== "ctrl") {
          //   console.log("bone", o.name);

          o.baseCtrlxxx = {
            x: o.rotation._x,
            y: o.rotation._y,
            z: o.rotation._z,
          };

          //   o.baseQuat = {
          //     x: o.quaternion.x,
          //     y: o.quaternion.y,
          //     z: o.quaternion.z,
          //   };
          //   console.log(o.baseQuat);

          //   o.rotation.order = "YZX";

          this.bones.push(o);
        }
      }
    });

    // setInterval(() => {
    //   console.log("curr 0", this.bones[0].baseCtrlxxx.x);
    // }, 1000);
  }

  render(t) {
    // * ROTATION
    // this.bones.forEach((b, i) => {
    //   b.rotation.x = b.baseCtrlxxx.x + window.gui.ctrl.x;
    //   b.rotation.y = b.baseCtrlxxx.y + window.gui.ctrl.x;
    //   b.rotation.z = b.baseCtrlxxx.z + window.gui.ctrl.x;
    // });
    //
    //  * QUATERION
    // this.bones.forEach((b, i) => {
    //   b.quaternion.x = b.baseQuat.x + window.gui.ctrl.x;
    // });
  }
}

// fucking hate quaterions have no clue
// doing all this because I don't want to rerig the mesh
