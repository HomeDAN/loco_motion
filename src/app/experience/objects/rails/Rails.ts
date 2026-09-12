import {Mesh, Object3D, type Object3DEventMap} from "three";
import {ThreeApp} from "../../ThreeApp.ts";

export class Rails {
    platform: Object3D<Object3DEventMap>
    app: ThreeApp;
    dummy: Object3D<Object3DEventMap>;

    constructor() {
        this.app = ThreeApp.getInstance()
        this.platform = new Mesh()
        this.dummy = new Object3D();
        this.createPlatform()
    }

    createPlatform() {
        this.app.scene?.traverse(object => {
            if (object.name === "RAILS") {
                this.platform = object
                this.platform.position.set(0, 0, 0);
            }
        })
    }
}