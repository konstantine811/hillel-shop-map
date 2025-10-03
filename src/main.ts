import "./style.css";
import "mapbox-gl/dist/mapbox-gl.css";
import "./services/train-map-data.ts";
import {
  registerBrowserBackAndForth,
  registerNavLinks,
  renderIntialPage,
  renderNavLinks,
} from "./services/routing/router.ts";
import { ROUTES, ROUTES_PATH } from "./config/route.config.ts";
import { MapPage, mapPageContent } from "./pages/map.ts";
import { Component } from "./pages/common.ts";
import { HomePage, homePageContent } from "./pages/home.ts";
import { houseScenePageContent, HouseScenePage } from "./pages/houseScene.ts";
import {
  FoxExperiencePage,
  foxExperiencePageContent,
} from "./pages/foxExperience.ts";

const nav = document.querySelector("#nav") as HTMLElement;
const app = document.querySelector<HTMLDivElement>("#app");
if (app) {
  let prevEntityClass: Component | null = null;

  ROUTES[ROUTES_PATH.MAP].content = mapPageContent();
  ROUTES[ROUTES_PATH.HOME].content = homePageContent();
  ROUTES[ROUTES_PATH.houseScene].content = houseScenePageContent();
  ROUTES[ROUTES_PATH.foxExperience].content = foxExperiencePageContent();

  function onRouteChange(route: ROUTES_PATH) {
    if (prevEntityClass) {
      prevEntityClass.onDestroy();
      prevEntityClass = null;
    }
    switch (route) {
      case ROUTES_PATH.HOME:
        prevEntityClass = new HomePage();
        break;
      case ROUTES_PATH.MAP:
        prevEntityClass = new MapPage();
        break;
      case ROUTES_PATH.houseScene:
        prevEntityClass = new HouseScenePage();
        break;
      case ROUTES_PATH.foxExperience:
        prevEntityClass = new FoxExperiencePage();
        break;
    }
  }
  if (nav) {
    (function bootup() {
      renderNavLinks(nav);
      registerNavLinks(app, nav, onRouteChange);
      registerBrowserBackAndForth(app, onRouteChange);
      renderIntialPage(app, onRouteChange);
    })();
  }
}
