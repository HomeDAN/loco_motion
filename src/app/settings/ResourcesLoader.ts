import {App} from "../App.ts";
import {DRACOLoader} from 'three/addons/loaders/DRACOLoader.js'

import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';

export class ResourcesLoader {
    app: App;
    loaders: Map<any, any>;

    constructor() {
        this.app = App.getInstance()
        this.loaders = new Map()
    }

    load() {

        return new Promise((resolve) => {
            let loader

            loader = new DRACOLoader()
            loader.setDecoderPath('./draco/')
            loader.preload()

            const gltfLoader = new GLTFLoader();
            gltfLoader.setDRACOLoader(loader);


            gltfLoader.load(
                "./models/train.glb",
                (gltf) => {
                    // Успешная загрузка
                    // Получаем корневую модель
                    const model = gltf.scene;

                    // Устанавливаем имя для всей модели
                    model.name = "TRAIN123";

                    // // Или можно пройтись по всем детям и установить имена
                    // model.traverse((child) => {
                    //     if (child instanceof Mesh) {
                    //         child.name = "TRAIN";
                    //     }
                    // });

                    // Сохраняем ссылку
                    // this.trainModel = model;

                    // Добавляем в сцену
                    this.app.scene.add(model);
                    resolve(model);
                },
            );
        })

    }
}