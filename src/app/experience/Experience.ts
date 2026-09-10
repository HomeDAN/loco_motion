import {Train} from "./objects/train/Train.ts";
import {World} from "./objects/world/World.ts";

export class Experience {
    constructor() {
        this.init()
    }

    init() {
        new World()
        new Train()

        // new Example()
    }
}
