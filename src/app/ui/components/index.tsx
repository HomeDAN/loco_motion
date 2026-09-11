import React, { useState } from "react";
import { useThree } from "../context/ThreeContext.tsx";
import { type LocationNamesTypes, LOCATIONS_NAMES } from "../../experience/objects/train/constants.ts";

export const TestComp = () => {

    const { app } = useThree()
    const [activeDot, setActiveDot] = useState<LocationNamesTypes>(LOCATIONS_NAMES.STATION)

    const click = (location: LocationNamesTypes) =>{
        app?.experience.train.goToLocation(location)
        setActiveDot(app?.experience.train?.activeDot || LOCATIONS_NAMES.STATION)
    }

    return (
        <>
            <button disabled={activeDot === LOCATIONS_NAMES.STATION} onClick={ () => click(LOCATIONS_NAMES.STATION) }>STATION</button>
            <button disabled={activeDot === LOCATIONS_NAMES.CITY} onClick={ () => click(LOCATIONS_NAMES.CITY) }>CITY</button>
            <button disabled={activeDot === LOCATIONS_NAMES.ISLAND} onClick={ () => click(LOCATIONS_NAMES.ISLAND) }>ISLAND</button>
            <button disabled={activeDot === LOCATIONS_NAMES.WATER} onClick={ () => click(LOCATIONS_NAMES.WATER) }>WATER</button>
        </>
    )
}