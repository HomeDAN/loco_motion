import {
    BoxGeometry,
    BufferGeometry,
    CatmullRomCurve3,
    Line,
    LineBasicMaterial,
    Mesh,
    MeshBasicMaterial, Object3D,
    Vector3
} from "three";
import {ThreeApp} from "../../ThreeApp.ts";
import {
    DEFAULT_LOCOMOTIVE_COORDS,
    type LocationNamesTypes,
    LOCATIONS_COORDS,
    LOCATIONS_NAMES,
    PATH_COORDS
} from "./constants.ts";
import gsap from "gsap";

export class Train {
    box: Mesh<BoxGeometry, MeshBasicMaterial> | undefined;
    app: ThreeApp;
    trainMesh: Object3D;
    points: Vector3[];
    path: CatmullRomCurve3;
    isPathClosed: boolean;
    pathObject: Line<BufferGeometry, LineBasicMaterial> | null;
    activeDot: LocationNamesTypes;
    coordsPair: LocationNamesTypes[];

    constructor() {
        this.app = ThreeApp.getInstance()
        this.app.ticker?.subscribe(this.update.bind(this));

        this.pathObject = new Line()

        this.trainMesh = new Mesh()
        this.isPathClosed = false

        this.activeDot = LOCATIONS_NAMES.STATION
        this.coordsPair = [LOCATIONS_NAMES.STATION]

        this.points = DEFAULT_LOCOMOTIVE_COORDS

        this.path = new CatmullRomCurve3()

        this.createLocations()
        this.createTrain()
    }

    checkCoords(from: LocationNamesTypes, to: LocationNamesTypes) {
        return this.coordsPair.includes(from) && this.coordsPair.includes(to)
    }

    createTrain() {
        this.app.scene?.traverse(object => {
            if (object.name === "TRAIN") {
                this.trainMesh = object
                this.trainMesh.position.set(0, 1, 0);
            }
        })
    }

    moveTrain() {
        const progressObj = {t: 0};
        const pathLength = this.path.getLength();
        const speed = 6;
        const duration = pathLength / speed;

        gsap.to(progressObj, {
            t: 1,
            duration: duration,
            ease: "sine.inOut", // Плавное начало и конец
            onUpdate: () => {
                const point = this.path.getPoint(progressObj.t);
                this.trainMesh.position.copy(point);

                // Поворачиваем поезд вдоль пути
                if (progressObj.t > 0 && progressObj.t < 1) {
                    const tangent = this.path.getTangent(progressObj.t);
                    this.trainMesh.quaternion.setFromUnitVectors(
                        new Vector3(0, 0, 1),
                        tangent
                    );
                }
            }
        });
    }

    createLocations() {
        LOCATIONS_COORDS.forEach(coord => {
            const geometry = new BoxGeometry(1, 1, 1);
            const material = new MeshBasicMaterial({color: coord.name});
            this.box = new Mesh(geometry, material);
            this.box.name = coord.name
            this.box.position.set(coord.x, coord.y, coord.z);
            this.box.scale.set(1, 1, 1)
            this.box.visible = false

            this.app.scene?.add(this.box);
        })
    }

    goToLocation(name: LocationNamesTypes) {

        this.activeDot = name

        // Если в массиве более одной координаты
        // удаляем первую, чтобы всегда был актуальный маршрут
        if (this.coordsPair.length > 1) {
            this.coordsPair.splice(0, 1)
        }

        // При повторном клике на локацию - игнорируем действие
        if (this.coordsPair[1] !== this.activeDot) {
            this.coordsPair.push(this.activeDot)

            const includeCenter = this.coordsPair.includes(LOCATIONS_NAMES.STATION)

            const isFromCenter = this.coordsPair[0] === LOCATIONS_NAMES.STATION

            // В случае если маршрут ИЗ или В центр
            if (this.pathObject && includeCenter) {

                if (this.checkCoords(LOCATIONS_NAMES.STATION, LOCATIONS_NAMES.CITY)) {
                    this.points = isFromCenter
                        ? PATH_COORDS.includeCenter.station_city
                        : PATH_COORDS.includeCenter.city_station
                }

                if (this.checkCoords(LOCATIONS_NAMES.STATION, LOCATIONS_NAMES.WATER)) {
                    this.points = isFromCenter
                        ? PATH_COORDS.includeCenter.station_water
                        : PATH_COORDS.includeCenter.water_station
                }

                if (this.checkCoords(LOCATIONS_NAMES.STATION, LOCATIONS_NAMES.ISLAND)) {
                    this.points = isFromCenter
                        ? PATH_COORDS.includeCenter.station_island
                        : PATH_COORDS.includeCenter.island_station
                }
            }

            // В случае если маршрут не из центра
            if (this.pathObject && !includeCenter) {

                const from = this.coordsPair[0]
                const to = this.coordsPair[1]

                if (from === LOCATIONS_NAMES.WATER && to === LOCATIONS_NAMES.CITY) {
                    this.points = PATH_COORDS.withoutCenter.water_city
                }

                if (from === LOCATIONS_NAMES.CITY && to === LOCATIONS_NAMES.WATER) {
                    this.points = PATH_COORDS.withoutCenter.city_water
                }

                if (from === LOCATIONS_NAMES.ISLAND && to === LOCATIONS_NAMES.WATER) {
                    this.points = PATH_COORDS.withoutCenter.island_water
                }

                if (from === LOCATIONS_NAMES.WATER && to === LOCATIONS_NAMES.ISLAND) {
                    this.points = PATH_COORDS.withoutCenter.water_island
                }

                if (from === LOCATIONS_NAMES.CITY && to === LOCATIONS_NAMES.ISLAND) {
                    this.points = PATH_COORDS.withoutCenter.city_island
                }

                if (from === LOCATIONS_NAMES.ISLAND && to === LOCATIONS_NAMES.CITY) {
                    this.points = PATH_COORDS.withoutCenter.island_city
                }
            }

            this.createPath()
            this.moveTrain()
        }
    }

    private createPath() {

        // True означает замкнутость пути и добавляет 1 сегмент в путь
        this.path = new CatmullRomCurve3(this.points, false, "catmullrom", 0.25);

        const pathGeometry = new BufferGeometry().setFromPoints(
            this.path?.getPoints(50)
        );

        const pathMaterial = new LineBasicMaterial({color: 0xff0000, transparent: true, opacity: 0});

        this.pathObject = new Line(pathGeometry, pathMaterial);

        this.app.scene?.add(this.pathObject);
    }

    private update = () => {

        if (this.app.camera.orbitControls.enabled) return

        const trainPos = this.trainMesh.position

        // Изометрическое смещение (пример: 45° по X, ~35° по Y, 45° по Z)
        const offset = new Vector3(20, 20, 20) // подбери под свой масштаб

        // Позиция камеры = позиция поезда + смещение
        this.app.camera.getCamera().position.set(
            trainPos.x + offset.x,
            trainPos.y + offset.y,
            trainPos.z + offset.z
        )

        // Смотрим на поезд (или чуть впереди/выше)
        this.app.camera.getCamera().lookAt(trainPos.x, trainPos.y, trainPos.z)
    }

}