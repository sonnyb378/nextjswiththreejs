"use client"

import { Canvas } from '@react-three/fiber'
import { ReactNode, useRef } from 'react';
import { Leva } from 'leva';
import * as THREE from "three"
import { Stage, OrbitControls } from '@react-three/drei';

type CanvasComponentProps = {
    showControls?: boolean,
    children: ReactNode;
};

function CanvasComponent({ children, showControls, ...props }: CanvasComponentProps & Record<string, any>) {

    return (
        <>
            {/* Leva panel an offset */}
            <div style={ {position: 'fixed', top: '70px', right: '0px', zIndex: 1, transform: 'translate(0%, 0%)',} }> 
                <Leva collapsed hidden={ showControls || false } />
            </div>
            <Canvas {...props} shadows={ true } >
                { children }
            </Canvas>
        </>
        
   ) 
}

export default CanvasComponent;


