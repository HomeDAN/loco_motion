import * as THREE from 'three';
import {AmbientLight, DirectionalLight} from 'three';

import {ThreeApp} from "../ThreeApp.ts";

export class SceneLight {
    ambientLight: AmbientLight;
    directionalLight: DirectionalLight;
    private readonly app: ThreeApp;

    constructor() {

        this.app = ThreeApp.getInstance()

        this.ambientLight = new THREE.AmbientLight(0xFFFFFF, 1);
        this.directionalLight = new THREE.DirectionalLight(0xFFFFFF, 5);

        this.setDirectionalLight()
        this.setDirectionalLightGUI()
    }

    setDirectionalLight() {

        this.directionalLight.position.set(0, 10, 0);
        this.directionalLight.target.position.set(5, 0, 0);
        this.directionalLight.castShadow = true;

        this.app.scene.add(this.directionalLight);
        this.app.scene.add(this.directionalLight.target);
    }

    setDirectionalLightGUI() {
        this.app.debug?.addFolder("🔦 DIRECTIONAL LIGHT")
            .addControls(this.directionalLight, "visible", { visible: true })
            .addColor(this.directionalLight, this.directionalLight.color, "color")
            .addSlider(this.directionalLight, "intensity", 0, 5, 0.1)

        this.app.scene.add(this.directionalLight);
    }
}