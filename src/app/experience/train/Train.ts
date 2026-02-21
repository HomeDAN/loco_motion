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
import {DEFAULT_LOCOMOTIVE_COORDS, LOCATIONS_COORDS, LOCATIONS_NAMES, PATH_COORDS} from "./constants.ts";

export class Train {
    box: Mesh<BoxGeometry, MeshBasicMaterial, Object3DEventMap> | undefined;
    app: App;
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

        this.pathObject = new Line()

        this.trainMesh = new Mesh()
        this.isPathClosed = false

        this.activeDot = LOCATIONS_NAMES.white
        this.coordsPair = [LOCATIONS_NAMES.white]

        this.points = DEFAULT_LOCOMOTIVE_COORDS

        this.path = new CatmullRomCurve3()

        this.createBox()
        this.createLocations()
        this.createTrain()
    }

    checkCoords(from: string, to: string) {
        return this.coordsPair.includes(from) && this.coordsPair.includes(to)
    }

    // TODO
    // Нужно сделать корректно перемещение позиции поезда

    createTrain() {
        const geometry = new BoxGeometry(0.5, 0.5, 0.5);
        const material = new MeshBasicMaterial({color: "orange"});
        this.trainMesh = new Mesh(geometry, material);
        this.trainMesh.position.set(0, 1, 0);
        this.app.scene.add(this.trainMesh);
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

                    const includeCenter = this.coordsPair.includes(LOCATIONS_NAMES.white)

                    // В случае если маршрут ИЗ центра
                    if (this.pathObject && includeCenter) {

                        if (this.checkCoords(LOCATIONS_NAMES.white, LOCATIONS_NAMES.green)) {
                            this.points = PATH_COORDS.includeCenter.white_green
                        }

                        if (this.checkCoords(LOCATIONS_NAMES.white, LOCATIONS_NAMES.red)) {
                            this.points = PATH_COORDS.includeCenter.white_red
                        }

                        if (this.checkCoords(LOCATIONS_NAMES.white, LOCATIONS_NAMES.blue)) {
                            this.points = PATH_COORDS.includeCenter.white_blue
                        }
                    }

                    // В случае если маршрут не из центра
                    if (this.pathObject && !includeCenter) {

                        if (this.checkCoords(LOCATIONS_NAMES.red, LOCATIONS_NAMES.green)) {
                            this.points = PATH_COORDS.withoutCenter.red_green
                        }

                        if (this.checkCoords(LOCATIONS_NAMES.blue, LOCATIONS_NAMES.red)) {
                            this.points = PATH_COORDS.withoutCenter.blue_red
                        }

                        if (this.checkCoords(LOCATIONS_NAMES.green, LOCATIONS_NAMES.blue)) {
                            this.points = PATH_COORDS.withoutCenter.green_blue
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