import React, {useEffect, useRef, useState} from 'react';
import {ThreeContext, type ThreeContextType} from "./ThreeContext.tsx";
import {ThreeApp} from "../../experience/ThreeApp.ts";

interface ThreeProviderProps {
    children: React.ReactNode;
}

export function ThreeProvider({ children }: ThreeProviderProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [app, setApp] = useState<ThreeApp | null>(null);
    const [domElement, setDomElement] = useState<HTMLElement | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // @ts-ignore
        const threeApp = new ThreeApp();

        containerRef.current.appendChild(threeApp.domElement);
        setApp(threeApp);
        setDomElement(threeApp.domElement);

        return () => {
            containerRef.current?.removeChild(threeApp.domElement);
            setApp(null);
            setDomElement(null);
        };
    }, []);

    const value: ThreeContextType = {
        app,
        domElement,
    };

    return (
        <ThreeContext.Provider value={value}>
            <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
                {children}
            </div>
        </ThreeContext.Provider>
    );
}