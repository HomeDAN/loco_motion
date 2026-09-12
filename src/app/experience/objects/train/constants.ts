import {Vector3} from "three";

export const LOCATIONS_NAMES = {
    CITY: 'city',
    ISLAND: 'island',
    WATER: 'water',
    STATION: 'station',
} as const;

export type LocationNamesTypes = typeof LOCATIONS_NAMES[keyof typeof LOCATIONS_NAMES];

const scaleTriangleCoordinates = (scaleValue: number) => {
    const factor = scaleValue / 30;
    return {
        CITY: {x: -25.98 * factor, y: 0, z: -15 * factor},
        ISLAND: {x: 0, y: 0, z: 30 * factor},
        WATER: {x: 25.95 * factor, y: 0, z: -15 * factor},
        STATION: {x: 0, y: 0, z: 0}
    };
};

const COORDS_VALUES = scaleTriangleCoordinates(50)

const CURVE_COORDS = scaleTriangleCoordinates(7)

/**
 * Locations coords on scene
 * */
export const LOCATIONS_COORDS = [
    {x: COORDS_VALUES.CITY.x, y: COORDS_VALUES.CITY.y, z: COORDS_VALUES.CITY.z, name: LOCATIONS_NAMES.CITY},
    {x: COORDS_VALUES.ISLAND.x, y: COORDS_VALUES.ISLAND.y, z: COORDS_VALUES.ISLAND.z, name: LOCATIONS_NAMES.ISLAND},
    {x: COORDS_VALUES.WATER.x, y: COORDS_VALUES.WATER.y, z: COORDS_VALUES.WATER.z, name: LOCATIONS_NAMES.WATER},

    {x: COORDS_VALUES.STATION.x, y: COORDS_VALUES.STATION.y, z: COORDS_VALUES.STATION.z, name: LOCATIONS_NAMES.STATION},
]

/**
 * Start locomotive position
 * */
export const DEFAULT_LOCOMOTIVE_COORDS = [
    new Vector3(COORDS_VALUES.STATION.x, COORDS_VALUES.STATION.y, COORDS_VALUES.STATION.z),
    new Vector3(COORDS_VALUES.STATION.x, COORDS_VALUES.STATION.y, COORDS_VALUES.STATION.z)
]

/**
 * Path coords include center and without center
 * */
export const PATH_COORDS = {
    includeCenter: {
        // WHITE - GREEN - WHITE
        station_city: [
            new Vector3(COORDS_VALUES.STATION.x, COORDS_VALUES.STATION.y, COORDS_VALUES.STATION.z),
            new Vector3(COORDS_VALUES.CITY.x, COORDS_VALUES.CITY.y, COORDS_VALUES.CITY.z)
        ],
        city_station: [
            new Vector3(COORDS_VALUES.CITY.x, COORDS_VALUES.CITY.y, COORDS_VALUES.CITY.z),
            new Vector3(COORDS_VALUES.STATION.x, COORDS_VALUES.STATION.y, COORDS_VALUES.STATION.z),
        ],

        // WHITE - RED - WHITE
        station_water: [
            new Vector3(COORDS_VALUES.STATION.x, COORDS_VALUES.STATION.y, COORDS_VALUES.STATION.z),
            new Vector3(COORDS_VALUES.WATER.x, COORDS_VALUES.WATER.y, COORDS_VALUES.WATER.z),
        ],

        water_station: [
            new Vector3(COORDS_VALUES.WATER.x, COORDS_VALUES.WATER.y, COORDS_VALUES.WATER.z),
            new Vector3(COORDS_VALUES.STATION.x, COORDS_VALUES.STATION.y, COORDS_VALUES.STATION.z),
        ],

        // WHITE - BLUE - WHITE
        station_island: [
            new Vector3(COORDS_VALUES.STATION.x, COORDS_VALUES.STATION.y, COORDS_VALUES.STATION.z),
            new Vector3(COORDS_VALUES.ISLAND.x, COORDS_VALUES.ISLAND.y, COORDS_VALUES.ISLAND.z),
        ],
        island_station: [
            new Vector3(COORDS_VALUES.ISLAND.x, COORDS_VALUES.ISLAND.y, COORDS_VALUES.ISLAND.z),
            new Vector3(COORDS_VALUES.STATION.x, COORDS_VALUES.STATION.y, COORDS_VALUES.STATION.z),
        ],
    },

    withoutCenter: {
        water_city: [
            new Vector3(COORDS_VALUES.WATER.x, COORDS_VALUES.WATER.y, COORDS_VALUES.WATER.z),
            new Vector3(CURVE_COORDS.WATER.x, CURVE_COORDS.WATER.y, CURVE_COORDS.WATER.z),

            new Vector3(CURVE_COORDS.CITY.x, CURVE_COORDS.CITY.y, CURVE_COORDS.CITY.z),
            new Vector3(COORDS_VALUES.CITY.x, COORDS_VALUES.CITY.y, COORDS_VALUES.CITY.z),
        ],

        city_water: [
            new Vector3(COORDS_VALUES.CITY.x, COORDS_VALUES.CITY.y, COORDS_VALUES.CITY.z),
            new Vector3(CURVE_COORDS.CITY.x, CURVE_COORDS.CITY.y, CURVE_COORDS.CITY.z),

            new Vector3(CURVE_COORDS.WATER.x, CURVE_COORDS.WATER.y, CURVE_COORDS.WATER.z),
            new Vector3(COORDS_VALUES.WATER.x, COORDS_VALUES.WATER.y, COORDS_VALUES.WATER.z),
        ],

        island_water: [
            new Vector3(COORDS_VALUES.ISLAND.x, COORDS_VALUES.ISLAND.y, COORDS_VALUES.ISLAND.z),
            new Vector3(CURVE_COORDS.ISLAND.x, CURVE_COORDS.ISLAND.y, CURVE_COORDS.ISLAND.z),

            new Vector3(CURVE_COORDS.WATER.x, CURVE_COORDS.WATER.y, CURVE_COORDS.WATER.z),
            new Vector3(COORDS_VALUES.WATER.x, COORDS_VALUES.WATER.y, COORDS_VALUES.WATER.z),
        ],

        water_island: [
            new Vector3(COORDS_VALUES.WATER.x, COORDS_VALUES.WATER.y, COORDS_VALUES.WATER.z),
            new Vector3(CURVE_COORDS.WATER.x, CURVE_COORDS.WATER.y, CURVE_COORDS.WATER.z),

            new Vector3(CURVE_COORDS.ISLAND.x, CURVE_COORDS.ISLAND.y, CURVE_COORDS.ISLAND.z),
            new Vector3(COORDS_VALUES.ISLAND.x, COORDS_VALUES.ISLAND.y, COORDS_VALUES.ISLAND.z),
        ],

        city_island: [
            new Vector3(COORDS_VALUES.CITY.x, COORDS_VALUES.CITY.y, COORDS_VALUES.CITY.z),
            new Vector3(CURVE_COORDS.CITY.x, CURVE_COORDS.CITY.y, CURVE_COORDS.CITY.z),

            new Vector3(CURVE_COORDS.ISLAND.x, CURVE_COORDS.ISLAND.y, CURVE_COORDS.ISLAND.z),
            new Vector3(COORDS_VALUES.ISLAND.x, COORDS_VALUES.ISLAND.y, COORDS_VALUES.ISLAND.z),
        ],

        island_city: [
            new Vector3(COORDS_VALUES.ISLAND.x, COORDS_VALUES.ISLAND.y, COORDS_VALUES.ISLAND.z),
            new Vector3(CURVE_COORDS.ISLAND.x, CURVE_COORDS.ISLAND.y, CURVE_COORDS.ISLAND.z),

            new Vector3(CURVE_COORDS.CITY.x, CURVE_COORDS.CITY.y, CURVE_COORDS.CITY.z),
            new Vector3(COORDS_VALUES.CITY.x, COORDS_VALUES.CITY.y, COORDS_VALUES.CITY.z),
        ]
    }
}