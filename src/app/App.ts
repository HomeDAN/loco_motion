import * as THREE from 'three';
import {TextureLoader} from 'three';
import {SceneCamera} from "./settings/SceneCamera.ts";
import {SceneLight} from "./settings/SceneLight.ts";
import {DRACOLoader} from 'three/addons/loaders/DRACOLoader.js';
import {GLTFLoader} from "three/addons/loaders/GLTFLoader.js";

import {Debug} from "./settings/Debug.ts";
import {Ticker} from "./settings/Ticker.ts";
import {Experience} from "./experience/Experience.ts";
import {Render} from "./settings/Render.ts";
import {RayCursor} from "./settings/RayCursor.ts";
import {EventEmitter} from "./settings/EventEmitter.ts";
import {ResourcesLoader} from "./settings/ResourcesLoader.ts";
import {MODELS} from "./models.ts";
import {Viewport} from "./settings/Viewport.ts";

export class App {
    scene: THREE.Scene;
    $dom: Element | null;
    camera: SceneCamera;
    light: SceneLight;
    textureLoader: TextureLoader;
    dracoLoader: DRACOLoader;
    gltfLoader: GLTFLoader;
    debug: Debug | null;
    ticker: Ticker;
    experience: Experience;
    render: Render;
    domElement: HTMLCanvasElement;
    raycaster: RayCursor;
    events: EventEmitter;
    resourcesLoader: ResourcesLoader;
    viewport: Viewport;
    static instance: App;

    static getInstance() {
        return App.instance
    }

    constructor($dom: Element | null) {
        App.instance = this
        this.$dom = $dom
        this.init().then()
    }

    async init() {
        this.scene = new THREE.Scene();
        this.debug = window.location.href.match('debug-ui') ? new Debug() : null;
        this.render = new Render();
        this.domElement = this.render.getDOMElement()
        this.viewport = new Viewport()
        this.ticker = new Ticker()

        this.textureLoader = new THREE.TextureLoader();
        this.dracoLoader = new DRACOLoader();
        this.gltfLoader = new GLTFLoader();

        this.camera = new SceneCamera()
        this.light = new SceneLight()

        this.raycaster = new RayCursor()
        this.events = new EventEmitter()

        this.resourcesLoader = new ResourcesLoader()
        await this.resourcesLoader.load(MODELS)

        this.experience = new Experience()
    }
}