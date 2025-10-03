import { LngLatBoundsLike } from "mapbox-gl";

export const MAP_STYLES = {
  own: "mapbox://styles/konstantine811/clbgrp235006a14o0pebuoyuo",
  satellite: "mapbox://styles/mapbox/satellite-v9",
  light: "mapbox://styles/mapbox/light-v11",
};

export const bounds: LngLatBoundsLike = [
  [22.085608, 44.361479], // південно-західний куточок
  [40.069058, 52.335075], // північно-східний куточок
];
