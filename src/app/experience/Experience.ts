// import {FollowThePath} from "./follow-the-path/FollowThePath.ts";
import {Train} from "./train/Train.ts";
import {Ground} from "./ground/Ground.ts";
import {Platform} from "./platform/Platform.ts";

export class Experience {
    constructor() {
        this.init()
    }

    init() {
        new Ground()
        new Train()
        new Platform()
    }
}
