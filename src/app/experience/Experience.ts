import {Train} from "./objects/train/Train.ts";
import {World} from "./objects/world/World.ts";

export class Experience {
    world: World;
    train: Train;

    constructor() {
        this.world = new World()
        this.train = new Train()
    }
}
