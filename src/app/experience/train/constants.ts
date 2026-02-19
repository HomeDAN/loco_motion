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