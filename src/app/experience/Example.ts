import {Mesh, Object3D, type Object3DEventMap, TorusGeometry} from "three";
import {App} from "../App.ts";
import * as THREE from 'three/webgpu'
import {checker, vec2, vec3, uv, time} from "three/tsl";

export class Example {
    platform: Object3D<Object3DEventMap>
    app: App;
    dummy: Object3D<Object3DEventMap>;

    constructor() {
        this.app = App.getInstance()
        this.platform = new Mesh()
        this.dummy = new Object3D();
        this.createTorus()
    }

    createTorus() {

        const geometry = new TorusGeometry( 10, 3, 16, 100 );
        const material = new THREE.MeshStandardNodeMaterial( { color: 0xff0000, metalness: 0.5, roughness: 0.25 } );

        const pattern = checker(
            uv()
                .add(time.mul(0.02))
                .mul(vec2(40, 5))

        )
        material.colorNode = vec3(pattern, 0, 0);

        const torus = new Mesh( geometry, material );
        this.app.scene.add( torus );
    }
}