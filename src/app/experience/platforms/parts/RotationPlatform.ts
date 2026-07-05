import {Mesh, Object3D, type Object3DEventMap} from "three";
import {App} from "../../../App.ts";

export class RotationPlatform {
    platform: Object3D<Object3DEventMap>
    app: App;
    dummy: Object3D<Object3DEventMap>;

    constructor() {
        this.app = App.getInstance()
        this.platform = new Mesh()
        this.dummy = new Object3D();
        this.createPlatform()
    }

    createPlatform() {
        this.app.scene?.traverse(object => {
            if (object.name === "ROTATION_PLATFORM") {
                this.platform = object
                this.platform.position.set(0, 0, 0);
            }
        })
    }
}