import {
    BoxGeometry,
    BufferGeometry,
    CatmullRomCurve3,
    Line,
    LineBasicMaterial,
    Mesh,
    MeshBasicMaterial,
    type Object3DEventMap,
    Vector3
} from "three";
import {App} from "../../App.ts";
import {DEFAULT_LOCOMOTIVE_COORDS, LOCATIONS_COORDS, LOCATIONS_NAMES} from "./constants.ts";

export class Train {
    box: Mesh<BoxGeometry, MeshBasicMaterial, Object3DEventMap> | undefined;
    app: App;
    place1mesh: Mesh;
    place2mesh: Mesh;
    place3mesh: Mesh;
    place4mesh: Mesh;
    trainMesh: Mesh;
    points: Vector3[];
    path: CatmullRomCurve3;
    isPathClosed: boolean;
    pathObject: Line<BufferGeometry, LineBasicMaterial> | null;
    activeDot: string;
    coordsPair: string[];

    constructor() {
        this.app = App.getInstance()
        this.app.ticker.subscribe(this.update.bind(this));
        this.place1mesh = new Mesh()
        this.place2mesh = new Mesh()
        this.place3mesh = new Mesh()
        this.place4mesh = new Mesh()

        this.pathObject = new Line()

        this.trainMesh = new Mesh()
        this.isPathClosed = false

        this.activeDot = LOCATIONS_NAMES.white
        this.coordsPair = [LOCATIONS_NAMES.white]

        this.points = DEFAULT_LOCOMOTIVE_COORDS

        this.path = new CatmullRomCurve3()

        this.createBox()
        this.createLocations()
    }

    checkCoords(from: string, to: string) {
        return this.coordsPair.includes(from) && this.coordsPair.includes(to)
    }

    createLocations() {
        LOCATIONS_COORDS.forEach(coord => {
            const geometry = new BoxGeometry(1, 1, 1);
            const material = new MeshBasicMaterial({color: coord.name});
            this.box = new Mesh(geometry, material);
            this.box.position.set(coord.x, coord.y, coord.z);
            this.box.scale.set(1, 1, 1)

            this.app.scene.add(this.box);

            this.app.events.onClick(this.box, () => {

                this.activeDot = coord.name

                // Если в массиве более одной координаты
                // удаляем первую, чтобы всегда был актуальный маршрут
                if (this.coordsPair.length > 1) {
                    this.coordsPair.splice(0, 1)
                }

                // При повторном клике на локацию - игнорируем действие
                if (this.coordsPair[this.coordsPair.length - 1] !== this.activeDot) {
                    this.coordsPair.push(this.activeDot)

                    const isFromCenter = this.coordsPair.includes(LOCATIONS_NAMES.white)

                    // В случае если маршрут ИЗ центра
                    if (this.pathObject && isFromCenter) {

                        // TODO вынести в константу
                        if (this.checkCoords("white", "green")) {
                            this.points = [
                                new Vector3(0, 0, 0),
                                new Vector3(-15.5, 0, 9.1),
                            ]
                        }

                        // TODO вынести в константу
                        if (this.checkCoords("white", "red")) {
                            this.points = [
                                new Vector3(0, 0, 0),
                                new Vector3(15.5, 0, 9.1),
                            ]
                        }

                        // TODO вынести в константу
                        if (this.checkCoords("white", "blue")) {
                            this.points = [
                                new Vector3(0, 0, 0),
                                new Vector3(0, 0, -17.8),
                            ]
                        }
                    }

                    // В случае если маршрут не из центра
                    if (this.pathObject && !isFromCenter) {

                        // TODO вынести в константу
                        if (this.checkCoords("red", "green")) {
                            this.points = [
                                new Vector3(-15.5, 0, 9.1),
                                new Vector3(-8.75, 0, 4.55),
                                new Vector3(0, 0, 0),
                                new Vector3(8.75, 0, 4.55),
                                new Vector3(15.5, 0, 9.1),
                            ]
                        }

                        // TODO вынести в константу
                        if (this.checkCoords("blue", "red")) {
                            this.points = [
                                new Vector3(0, 0, -17.8),
                                new Vector3(0, 0, 8.9),
                                new Vector3(0, 0, 0),
                                new Vector3(8.75, 0, 4.55),
                                new Vector3(15.5, 0, 9.1),
                            ]
                        }

                        // TODO вынести в константу
                        if (this.checkCoords("green", "blue")) {
                            this.points = [
                                new Vector3(-15.5, 0, 9.1),
                                new Vector3(-8.75, 0, 4.55),
                                new Vector3(0, 0, 0),
                                new Vector3(0, 0, 8.9),
                                new Vector3(0, 0, -17.8),
                            ]
                        }
                    }

                    this.createPath()
                }

                // TODO заменить на callback после заверщения пути
                setTimeout(() => {
                    //@ts-ignore
                    this.app.scene.remove(this.pathObject)
                }, 1000)

            })
        })
    }

    private createPath() {

        // True означает замкнутость пути и добавляет 1 сегмент в путь
        this.path = new CatmullRomCurve3(this.points, this.isPathClosed);

        const pathGeometry = new BufferGeometry().setFromPoints(
            this.path?.getPoints(2)
        );

        const pathMaterial = new LineBasicMaterial({color: 0xff0000});
        this.pathObject = new Line(pathGeometry, pathMaterial);

        this.app.debug?.addFolder("pathRotation").addControls(this.pathObject, "rotation")

        this.app.scene.add(this.pathObject);
    }

    private createBox() {
        const geometry = new BoxGeometry(1, 1, 1);
        const material = new MeshBasicMaterial({color: 0x00ff00});
        this.box = new Mesh(geometry, material);
        this.app.scene.add(this.box);
    }

    private update = () => {
    }

}