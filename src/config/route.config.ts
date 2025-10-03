import { IRoute } from "../models/route.model";

export enum ROUTES_PATH {
  HOME = "/",
  MAP = "/map",
  houseScene = "/house-scene",
  foxExperience = "/fox-experience",
}

export const ROUTES: IRoute = {
  [ROUTES_PATH.HOME]: {
    linkLabel: "Home",
    content: `I am in home page`,
  },
  [ROUTES_PATH.MAP]: {
    linkLabel: "Map",
    content: `I am in map page`,
  },
  [ROUTES_PATH.houseScene]: {
    linkLabel: "House Scene",
    content: `I am in house scene page`,
  },
  [ROUTES_PATH.foxExperience]: {
    linkLabel: "Fox Experience",
    content: `I am in fox experience page`,
  },
};
