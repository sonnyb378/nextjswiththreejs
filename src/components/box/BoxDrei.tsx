"use client"

import * as THREE from "three"
import { Box, TransformControls } from "@react-three/drei"
import { ThreeElements, useFrame } from "@react-three/fiber"
import { ReactNode, useEffect, useRef, useState } from "react";
import React from "react";

type BoxProps = {
    showTransformControls?: boolean,
    children?: ReactNode
};

const BoxDrei = ({ showTransformControls = false, children,  ...props }: BoxProps & ThreeElements['mesh']) => {
    
    const [isLoaded, setIsLoaded] = useState(false)
    const meshRef = useRef<THREE.Mesh>(null!);

    const hasChildren = React.Children.count(children) > 0;

    useEffect(() => {
        if (meshRef.current) {
            setIsLoaded(true)
        }        
    }, [meshRef.current])

    useFrame((state, delta) => {
        const time = state.clock.elapsedTime;
        return (
            meshRef.current.rotation.y += delta
            // meshRef.current.position.x = 1.2 + Math.sin(time)
        )
    })

    return (
        <>
            <Box
                {...props}  
                args={[.5, .5, .5]}         
                ref={meshRef}  
            >
                {/* <meshStandardMaterial color='hotpink' /> */}
                {
                    children
                }
            </Box>
            { 
                isLoaded && showTransformControls && <TransformControls object={ meshRef } mode="translate" />
                    
            }
        </>
    )
}

export default BoxDrei;