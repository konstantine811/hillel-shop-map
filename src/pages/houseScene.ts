import { Component } from "./common";
import Experience from "@services/three-instance/Experience";
import World from "@services/three-scenes/house-scene/world/World";
import { sourceHouseScene } from "@config/resources/house-source";

export function houseScenePageContent() {
  return /*html*/ `
         <canvas class="webgl"></canvas>
      `;
}

export class HouseScenePage implements Component {
  private _experience!: Experience;
  constructor() {
    this.onInit();
  }

  onInit() {
    // Canvas
    const canvas = document.querySelector<HTMLCanvasElement>("canvas.webgl");
    if (!canvas) {
      throw new Error("Canvas not found");
    }
    this._experience = new Experience(canvas, World, sourceHouseScene);
  }

  onDestroy() {
    this._experience.destroy();
  }
}
