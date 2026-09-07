import {Train} from "./train/Train.ts";
import {World} from "./world/World.ts";

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
