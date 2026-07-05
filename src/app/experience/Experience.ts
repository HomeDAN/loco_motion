// import {FollowThePath} from "./follow-the-path/FollowThePath.ts";
import {Train} from "./train/Train.ts";
import {Ground} from "./ground/Ground.ts";
import {PlatformMain} from "./platforms/PlatformMain.ts";
import {StaticPortals} from "./platforms/StaticPortals.ts";
import {RotationPlatform} from "./platforms/parts/RotationPlatform.ts";
import {PlatformCyber} from "./platforms/PlatformCyber.ts";
import {PlatformWater} from "./platforms/PlatformWater.ts";
import {PlatformMountain} from "./platforms/PlatformMountain.ts";

export class Experience {
    constructor() {
        this.init()
    }

    init() {
        new Ground()
        new Train()

        // Main Platform
        new PlatformMain()
        new RotationPlatform()

        // Cyber Platform
        new PlatformCyber()

        // Water Platform
        new PlatformWater()

        // Mountain Platform
        new PlatformMountain()

        new StaticPortals()

    }
}
