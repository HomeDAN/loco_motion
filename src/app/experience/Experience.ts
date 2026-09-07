// import {FollowThePath} from "./follow-the-path/FollowThePath.ts";
import {Train} from "./train/Train.ts";
import {Ground} from "./ground/Ground.ts";
import {World} from "./world/World.ts";

export class Experience {
    constructor() {
        this.init()
    }

    init() {
        // new Ground()
        new World()
        new Train()

        // new Example()
    }
}
