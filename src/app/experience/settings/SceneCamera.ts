import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {ThreeApp} from "../ThreeApp.ts";

export class SceneCamera {
    camera: THREE.PerspectiveCamera;
    orbitControls: OrbitControls;
    private readonly app: ThreeApp;

    constructor() {

        this.app = ThreeApp.getInstance()

        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.orbitControls = new OrbitControls(this.camera, this.app.domElement);
        this.setCamera()
        this.setCameraGUI()
    }

    private setCameraGUI() {
        this.app.debug?.addFolder("🎥 CAMERA")
            .addControls(this.camera, 'position')
            .addSlider(this.camera, "fov", 1, 100, 75)
            .addSlider(this.camera, "far", 0.1, 100, 100)
            .addSlider(this.camera, "near", 0.1, 100, 0.1);
    }

    setCamera() {
        this.camera.position.set(20, 20, 20);
        this.camera.fov = 28

        this.orbitControls.enabled = !!this.app.debug;
    }

    getCamera() {
        return this.camera;
    }

    updateOrbitControls() {
        return this.orbitControls.update();
    }
}