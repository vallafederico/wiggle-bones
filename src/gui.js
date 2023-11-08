import GUI from "lil-gui";

const gui = new GUI();

const ctrl = {
  // myBoolean: true,
  x: 0.2,
  y: 0,
  z: 0,
};

gui.add(ctrl, "x", 0, 1); // Checkbox
gui.add(ctrl, "y", 0, 1); // Button
gui.add(ctrl, "z", 0, 1); // Button

window.gui = { gui, ctrl };
