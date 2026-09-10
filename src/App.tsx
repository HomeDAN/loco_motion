import React from "react";
import {ThreeProvider} from "./app/ui/context/ThreeProvider.tsx";
import {TestComp} from "./app/ui/components";

export function App() {

    return (
        <ThreeProvider>
            <TestComp/>
        </ThreeProvider>
    )
}

