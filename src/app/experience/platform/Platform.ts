import {InstancedMesh, Mesh, Object3D, type Object3DEventMap} from "three";
import {App} from "../../App.ts";

export class Platform {
    platform: Object3D<Object3DEventMap>
    app: App;
    dummy: Object3D<Object3DEventMap>;

    constructor() {
        this.app = App.getInstance()
        this.platform = new Mesh()
        this.dummy = new Object3D();
        this.createPlatform()
        this.testMesh()
    }

    createPlatform() {
        this.app.scene?.traverse(object => {
            if (object.name === "PLATFORM_MAIN") {
                this.platform = object
                this.platform.position.set(0, 0, 0);
                this.platform.visible = false;
            }
        })
    }

    testMesh() {
        const geometry = this.platform.geometry;
        const material = this.platform.material;

        // Создаем InstancedMesh для 3 элементов (родитель + 2 дополнительных)
        const mesh = new InstancedMesh(geometry, material, 3);
        this.app.scene.add(mesh);

        // Получаем позицию родительского элемента
        const parentPosition = this.platform.position;
        const radius = 0.0001; // Радиус круга для дополнительных элементов

        // Получаем масштаб родителя из его матрицы
        const originalScale = 1;

        for (let i = 0; i < 3; i++) {

            const angle = ((i + 3) / 3) * Math.PI * 2;

            const x = parentPosition.x + Math.cos(angle) * radius;
            const z = parentPosition.z + Math.sin(angle) * radius;

            this.dummy.position.set(x, parentPosition.y, z);
            this.dummy.lookAt(parentPosition.x, parentPosition.y, parentPosition.z);
            this.dummy.scale.set(originalScale, originalScale, originalScale);

            this.dummy.rotateY(0.54)
            this.dummy.scale.set(1.2, 1.2, 1.2)
            this.dummy.updateMatrix();
            mesh.setMatrixAt(i, this.dummy.matrix);
        }

        mesh.instanceMatrix.needsUpdate = true;


    }
}