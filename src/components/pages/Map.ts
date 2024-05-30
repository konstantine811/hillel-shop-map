import { LngLatBoundsLike, Map } from "mapbox-gl";
import { MAP_STYLES } from "../../config/common-map.config";
import HillelMap from "../../services/map/init";
import { CommonPage } from "../CommonPage";
import ukraineGeoJSON from "../../data/urkGeoJson.json";
import { MapSource, UKRAIN_LINE_LAYER } from "../../config/pages/map.config";
import { createElement, LocateFixed } from "lucide";

// @ts-ignore
import { LoadGLTFOptions, Threebox } from "threebox-plugin";

declare global {
  interface Window {
    tb: Threebox;
  }
}

const locateFixed = createElement(LocateFixed);

export function MapPageContent() {
  return /*html*/ `
    <div class="relative grow" id="map" style="width: 100%">
    <div class="absolute  bottom-10 left-2 z-50">
        <button class="btn px-3" id="boundToUkraine">${locateFixed.outerHTML}</button>
      </div>
    </div>
      `;
}

export class MapPage implements CommonPage {
  private map?: Map;
  private readonly ukraineBounds = [
    [22.137158, 44.386464], // Південно-західний кут (SW)
    [40.22758, 52.379581], // Північно-східний кут (NE)
  ] as LngLatBoundsLike;
  private tb!: Threebox;
  private model: LoadGLTFOptions | undefined;
  constructor() {
    this.onRenderMap();
    this.onAddThreeWorld();
  }

  onAddThreeWorld() {
    if (!this.map) return;
    const context = this.map.getCanvas().getContext("webgl2");
    if (!context) return;
    this.tb = window.tb = new Threebox(this.map, context, {
      defaultLights: true,
      enableDraggingObjects: true,
      enableSelectingObjects: true,
      enableRotatingObjects: true,
      enableTooltips: true,
      enablePicking: true,
    });
    this.onAddModel();
  }

  onAddModel() {
    if (!this.map) return;
    this.map.on("style.load", () => {
      if (!this.map) return;
      this.map.addLayer({
        id: "custom-threebox-model",
        type: "custom",
        renderingMode: "3d",
        render: () => {
          this.tb.update();
        },
      });
    });

    const scale = 300.2;
    const options = {
      obj: "https://docs.mapbox.com/mapbox-gl-js/assets/metlife-building.gltf",
      type: "gltf",
      scale: { x: scale, y: scale, z: scale },
      units: "meters",
      rotation: { x: 90, y: -90, z: 0 },
    };

    this.map.on("click", (e) => {
      this.tb.loadObj(options as any, (model) => {
        model.setCoords([e.lngLat.lng, e.lngLat.lat]);
        model.setRotation({ x: 0, y: 0, z: 241 });
        this.tb.add(model);
      });
    });

    this.tb.loadObj(options as any, (model) => {
      model.setCoords([0, 0]);
      model.setRotation({ x: 0, y: 0, z: 241 });
      model.wireframe = true;
      model.traverse((child: any) => {
        if (child.isMesh) {
          child.material.color.set(0x00ff00);
        }
      });
      this.model = model;
      this.tb.add(model);
    });

    this.map.on("mousemove", (e) => {
      if (!this.model) return;
      this.model.setCoords([e.lngLat.lng, e.lngLat.lat]);
    });
  }

  onRenderMap() {
    this.map = new HillelMap("map", MAP_STYLES.own).map;
    this.fitBounds();
    this.onRepositionMap();
    this.addUkrainePolygon();
  }

  onRepositionMap() {
    document.getElementById("boundToUkraine")?.addEventListener("click", () => {
      this.fitBounds();
    });
  }

  fitBounds() {
    if (!this.map) return;
    this.map.fitBounds(
      this.ukraineBounds,
      {
        padding: 20, // Додайте відступ, щоб мати деякий простір навколо меж
      },
      { duration: 5000 }
    );
  }

  addUkrainePolygon() {
    if (!this.map) return;
    this.map.on("load", () => {
      if (!this.map) return;
      // Додати джерело для контура України
      this.map.addSource(MapSource.ukraine, {
        type: "geojson",
        data: ukraineGeoJSON as GeoJSON.FeatureCollection,
      });
      // Додати шар для контура України
      this.map.addLayer(UKRAIN_LINE_LAYER);
    });
  }

  onDestroy() {
    this.map?.remove();
  }
}
