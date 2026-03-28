import {App} from "../App.ts";
import {DRACOLoader} from 'three/addons/loaders/DRACOLoader.js'
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import * as THREE from 'three';

type LoadingProgress = {
    modelName: string;
    status: 'pending' | 'loading' | 'completed' | 'error';
    progress?: number;
    error?: string;
};

export class ResourcesLoader {
    app: App;
    loadingStatus: Map<string, LoadingProgress>;
    onProgressCallback?: (progress: LoadingProgress) => void;
    onCompleteCallback?: (results: any) => void;
    loader: any;
    gltfLoader: any;

    constructor() {
        this.app = App.getInstance()
        this.loadingStatus = new Map()

        this.loader = new DRACOLoader()
        this.loader.setDecoderPath('./draco/')
        this.loader.preload()

        this.gltfLoader = new GLTFLoader();
        this.gltfLoader.setDRACOLoader(this.loader);
    }

    private updateStatus(modelName: string, status: LoadingProgress) {
        this.loadingStatus.set(modelName, status);

        if (this.onProgressCallback) {
            this.onProgressCallback(status);
        }
    }

    async load(models: { name: string, path: string }[]) {
        console.log('🚀 Loading models...');

        models.forEach(model => {
            this.updateStatus(model.name, {
                modelName: model.name,
                status: 'pending'
            });
        });

        const results = await Promise.all(this.loadCycle(models));

        const successfulModels = results?.filter(model => model !== null) as unknown as THREE.Group[];

        const failedModels = models.filter((_, index) => results[index] === null);

        const finalResult = {
            successful: successfulModels,
            failed: failedModels,
            total: models.length,
            successCount: successfulModels.length,
            failedCount: failedModels.length
        };

        console.log('📊 RESULTS:');
        console.log(`  ✅ Success: ${finalResult.successCount}/${finalResult.total}`);
        console.log(`  ❌ Errors: ${finalResult.failedCount}/${finalResult.total}`);

        if (failedModels.length > 0) {
            console.log('  ❌ model errors:');
            failedModels.forEach(failed => {
                const status = this.loadingStatus.get(failed.name);
                console.log(`   ⚠️ ${failed.name}: ${status?.error || 'unknown error'}`);
            });
        }

        if (this.onCompleteCallback) {
            this.onCompleteCallback(finalResult);
        }

        return finalResult;
    }

    loadCycle(models: { name: string, path: string }[]) {
        return  models.map(async (item) => {
            this.updateStatus(item.name, {
                modelName: item.name,
                status: 'loading',
                progress: 0
            });

            return new Promise<THREE.Group>((resolve) => {
                this.gltfLoader.load(
                    item.path,
                    (gltf: any) => {
                        const model = gltf.scene;
                        model.name = item.name;
                        this.app.scene?.add(model);

                        this.updateStatus(item.name, {
                            modelName: item.name,
                            status: 'completed',
                            progress: 100
                        });

                        resolve(model);
                    },
                    (progress: any) => {
                        if (progress.lengthComputable) {
                            const percent = (progress.loaded / progress.total) * 100;
                            this.updateStatus(item.name, {
                                modelName: item.name,
                                status: 'loading',
                                progress: percent
                            });
                        }
                    },
                    (error: any) => {
                        console.error(`❌ Loading errors ${item.name}:`, error);

                        this.updateStatus(item.name, {
                            modelName: item.name,
                            status: 'error',
                            error: error?.message || 'unknown error'
                        });

                        resolve(null as any);
                    }
                );
            });
        });
    }
}