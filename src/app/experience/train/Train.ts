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
import gsap from "gsap";

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

        this.createLocations()
        this.createTrain()

    }

    checkCoords(from: string, to: string) {
        return this.coordsPair.includes(from) && this.coordsPair.includes(to)
    }


    createTrain() {
        const geometry = new BoxGeometry(1, 1, 1);
        const material = new MeshBasicMaterial({color: "orange"});
        this.trainMesh = new Mesh(geometry, material);
        this.trainMesh.position.set(0, 0, 0);
        this.app.scene.add(this.trainMesh);
    }

    moveTrain() {
        const progressObj = { t: 0 };

        gsap.to(progressObj, {
            t: 1,
            duration: .1,
            ease: "linear",
            onUpdate: () => {
                // Получаем точку на кривой по прогрессу
                const point = this.path.getPoint(progressObj.t);
                this.trainMesh.position.copy(point);
            },
            onComplete: () => {
                console.log("Поезд прибыл в пункт назначения");
            }
        });

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
                if (this.coordsPair[1] !== this.activeDot) {
                    this.coordsPair.push(this.activeDot)

                    const includeCenter = this.coordsPair.includes(LOCATIONS_NAMES.white)

                    const isFromCenter = this.coordsPair[0] === LOCATIONS_NAMES.white

                    // В случае если маршрут ИЗ или В центр
                    if (this.pathObject && includeCenter) {

                        if (this.checkCoords(LOCATIONS_NAMES.white, LOCATIONS_NAMES.green)) {
                            this.points = isFromCenter
                                ? PATH_COORDS.includeCenter.white_green
                                : PATH_COORDS.includeCenter.green_white
                        }

                        if (this.checkCoords(LOCATIONS_NAMES.white, LOCATIONS_NAMES.red)) {
                            this.points = isFromCenter
                                ? PATH_COORDS.includeCenter.white_red
                                : PATH_COORDS.includeCenter.red_white
                        }

                        if (this.checkCoords(LOCATIONS_NAMES.white, LOCATIONS_NAMES.blue)) {
                            this.points = isFromCenter
                                ? PATH_COORDS.includeCenter.white_blue
                                : PATH_COORDS.includeCenter.blue_white
                        }
                    }

                    // В случае если маршрут не из центра
                    if (this.pathObject && !includeCenter) {

                        const from = this.coordsPair[0]
                        const to = this.coordsPair[1]

                        if (from === LOCATIONS_NAMES.red && to === LOCATIONS_NAMES.green) {
                            this.points = PATH_COORDS.withoutCenter.red_green
                        }

                        if (from === LOCATIONS_NAMES.green && to === LOCATIONS_NAMES.red) {
                            this.points = PATH_COORDS.withoutCenter.green_red
                        }

                        if (from === LOCATIONS_NAMES.blue && to === LOCATIONS_NAMES.red) {
                            this.points = PATH_COORDS.withoutCenter.blue_red
                        }

                        if (from === LOCATIONS_NAMES.red && to === LOCATIONS_NAMES.blue) {
                            this.points = PATH_COORDS.withoutCenter.red_blue
                        }

                        if (from === LOCATIONS_NAMES.green && to === LOCATIONS_NAMES.blue) {
                            this.points = PATH_COORDS.withoutCenter.green_blue
                        }

                        if (from === LOCATIONS_NAMES.blue && to === LOCATIONS_NAMES.green) {
                            this.points = PATH_COORDS.withoutCenter.blue_green
                        }
                    }

                    this.createPath()
                    this.moveTrain()
                }

                // TODO заменить на callback после заверщения пути
                // setTimeout(() => {
                //     //@ts-ignore
                //     this.app.scene.remove(this.pathObject)
                // }, 1000)

            })
        })
    }

    private createPath() {

        // True означает замкнутость пути и добавляет 1 сегмент в путь
        this.path = new CatmullRomCurve3(this.points, this.isPathClosed);

        const pathGeometry = new BufferGeometry().setFromPoints(
            this.path?.getPoints(50)
        );

        const pathMaterial = new LineBasicMaterial({color: 0xff0000});
        this.pathObject = new Line(pathGeometry, pathMaterial);

        this.app.debug?.addFolder("pathRotation").addControls(this.pathObject, "rotation")

        this.app.scene.add(this.pathObject);
    }

    private update = () => {
    }

}