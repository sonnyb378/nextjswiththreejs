"use client"

import * as THREE from "three"
import { Box, TransformControls, useCursor, meshBounds } from "@react-three/drei"
import { ThreeElements, ThreeEvent, useFrame } from "@react-three/fiber"
import { ReactNode, useEffect, useRef, useState } from "react";
import React from "react";

type BoxProps = {
    showTransformControls?: boolean,
    children?: ReactNode
};

const BoxDrei = ({ showTransformControls = false, children,  ...props }: BoxProps & ThreeElements['mesh']) => {
    
    const [ hovered, setHovered ] = useState(false);
    useCursor(hovered)
    
    const [isLoaded, setIsLoaded] = useState(false)
    const meshRef = useRef<THREE.Mesh>(null!);

    const hasChildren = React.Children.count(children) > 0;

    const boxClicked = (event: ThreeEvent<MouseEvent>) => {
        const material = meshRef.current.material as THREE.MeshStandardMaterial;
        // material.color.set(`hsl(${Math.random() * 360}, 100%, 75%)`)
        material.color.set('blue')
        // console.log(event)
    }

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
                raycast={ meshBounds }
                onClick={ boxClicked }
                onPointerEnter={ () =>  setHovered(true) }
                onPointerLeave={ () => setHovered(false) }
                // onPointerEnter={ () => { document.body.style.cursor = 'pointer' } }
                // onPointerLeave={ () => { document.body.style.cursor = 'default' } }

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