import {Vector3} from "three";

export const LOCATIONS_NAMES = {
    green: 'green',
    blue: 'blue',
    red: 'red',
    white: 'white',
}

const COORDS_VALUES = {
    green: {x: -25.98, y: 0, z: -15},
    blue: {x: 0, y: 0, z: 30},
    red: {x: 25.95, y: 0, z: -15},
    white: {x: 0, y: 0, z: 0},
}

const HELPERS_COORDS_VALUES = {
    green: {x: -8.66, y: 0, z: -5},
    blue: {x: 0, y: 0, z: 10},
    red: {x: 8.66, y: 0, z: -5},
    white: {x: 0, y: 0, z: 0},
}

const HELPERS_COORDS_VALUES_NEAR_TO_LOCATION = {
    green: {x: -10.392, y: 0, z: -6},
    blue: {x: 0, y: 0, z: 12},
    red: {x: 10.392, y: 0, z: -6},
    white: {x: 0, y: 0, z: 0},
}


/**
 * Locations coords on scene
 * */
export const LOCATIONS_COORDS = [
    {x: COORDS_VALUES.green.x, y: COORDS_VALUES.green.y, z: COORDS_VALUES.green.z, name: LOCATIONS_NAMES.green},
    {x: COORDS_VALUES.blue.x, y: COORDS_VALUES.blue.y, z: COORDS_VALUES.blue.z, name: LOCATIONS_NAMES.blue},
    {x: COORDS_VALUES.red.x, y: COORDS_VALUES.red.y, z: COORDS_VALUES.red.z, name: LOCATIONS_NAMES.red},

    {x: COORDS_VALUES.white.x, y: COORDS_VALUES.white.y, z: COORDS_VALUES.white.z, name: LOCATIONS_NAMES.white},
]


export const HELPER_LOCATIONS_COORDS = [
    {x: HELPERS_COORDS_VALUES.green.x, y: HELPERS_COORDS_VALUES.green.y, z: HELPERS_COORDS_VALUES.green.z, name: "pink", },    // GREEN
    {x: HELPERS_COORDS_VALUES.blue.x, y: HELPERS_COORDS_VALUES.blue.y, z: HELPERS_COORDS_VALUES.blue.z, name: "pink"},        // BLUE
    {x: HELPERS_COORDS_VALUES.red.x, y: HELPERS_COORDS_VALUES.red.y, z: HELPERS_COORDS_VALUES.red.z, name: "pink"},       // RED
]

export const HELPER_LOCATIONS_COORDS_NEAR_TO_LOCATION = [
    {x: HELPERS_COORDS_VALUES_NEAR_TO_LOCATION.green.x, y: HELPERS_COORDS_VALUES_NEAR_TO_LOCATION.green.y, z: HELPERS_COORDS_VALUES_NEAR_TO_LOCATION.green.z, name: "pink", },    // GREEN
    {x: HELPERS_COORDS_VALUES_NEAR_TO_LOCATION.blue.x, y: HELPERS_COORDS_VALUES_NEAR_TO_LOCATION.blue.y, z: HELPERS_COORDS_VALUES_NEAR_TO_LOCATION.blue.z, name: "pink"},        // BLUE
    {x: HELPERS_COORDS_VALUES_NEAR_TO_LOCATION.red.x, y: HELPERS_COORDS_VALUES_NEAR_TO_LOCATION.red.y, z: HELPERS_COORDS_VALUES_NEAR_TO_LOCATION.red.z, name: "pink"},       // RED
]

/**
 * Start locomotive position
 * */
export const DEFAULT_LOCOMOTIVE_COORDS = [
    new Vector3(COORDS_VALUES.white.x, COORDS_VALUES.white.y, COORDS_VALUES.white.z),
    new Vector3(COORDS_VALUES.white.x, COORDS_VALUES.white.y, COORDS_VALUES.white.z)
]



/**
 * Path coords include center and without center
 * */
export const PATH_COORDS = {
    includeCenter: {
        // WHITE - GREEN - WHITE
        white_green: [
            new Vector3(COORDS_VALUES.white.x, COORDS_VALUES.white.y, COORDS_VALUES.white.z),
            new Vector3(COORDS_VALUES.green.x, COORDS_VALUES.green.y, COORDS_VALUES.green.z)
        ],
        green_white: [
            new Vector3(COORDS_VALUES.green.x, COORDS_VALUES.green.y, COORDS_VALUES.green.z),
            new Vector3(COORDS_VALUES.white.x, COORDS_VALUES.white.y, COORDS_VALUES.white.z),
        ],

        // WHITE - RED - WHITE
        white_red: [
            new Vector3(COORDS_VALUES.white.x, COORDS_VALUES.white.y, COORDS_VALUES.white.z),
            new Vector3(COORDS_VALUES.red.x, COORDS_VALUES.red.y, COORDS_VALUES.red.z),
        ],

        red_white: [
            new Vector3(COORDS_VALUES.red.x, COORDS_VALUES.red.y, COORDS_VALUES.red.z),
            new Vector3(COORDS_VALUES.white.x, COORDS_VALUES.white.y, COORDS_VALUES.white.z),
        ],

        // WHITE - BLUE - WHITE
        white_blue: [
            new Vector3(COORDS_VALUES.white.x, COORDS_VALUES.white.y, COORDS_VALUES.white.z),
            new Vector3(COORDS_VALUES.blue.x, COORDS_VALUES.blue.y, COORDS_VALUES.blue.z),
        ],
        blue_white: [
            new Vector3(COORDS_VALUES.blue.x, COORDS_VALUES.blue.y, COORDS_VALUES.blue.z),
            new Vector3(COORDS_VALUES.white.x, COORDS_VALUES.white.y, COORDS_VALUES.white.z),
        ],
    },

    withoutCenter: {
        red_green: [

            new Vector3(COORDS_VALUES.red.x, COORDS_VALUES.red.y, COORDS_VALUES.red.z),
            new Vector3(HELPERS_COORDS_VALUES_NEAR_TO_LOCATION.red.x, HELPERS_COORDS_VALUES_NEAR_TO_LOCATION.red.y, HELPERS_COORDS_VALUES_NEAR_TO_LOCATION.red.z),

            new Vector3(HELPERS_COORDS_VALUES.red.x, HELPERS_COORDS_VALUES.red.y, HELPERS_COORDS_VALUES.red.z),

            new Vector3(0, 0, -1.5),

            new Vector3(HELPERS_COORDS_VALUES.green.x, HELPERS_COORDS_VALUES.green.y, HELPERS_COORDS_VALUES.green.z),

            new Vector3(HELPERS_COORDS_VALUES_NEAR_TO_LOCATION.green.x, HELPERS_COORDS_VALUES_NEAR_TO_LOCATION.green.y, HELPERS_COORDS_VALUES_NEAR_TO_LOCATION.green.z),
            new Vector3(COORDS_VALUES.green.x, COORDS_VALUES.green.y, COORDS_VALUES.green.z),

        ],

        green_red: [
            new Vector3(COORDS_VALUES.green.x, COORDS_VALUES.green.y, COORDS_VALUES.green.z),
            new Vector3(HELPERS_COORDS_VALUES_NEAR_TO_LOCATION.green.x, HELPERS_COORDS_VALUES_NEAR_TO_LOCATION.green.y, HELPERS_COORDS_VALUES_NEAR_TO_LOCATION.green.z),

            new Vector3(HELPERS_COORDS_VALUES.green.x, HELPERS_COORDS_VALUES.green.y, HELPERS_COORDS_VALUES.green.z),

            new Vector3(0, 0, -1.5),

            new Vector3(HELPERS_COORDS_VALUES.red.x, HELPERS_COORDS_VALUES.red.y, HELPERS_COORDS_VALUES.red.z),

            new Vector3(HELPERS_COORDS_VALUES_NEAR_TO_LOCATION.red.x, HELPERS_COORDS_VALUES_NEAR_TO_LOCATION.red.y, HELPERS_COORDS_VALUES_NEAR_TO_LOCATION.red.z),
            new Vector3(COORDS_VALUES.red.x, COORDS_VALUES.red.y, COORDS_VALUES.red.z),
        ],

        blue_red: [

            new Vector3(COORDS_VALUES.blue.x, COORDS_VALUES.blue.y, COORDS_VALUES.blue.z),
            new Vector3(HELPERS_COORDS_VALUES_NEAR_TO_LOCATION.blue.x, HELPERS_COORDS_VALUES_NEAR_TO_LOCATION.blue.y, HELPERS_COORDS_VALUES_NEAR_TO_LOCATION.blue.z),

            new Vector3(HELPERS_COORDS_VALUES.blue.x, HELPERS_COORDS_VALUES.blue.y, HELPERS_COORDS_VALUES.blue.z),

            new Vector3(1, 0, 1),

            new Vector3(HELPERS_COORDS_VALUES.red.x, HELPERS_COORDS_VALUES.red.y, HELPERS_COORDS_VALUES.red.z),

            new Vector3(HELPERS_COORDS_VALUES_NEAR_TO_LOCATION.red.x, HELPERS_COORDS_VALUES_NEAR_TO_LOCATION.red.y, HELPERS_COORDS_VALUES_NEAR_TO_LOCATION.red.z),
            new Vector3(COORDS_VALUES.red.x, COORDS_VALUES.red.y, COORDS_VALUES.red.z),

        ],

        red_blue: [
            new Vector3(COORDS_VALUES.red.x, COORDS_VALUES.red.y, COORDS_VALUES.red.z),
            new Vector3(HELPERS_COORDS_VALUES_NEAR_TO_LOCATION.red.x, HELPERS_COORDS_VALUES_NEAR_TO_LOCATION.red.y, HELPERS_COORDS_VALUES_NEAR_TO_LOCATION.red.z),

            new Vector3(HELPERS_COORDS_VALUES.red.x, HELPERS_COORDS_VALUES.red.y, HELPERS_COORDS_VALUES.red.z),

            new Vector3(1, 0, 1),

            new Vector3(HELPERS_COORDS_VALUES.blue.x, HELPERS_COORDS_VALUES.blue.y, HELPERS_COORDS_VALUES.blue.z),

            new Vector3(HELPERS_COORDS_VALUES_NEAR_TO_LOCATION.blue.x, HELPERS_COORDS_VALUES_NEAR_TO_LOCATION.blue.y, HELPERS_COORDS_VALUES_NEAR_TO_LOCATION.blue.z),
            new Vector3(COORDS_VALUES.blue.x, COORDS_VALUES.blue.y, COORDS_VALUES.blue.z),
        ],

        green_blue: [

            new Vector3(COORDS_VALUES.green.x, COORDS_VALUES.green.y, COORDS_VALUES.green.z),
            new Vector3(HELPERS_COORDS_VALUES_NEAR_TO_LOCATION.green.x, HELPERS_COORDS_VALUES_NEAR_TO_LOCATION.green.y, HELPERS_COORDS_VALUES_NEAR_TO_LOCATION.green.z),

            new Vector3(HELPERS_COORDS_VALUES.green.x, HELPERS_COORDS_VALUES.green.y, HELPERS_COORDS_VALUES.green.z),

            new Vector3(-1, 0, 1),

            new Vector3(HELPERS_COORDS_VALUES.blue.x, HELPERS_COORDS_VALUES.blue.y, HELPERS_COORDS_VALUES.blue.z),

            new Vector3(HELPERS_COORDS_VALUES_NEAR_TO_LOCATION.blue.x, HELPERS_COORDS_VALUES_NEAR_TO_LOCATION.blue.y, HELPERS_COORDS_VALUES_NEAR_TO_LOCATION.blue.z),
            new Vector3(COORDS_VALUES.blue.x, COORDS_VALUES.blue.y, COORDS_VALUES.blue.z),
        ],

        blue_green: [

            new Vector3(COORDS_VALUES.blue.x, COORDS_VALUES.blue.y, COORDS_VALUES.blue.z),
            new Vector3(HELPERS_COORDS_VALUES_NEAR_TO_LOCATION.blue.x, HELPERS_COORDS_VALUES_NEAR_TO_LOCATION.blue.y, HELPERS_COORDS_VALUES_NEAR_TO_LOCATION.blue.z),

            new Vector3(HELPERS_COORDS_VALUES.blue.x, HELPERS_COORDS_VALUES.blue.y, HELPERS_COORDS_VALUES.blue.z),

            new Vector3(-1, 0, 1),

            new Vector3(HELPERS_COORDS_VALUES.green.x, HELPERS_COORDS_VALUES.green.y, HELPERS_COORDS_VALUES.green.z),

            new Vector3(HELPERS_COORDS_VALUES_NEAR_TO_LOCATION.green.x, HELPERS_COORDS_VALUES_NEAR_TO_LOCATION.green.y, HELPERS_COORDS_VALUES_NEAR_TO_LOCATION.green.z),
            new Vector3(COORDS_VALUES.green.x, COORDS_VALUES.green.y, COORDS_VALUES.green.z),
        ]
    }
}