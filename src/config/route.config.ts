import { HomePageContent } from "../components/pages/Home";
import { MapPageContent } from "../components/pages/Map";
import { ThreePageContent } from "../components/pages/Three";

export const enum ROUTE_PATH {
  HOME = "/",
  MAP = "/map",
  THREE = "/three",
}

export const ROUTES = {
  [ROUTE_PATH.HOME]: {
    linkLabel: "Home",
    content: HomePageContent(),
  },
  [ROUTE_PATH.MAP]: {
    linkLabel: "Map",
    content: MapPageContent(),
  },
  [ROUTE_PATH.THREE]: {
    linkLabel: "3d Web",
    content: ThreePageContent(),
  },
};
