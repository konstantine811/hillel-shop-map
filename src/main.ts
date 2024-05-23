import "./style.css";
import HillelMap from "./services/map/init.ts";
import { MAP_STYLES } from "./config/common-map.config.ts";
import "./services/train-map-data.ts";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = /*html*/ `
  <div id="map" style="width: 100%; height: 100vh"></div>
`;
const { map } = new HillelMap("map", MAP_STYLES.own);
const WEATHER_API_KEY = "ca51dc5865dbe4eba4709c18e67c224a";
const getWeatherApiUrl = (lat: number, lon: number) =>
  `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`;

const POINT_CONFIG = {
  sourceId: "points",
  layerId: "pointsLayer",
};

map.on("load", () => {
  map.addSource(POINT_CONFIG.sourceId, {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [],
    },
  });

  // Add a new layer to visualize the polygon.
  map.addLayer({
    id: POINT_CONFIG.layerId,
    type: "circle",
    source: POINT_CONFIG.sourceId, // reference the data source
    layout: {},
    paint: {
      "circle-color": "#FF0000",
    },
  });
});

map.on("click", (e) => {
  const { lat, lng } = e.lngLat;
  fetch(getWeatherApiUrl(lat, lng))
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
});
