import { LngLat, Map, MapMouseEvent } from "mapbox-gl";
import { FeatureCollection } from "geojson";
import { LoadGLTFOptions, Threebox } from "threebox-plugin";
import { Component } from "../../pages/common";
import { bounds } from "../../config/common-map.config";
import ukraineGeo from "../../data/ukraine.geo.json";
import { Box3, Raycaster, Vector2 } from "three";
import { IModelAddConfig } from "../../models/map-add-3d.model";
import { MAP_ID, MODEL_ADD_CONFIG } from "../../config/map-add-3d.config";

import { createElement, Box } from "lucide";

const boxIcon = createElement(Box);

export function sideBar() {
  return /*html*/ `
    <aside  id="mapSideBar" class="absolute w-full max-w-40 sidebar justify-start pointer-events-auto h-full overflow-auto">
      <section class="sidebar-title  gap-2 items-center p-4">
          <span>${boxIcon.outerHTML}</span>
          <div class="flex flex-col">
              <span class="text-xs">Add you model</span>
              <span class="text-xs font-normal text-content2">Shop</span>
          </div>
      </section>
      <section class="sidebar-content overflow-visible flex flex-col gap-4">
          ${MODEL_ADD_CONFIG.map((model) => {
            return /*html*/ `
          <button id=${model.id} class="relative">
              <img src=${model.screenPhoto} class="btn  h-20 object-contain" />
             <div class="absolute w-full h-full z-50 top-0 hidden items-center justify-center pointer-events-none">
               <span class="text-white relative z-50">${model.title} is Active</span>
              <div class="absolute w-full h-full bg-black-100/70"></div>
             </div>
          </button>
        `;
          }).join("")}
      </section>
  </aside>
    `;
}

export class MapAdd3d implements Component {
  private map: Map;
  private tb!: Threebox;
  private models: LoadGLTFOptions[] = [];
  private model: LoadGLTFOptions | null = null;
  private raycaster = new Raycaster();
  private mouse = new Vector2();
  private isModelOverlapping = false;
  private isSelected = false;
  private currentAddModel: IModelAddConfig | null = null;
  private prevButtonActive: HTMLButtonElement | null = null;
  private mapEl!: HTMLDivElement | null;
  constructor(map: Map) {
    this.map = map;
    this.initThreebox();
    this.map.on("load", this.handleLoadMap);
    this.restyleSideBar();
    this.onListenAddButton();
  }

  private restyleSideBar() {
    const navHeight = document
      .getElementById("navWrap")
      ?.getBoundingClientRect().height;
    const mapSideBarEl = document.getElementById(
      "mapSideBar"
    ) as HTMLDivElement;
    if (mapSideBarEl) {
      mapSideBarEl.style.top = `${navHeight}px`;
      mapSideBarEl.style.height = `calc(100vh - ${navHeight}px)`;
    }
  }

  private onListenAddButton() {
    MODEL_ADD_CONFIG.forEach((model) => {
      const addButtonEl = document.getElementById(
        model.id
      ) as HTMLButtonElement;
      if (addButtonEl) {
        addButtonEl.addEventListener("click", (e) => {
          if (!this.currentAddModel || this.currentAddModel.id !== model.id) {
            if (this.prevButtonActive) {
              this.prevButtonActive.children[1].classList.remove("flex");
              this.prevButtonActive.children[1].classList.add("hidden");
            }
            addButtonEl.children[1].classList.remove("hidden");
            addButtonEl.children[1].classList.add("flex");
            this.prevButtonActive = addButtonEl;
            this.currentAddModel = model;
            this.onAdd3dModel();
          } else {
            this.currentAddModel = null;
            addButtonEl.children[1].classList.remove("flex");
            addButtonEl.children[1].classList.add("hidden");
          }
        });
      }
    });
  }

  private onAdd3dModel() {
    if (!this.currentAddModel) return;
    this.add3DModel(
      new LngLat(31.1656, 48.3794),
      this.modelOnMoved,
      this.currentAddModel?.threeModel,
      this.currentAddModel.scale
    );
  }

  private initThreebox() {
    // eslint-disable-next-line no-undef
    const webGl = this.map.getCanvas().getContext("webgl2");
    if (!webGl) {
      throw new Error("WebGL is not supported");
    }
    this.tb = window.tb = new Threebox(this.map, webGl, {
      defaultLights: true,
      enablePicking: true,
      enableDraggingObjects: true,
      enableRotatingObjects: true,
      enableSelectingObjects: true,
      enableTooltips: true,
    });
  }

  private handleLoadMap = () => {
    this.map.fitBounds(
      bounds,
      {
        padding: 20,
      },
      { duration: 3000 }
    );
    this.addUkraineLayer();
    this.add3dLayer();
    this.map.on("mousemove", this.handleMouseMove);
    this.map.on("click", this.handleMapClick);
    // Додайте обробник подій для кліку на карту
    this.mapEl = document.getElementById(MAP_ID) as HTMLDivElement;
    this.mapEl.addEventListener("mousemove", this.onRayCastModel);
    this.mapEl.addEventListener("click", this.handleCanvasClick);
  };

  private addUkraineLayer() {
    this.map.addSource("ukraine", {
      type: "geojson",
      data: ukraineGeo as FeatureCollection,
    });
    this.map.addLayer({
      id: "ukraine",
      type: "line",
      source: "ukraine",
      paint: {
        "line-color": "#ff0000",
        "line-width": 1,
        "line-opacity": 0.4,
      },
    });
  }

  private add3dLayer() {
    this.map.addLayer({
      id: "3d-models",
      type: "custom",
      renderingMode: "3d",
      render: () => {
        this.tb.update();
      },
    });
  }

  private handleMouseMove = (e: MapMouseEvent) => {
    if (this.model) {
      this.isModelOverlappingWithOtherModels();
      if (this.isModelOverlapping || this.isSelected || !this.currentAddModel) {
        this.model.visible = false;
      } else {
        this.model.visible = true;
      }
      this.move3DModel(e.lngLat);
    }
  };

  private isModelOverlappingWithOtherModels() {
    if (!this.model) return;
    const box = new Box3().setFromObject(this.model);
    this.isModelOverlapping = this.models.some((model) => {
      return box.intersectsBox(new Box3().setFromObject(model));
    });
  }

  private move3DModel(coords: LngLat) {
    if (this.model) {
      this.model.setCoords([coords.lng, coords.lat]);
    }
  }

  private handleMapClick = (e: MapMouseEvent) => {
    if (this.isModelOverlapping || this.isSelected || !this.currentAddModel)
      return;
    this.add3DModel(
      e.lngLat,
      this.modelOnClicked,
      this.currentAddModel.threeModel,
      this.currentAddModel.scale
    );
  };

  private add3DModel(
    coords: LngLat,
    callback: Function,
    pathToModel: string,
    scale: number
  ) {
    // Опції моделі
    const options = {
      obj: pathToModel,
      type: "gltf",
      scale: { x: scale, y: scale, z: scale },
      units: "meters",
      rotation: { x: 90, y: -90, z: 0 },
    };
    callback(options, coords);
  }

  private modelOnClicked = (options: any, coords: LngLat) => {
    // Завантаження моделі

    this.tb.loadObj(options, (model: LoadGLTFOptions) => {
      model.setCoords([coords.lng, coords.lat]);
      model.setRotation({
        x: 0,
        y: 0,
        z: 0,
      });
      model.updateMatrixWorld(true);
      /*  const helper = new BoxHelper(model, 0xff0000) as LoadGLTFOptions;
      this.tb.add(helper); */
      this.models.push(model);
      this.tb.add(model);
    });
  };

  private modelOnMoved = (options: any, coords: LngLat) => {
    if (this.model) {
      this.tb.remove(this.model);
    }
    this.tb.loadObj(options, (loadedModel: LoadGLTFOptions) => {
      this.model = loadedModel;
      this.model.setCoords([coords.lng, coords.lat]);
      this.model.setRotation({
        x: 0,
        y: 0,
        z: 0,
      });

      this.tb.add(this.model);
      this.model.wireframe = true;
      // Встановлення кольору та непрозорості для моделі
      this.setModelColorAndOpacity(this.model, 0.5, 0xff0000); // 0.5 - непрозорість, 0xff0000 - червоний колір
    });
  };

  private setModelColorAndOpacity(model: any, opacity: number, color: number) {
    model.traverse((child: any) => {
      if (child.isMesh) {
        child.material.transparent = true;
        child.material.opacity = opacity;
        child.material.color.setHex(color);
      }
    });
  }

  private onRayCastModel = (e: MouseEvent) => {
    if (!this.tb.camera) return;
    this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    this.raycaster.setFromCamera(this.mouse, this.tb.camera);
    this.models.some((model) => {
      const intersects = this.raycaster.intersectObject(model, true);
      if (intersects.length > 0) {
        return true;
      } else {
        return false;
      }
    });
  };

  private handleCanvasClick = () => {
    this.isSelected = this.models.some((model) => {
      return model.selected;
    });
  };

  onDestroy() {
    this.map.off("load", this.handleLoadMap);
    this.map.off("click", this.handleMapClick);
    this.map.off("mousemove", this.handleMouseMove);
    if (this.mapEl) {
      this.mapEl.removeEventListener("mousemove", this.onRayCastModel);
      this.mapEl.removeEventListener("click", this.handleCanvasClick);
    }
  }
}
