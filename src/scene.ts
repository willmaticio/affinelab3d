import {
  Scene as ThreeScene,
  PerspectiveCamera,
  WebGLRenderer,
  GridHelper,
  Color,
  AmbientLight,
  DirectionalLight,
  Object3D
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export class Scene {
  private scene: ThreeScene;
  private camera: PerspectiveCamera;
  private renderer: WebGLRenderer;
  private controls: OrbitControls;
  private grid: GridHelper;

  constructor(container: HTMLElement) {
    // Scene setup
    this.scene = new ThreeScene();
    this.scene.background = new Color(0x1a1a1a);

    // Camera setup
    this.camera = new PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    this.camera.position.set(5, 5, 5);
    this.camera.lookAt(0, 0, 0);

    // Renderer setup
    this.renderer = new WebGLRenderer({ antialias: true });
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(this.renderer.domElement);

    // Controls setup
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;

    // Grid setup
    this.grid = new GridHelper(10, 10);
    this.scene.add(this.grid);

    // Lights
    const ambientLight = new AmbientLight(0xffffff, 0.5);
    const directionalLight = new DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(10, 10, 10);
    this.scene.add(ambientLight, directionalLight);

    // Handle window resize
    window.addEventListener('resize', this.onWindowResize.bind(this));
  }

  public add(object: Object3D): void {
    this.scene.add(object);
  }

  public remove(object: Object3D): void {
    this.scene.remove(object);
  }

  public render(): void {
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  public setGridVisible(visible: boolean): void {
    this.grid.visible = visible;
  }

  private onWindowResize(): void {
    const container = this.renderer.domElement.parentElement;
    if (!container) return;

    this.camera.aspect = container.clientWidth / container.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(container.clientWidth, container.clientHeight);
  }
}