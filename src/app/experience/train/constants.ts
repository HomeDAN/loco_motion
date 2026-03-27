import {Vector3} from "three";

export const LOCATIONS_NAMES = {
    green: 'green',
    blue: 'blue',
    red: 'red',
    white: 'white',
}

const scaleTriangleCoordinates = (scaleValue: number) => {
    const factor = scaleValue / 30;
    return {
        green: {x: -25.98 * factor, y: 0, z: -15 * factor},
        blue: {x: 0, y: 0, z: 30 * factor},
        red: {x: 25.95 * factor, y: 0, z: -15 * factor},
        white: {x: 0, y: 0, z: 0}
    };
};

const COORDS_VALUES = scaleTriangleCoordinates(30)

const CURVE_COORDS = scaleTriangleCoordinates(5)

/**
 * Locations coords on scene
 * */
export const LOCATIONS_COORDS = [
    {x: COORDS_VALUES.green.x, y: COORDS_VALUES.green.y, z: COORDS_VALUES.green.z, name: LOCATIONS_NAMES.green},
    {x: COORDS_VALUES.blue.x, y: COORDS_VALUES.blue.y, z: COORDS_VALUES.blue.z, name: LOCATIONS_NAMES.blue},
    {x: COORDS_VALUES.red.x, y: COORDS_VALUES.red.y, z: COORDS_VALUES.red.z, name: LOCATIONS_NAMES.red},

    {x: COORDS_VALUES.white.x, y: COORDS_VALUES.white.y, z: COORDS_VALUES.white.z, name: LOCATIONS_NAMES.white},
]

export const HELPER_CURVE_COORDS = [
    {x: CURVE_COORDS.green.x, y: CURVE_COORDS.green.y, z: CURVE_COORDS.green.z, name: "pink", },    // GREEN
    {x: CURVE_COORDS.blue.x, y: CURVE_COORDS.blue.y, z: CURVE_COORDS.blue.z, name: "pink"},        // BLUE
    {x: CURVE_COORDS.red.x, y: CURVE_COORDS.red.y, z: CURVE_COORDS.red.z, name: "pink"},            // RED
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
            new Vector3(CURVE_COORDS.red.x, CURVE_COORDS.red.y, CURVE_COORDS.red.z),

            new Vector3(CURVE_COORDS.green.x, CURVE_COORDS.green.y, CURVE_COORDS.green.z),
            new Vector3(COORDS_VALUES.green.x, COORDS_VALUES.green.y, COORDS_VALUES.green.z),
        ],

        green_red: [
            new Vector3(COORDS_VALUES.green.x, COORDS_VALUES.green.y, COORDS_VALUES.green.z),
            new Vector3(CURVE_COORDS.green.x, CURVE_COORDS.green.y, CURVE_COORDS.green.z),

            new Vector3(CURVE_COORDS.red.x, CURVE_COORDS.red.y, CURVE_COORDS.red.z),
            new Vector3(COORDS_VALUES.red.x, COORDS_VALUES.red.y, COORDS_VALUES.red.z),
        ],

        blue_red: [
            new Vector3(COORDS_VALUES.blue.x, COORDS_VALUES.blue.y, COORDS_VALUES.blue.z),
            new Vector3(CURVE_COORDS.blue.x, CURVE_COORDS.blue.y, CURVE_COORDS.blue.z),

            new Vector3(CURVE_COORDS.red.x, CURVE_COORDS.red.y, CURVE_COORDS.red.z),
            new Vector3(COORDS_VALUES.red.x, COORDS_VALUES.red.y, COORDS_VALUES.red.z),
        ],

        red_blue: [
            new Vector3(COORDS_VALUES.red.x, COORDS_VALUES.red.y, COORDS_VALUES.red.z),
            new Vector3(CURVE_COORDS.red.x, CURVE_COORDS.red.y, CURVE_COORDS.red.z),

            new Vector3(CURVE_COORDS.blue.x, CURVE_COORDS.blue.y, CURVE_COORDS.blue.z),
            new Vector3(COORDS_VALUES.blue.x, COORDS_VALUES.blue.y, COORDS_VALUES.blue.z),
        ],

        green_blue: [
            new Vector3(COORDS_VALUES.green.x, COORDS_VALUES.green.y, COORDS_VALUES.green.z),
            new Vector3(CURVE_COORDS.green.x, CURVE_COORDS.green.y, CURVE_COORDS.green.z),

            new Vector3(CURVE_COORDS.blue.x, CURVE_COORDS.blue.y, CURVE_COORDS.blue.z),
            new Vector3(COORDS_VALUES.blue.x, COORDS_VALUES.blue.y, COORDS_VALUES.blue.z),
        ],

        blue_green: [
            new Vector3(COORDS_VALUES.blue.x, COORDS_VALUES.blue.y, COORDS_VALUES.blue.z),
            new Vector3(CURVE_COORDS.blue.x, CURVE_COORDS.blue.y, CURVE_COORDS.blue.z),

            new Vector3(CURVE_COORDS.green.x, CURVE_COORDS.green.y, CURVE_COORDS.green.z),
            new Vector3(COORDS_VALUES.green.x, COORDS_VALUES.green.y, COORDS_VALUES.green.z),
        ]
    }
}