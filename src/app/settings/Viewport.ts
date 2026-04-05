import {App} from "../App.ts";

export class Viewport {
    private readonly app: App;

    constructor() {
        this.app = App.getInstance()
        this.init()
    }

    init(): void {
        window.addEventListener('resize', () => {
            const camera = this.app.camera.getCamera()
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix();

            const renderer = this.app.render.renderer
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.render(this.app.scene, this.app.camera.getCamera());
        })
    }
}