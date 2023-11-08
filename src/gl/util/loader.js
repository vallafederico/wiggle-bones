import { ASSETS } from "../../assets/";
// import loadTexture from "./texture-loader";
import loadModel from "./model-loader";

// console.log("to load: ", ASSETS);

export default class {
  constructor(data) {
    this.data = data;
  }

  async load() {
    console.time("::");
    const [model] = await Promise.all([loadModel(ASSETS.model)]);

    console.timeEnd("::");

    return {
      model,
    };
  }

  pipeload() {}
}
