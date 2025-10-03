import { Map } from "mapbox-gl";
import { MAP_STYLES } from "../config/common-map.config";
import HillelMap from "../services/map/init";
import { Component } from "./common";

import { Threebox } from "threebox-plugin";
import { MAP_ID } from "../config/map-add-3d.config";
import { MapAdd3d, sideBar } from "../services/map/mad-add-3d";

declare global {
  interface Window {
    tb: Threebox;
  }
}

export function mapPageContent() {
  return /*html*/ `
    <main class="relative h-full max-h-screen overflow-hidden">
      <div id=${MAP_ID} class="w-full min-h-screen"></div>
      ${sideBar()}
    </main>
    `;
}

export class MapPage implements Component {
  private map: Map;
  private mapAdd3d: MapAdd3d;
  constructor() {
    this.map = new HillelMap(MAP_ID, MAP_STYLES.light).map;
    this.mapAdd3d = new MapAdd3d(this.map);
  }

  onDestroy(): void {
    this.mapAdd3d.onDestroy();
    this.map.remove();
  }
}
