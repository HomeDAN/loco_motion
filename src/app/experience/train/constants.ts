import {Vector3} from "three";

export const LOCATIONS_NAMES = {
    green: 'green',
    blue: 'blue',
    red: 'red',
    white: 'white',
}

/**
 * Locations coords on scene
 * */
export const LOCATIONS_COORDS = [
    {x: -15.5, y: 0, z: 9.1, name: LOCATIONS_NAMES.green},
    {x: 0, y: 0, z: -17.8, name: LOCATIONS_NAMES.blue},
    {x: 15.5, y: 0, z: 9.1, name: LOCATIONS_NAMES.red},
    {x: 0, y: 0, z: 0, name: LOCATIONS_NAMES.white},
]

/**
 * Start locomotive position
 * */
export const DEFAULT_LOCOMOTIVE_COORDS = [new Vector3(0, 0, 0), new Vector3(0, 0, 0)]

/**
 * Path coords include center and without center
 * */
export const PATH_COORDS = {
    includeCenter: {
        white_green: [new Vector3(0, 0, 0), new Vector3(-15.5, 0, 9.1)],
        white_red: [new Vector3(0, 0, 0), new Vector3(15.5, 0, 9.1)],
        white_blue: [new Vector3(0, 0, 0), new Vector3(0, 0, -17.8)],
    },

    withoutCenter: {
        red_green: [
            new Vector3(-15.5, 0, 9.1),
            new Vector3(-8.75, 0, 4.55),
            new Vector3(0, 0, 0),
            new Vector3(8.75, 0, 4.55),
            new Vector3(15.5, 0, 9.1)
        ],
        blue_red: [
            new Vector3(0, 0, -17.8),
            new Vector3(0, 0, 8.9),
            new Vector3(0, 0, 0),
            new Vector3(8.75, 0, 4.55),
            new Vector3(15.5, 0, 9.1),
        ],
        green_blue: [
            new Vector3(-15.5, 0, 9.1),
            new Vector3(-8.75, 0, 4.55),
            new Vector3(0, 0, 0),
            new Vector3(0, 0, 8.9),
            new Vector3(0, 0, -17.8),
        ]
    }
}