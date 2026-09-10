import React from "react";
import {useThree} from "../context/ThreeContext.tsx";

export const TestComp = () => {

    const {app} = useThree()

    const click = () => {
        setTimeout(() => {
            app?.scene.traverse(obj => {
                if(obj.name === "red"){
                    app?.events.onClick(obj, () => console.log("clicked"));
                }

                console.log("CLICK", obj)
            })


        }, 2000)
    }

    return (
        <button onClick={click}>test</button>
    )
}