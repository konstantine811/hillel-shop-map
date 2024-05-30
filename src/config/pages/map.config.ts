import { LineLayer } from "mapbox-gl";

export enum MapSource {
  ukraine = "ukraine",
}
export const UKRAIN_LINE_LAYER: LineLayer = {
  id: "ukraine-outline",
  type: "line",
  source: MapSource.ukraine,
  layout: {},
  paint: {
    "line-color": "#F3EC3A",
    "line-width": 0.2,
  },
};
