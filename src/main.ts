import "./style.scss";
import "mapbox-gl/dist/mapbox-gl.css";
import "./services/train-map-data.ts";
import { bootRouting } from "./services/routing/router.ts";
import { ROUTE_PATH } from "./config/route.config.ts";
import { HomePage } from "./components/pages/Home.ts";
import { MapPage } from "./components/pages/Map.ts";
import { CommonPage } from "./components/CommonPage.ts";
import { ThreePage } from "./components/pages/Three.ts";

const app = document.querySelector<HTMLDivElement>("#app");
const nav = document.querySelector<HTMLElement>("#nav");
let prevComponet: CommonPage | null = null;

function onRouteChange(route: ROUTE_PATH) {
  if (prevComponet) {
    prevComponet.onDestroy();
  }
  switch (route) {
    case ROUTE_PATH.HOME:
      prevComponet = new HomePage();
      break;
    case ROUTE_PATH.MAP:
      prevComponet = new MapPage();
      break;
    case ROUTE_PATH.THREE:
      prevComponet = new ThreePage();
      break;
    default:
      console.error("Route not found");
  }
}

if (app && nav) {
  bootRouting(nav, app, onRouteChange);
}
