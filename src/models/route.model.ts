import { ROUTES_PATH } from "../config/route.config";

export type IRoute = {
  [key in ROUTES_PATH]: IRouteConfig;
};

export interface IRouteConfig {
  linkLabel: string;
  content: string;
}
