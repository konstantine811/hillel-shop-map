import mapboxgl, { Map } from "mapbox-gl";
import { MAP_STYLES } from "../../config/common-map.config";

// Set your Mapbox access token
mapboxgl.accessToken =
  "pk.eyJ1Ijoia29uc3RhbnRpbmU4MTEiLCJhIjoiY2themphMDhpMGsyazJybWlpbDdmMGthdSJ9.m2RIe_g8m5dqbce0JrO73w";

class HillelMap {
  private _map: Map;

  constructor(idContainer: string, styleMap: string = MAP_STYLES.own) {
    this._map = this.mapSetup(idContainer, styleMap);
  }

  get map() {
    return this._map;
  }

  mapSetup(container: string, styleMap: string): Map {
    return new Map({
      container: container, // container ID in the HTML where the map should appear
      style: styleMap,
      center: [31.1656, 48.3794], // starting position [lng, lat]
      zoom: 0, // starting zoom level
    });
  }
}

export default HillelMap;
