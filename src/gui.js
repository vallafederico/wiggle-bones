import GUI from "lil-gui";

function initGui() {
  const gui = new GUI();
  const ctrl = {
    // myBoolean: true,
    x: 0.2,
    y: 0,
    z: 0,
  };

  gui.add(ctrl, "x", -1, 1.3); // Checkbox
  // gui.add(ctrl, "y", -1, 1); // Button
  gui.add(ctrl, "z", -1, 1); // Button

  window.gui = { gui, ctrl };
}

// initGui();
