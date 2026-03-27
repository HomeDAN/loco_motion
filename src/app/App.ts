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

export class App {
    scene: THREE.Scene | undefined;
    $dom: Element | null;
    camera: SceneCamera | undefined;
    light: SceneLight | undefined;
    textureLoader: TextureLoader | undefined;
    dracoLoader: DRACOLoader | undefined;
    gltfLoader: GLTFLoader | undefined;
    debug: Debug | null | undefined;
    ticker: Ticker | undefined;
    experience: Experience | undefined;
    render: Render | undefined;
    domElement: HTMLCanvasElement | undefined;
    raycaster: RayCursor | undefined;
    events: EventEmitter | undefined;
    resourcesLoader: ResourcesLoader | undefined;
    static instance: App;

    static getInstance()
    {
        return App.instance
    }

    constructor($dom: Element | null) {
        App.instance = this
        this.$dom = $dom
        this.init().then()
    }

    async init () {
        this.scene = new THREE.Scene();
        this.debug = window.location.href.match('debug-ui') ? new Debug() : null;
        this.render = new Render();
        this.domElement = this.render.getDOMElement()
        this.ticker = new Ticker()

        this.textureLoader = new THREE.TextureLoader();
        this.dracoLoader = new DRACOLoader();
        this.gltfLoader = new GLTFLoader();

        this.camera = new SceneCamera()
        this.light = new SceneLight()

        this.raycaster = new RayCursor()
        this.events = new EventEmitter()

        this.resourcesLoader = new ResourcesLoader()
        await this.resourcesLoader.load()
        this.experience = new Experience()
    }
}