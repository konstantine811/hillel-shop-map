import { OrbitControls } from "three/examples/jsm/Addons.js";
import { CommonPage } from "../CommonPage";
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  PlaneGeometry,
} from "three";

const threeCanvasId = "three-canvas";

export function ThreePageContent() {
  return /*html*/ `
        <div id=${threeCanvasId} class="grow">
        </div>
    `;
}

export class ThreePage implements CommonPage {
  private containerEl!: HTMLDivElement;
  private boundContainer = {
    height: 0,
    width: 0,
  };
  private scene!: Scene;
  private camera!: PerspectiveCamera;
  private renderer!: WebGLRenderer;
  private controls!: OrbitControls;
  private boxMaterial = new MeshBasicMaterial({ color: 0x0202ff });
  private cubes: Mesh[] = [];
  private readonly gridSize = 50;
  private spacing = 2;
  constructor() {
    this.containerEl = document.getElementById(threeCanvasId) as HTMLDivElement;
    const { width, height } = this.containerEl.getBoundingClientRect();
    this.boundContainer.height = height;
    this.boundContainer.width = width;
    this.onInit();
  }

  onInit() {
    this.onInitThree();
    this.addRandomBox();
    this.addPlane();
    this.animate();
    window.addEventListener("resize", this.onWindowResize, false);
  }

  onInitThree() {
    this.scene = new Scene();
    this.camera = new PerspectiveCamera(
      75,
      this.boundContainer.width / this.boundContainer.height,
      0.1,
      1000
    );
    this.renderer = new WebGLRenderer();
    this.renderer.setSize(
      this.boundContainer.width,
      this.boundContainer.height
    );
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.containerEl.appendChild(this.renderer.domElement);
    this.camera.position.z = 5;
  }

  addBox() {
    const geometry = new BoxGeometry(1, 1, 1);
    const cube = new Mesh(geometry, this.boxMaterial);
    return cube;
  }

  addRandomBox() {
    for (let i = 0; i < this.gridSize; i++) {
      for (let j = 0; j < this.gridSize; j++) {
        const geometry = new BoxGeometry(1, 1, 1);
        const cube = new Mesh(geometry, this.boxMaterial);
        cube.position.set(
          i * this.spacing - (this.gridSize * this.spacing) / 2,
          0,
          j * this.spacing - (this.gridSize * this.spacing) / 2
        );
        this.scene.add(cube);
        this.cubes.push(cube);
      }
    }
  }

  addPlane() {
    const geometry = new PlaneGeometry(50, 50);
    const material = new MeshBasicMaterial({ color: 0xf7f7f7 });
    const mesh = new Mesh(geometry, material);
    this.scene.add(mesh);
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.y = -1;
  }

  animate = () => {
    requestAnimationFrame(this.animate);
    this.controls.update();
    const time = Date.now() * 0.002;
    this.cubes.forEach((cube) => {
      const x = cube.position.x;
      const z = cube.position.z;
      cube.position.y = Math.sin(Math.sqrt(x * x + z * z) - time) * 5;
    });

    this.renderer.render(this.scene, this.camera);
  };

  onWindowResize = () => {
    this.camera.aspect = window.innerWidth / window.innerHeight;

    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  };

  onDestroy() {
    window.removeEventListener("resize", this.onWindowResize, false);
  }
}
