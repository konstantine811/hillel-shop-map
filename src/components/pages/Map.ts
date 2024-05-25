import { Map } from "mapbox-gl";
import { MAP_STYLES } from "../../config/common-map.config";
import HillelMap from "../../services/map/init";
import { CommonPage } from "../CommonPage";

export function MapPageContent() {
  return /*html*/ `
    <div id="map" style="width: 100%; height: 100vh"></div>
      `;
}

export class MapPage implements CommonPage {
  private map?: Map;
  constructor() {
    this.onRenderMap();
  }

  onRenderMap() {
    this.map = new HillelMap("map", MAP_STYLES.own).map;
  }

  onDestroy() {
    this.map?.remove();
  }
}
