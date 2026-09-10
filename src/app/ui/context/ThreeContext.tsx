import type {ThreeApp} from "../../experience/ThreeApp.ts";
import {createContext, useContext} from "react";

export interface ThreeContextType {
    app: ThreeApp | null;
    domElement: HTMLElement | null;
}

export const ThreeContext = createContext<ThreeContextType>({
    app: null,
    domElement: null,
});

export const useThree = () => {
    const context = useContext(ThreeContext);
    if (!context) {
        throw new Error('useThree must be used within ThreeProvider');
    }
    return context;
};