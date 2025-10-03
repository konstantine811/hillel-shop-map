import Experience from "@services/three-instance/Experience";
import World from "@services/three-scenes/fox-scene/world/World";
import { sourceFoxScene } from "../config/resources/source";
import { Component } from "./common";

export function foxExperiencePageContent() {
  return /*html*/ `
         <canvas class="webgl"></canvas>
      `;
}

export class FoxExperiencePage implements Component {
  private _experience!: Experience;
  constructor() {
    this.onInit();
  }

  onInit() {
    this._experience = new Experience(
      document.querySelector(".webgl") as HTMLCanvasElement,
      World,
      sourceFoxScene
    );
  }

  onDestroy() {
    this._experience.destroy();
  }
}
