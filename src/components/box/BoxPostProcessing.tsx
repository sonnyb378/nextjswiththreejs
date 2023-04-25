"use client"

import * as THREE from "three"
import { Box, TransformControls, useCursor, meshBounds } from "@react-three/drei"
import { ThreeElements, ThreeEvent, useFrame } from "@react-three/fiber"
import { ReactNode, useEffect, useRef, useState } from "react";
import React from "react";

import { Bloom, DepthOfField, EffectComposer, Glitch, Noise, SSR, Vignette } from "@react-three/postprocessing";

import * as PostProcessing from "postprocessing"

type BoxPostProcessingProps = {
    showTransformControls?: boolean,
    children?: ReactNode
};

interface GlitchProps {
    delay: [number, number];
    duration: [number, number];
    strength: [number, number];
    mode: PostProcessing.GlitchMode;
  }

const BoxPostProcessing = ({ showTransformControls = false, children,  ...props }: BoxPostProcessingProps & ThreeElements['mesh']) => {
   
    const [ hovered, setHovered ] = useState(false);
    useCursor(hovered)
    
    const [isLoaded, setIsLoaded] = useState(false)
    const meshRef = useRef<THREE.Mesh>(null!);

    // const hasChildren = React.Children.count(children) > 0;

    // const boxClicked = (event: ThreeEvent<MouseEvent>) => {
    //     const material = meshRef.current.material as THREE.MeshStandardMaterial;
    //     material.color.set(`hsl(${Math.random() * 360}, 100%, 75%)`)
    //     // material.color.set('blue')
    //     // console.log(event)
    // }


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
            {/* <EffectComposer> */}
                {/* <Vignette 
                    offset={ 0.3 }
                    darkness={ .9 }
                    blendFunction={ PostProcessing.BlendFunction.NORMAL }
                /> */}
                
                {/* <Glitch
                    delay={ new THREE.Vector2(.5, 1) }
                    duration={ new THREE.Vector2(.1, 3) } 
                    strength={ new THREE.Vector2(.2, .4) } 
                    mode={ PostProcessing.GlitchMode.SPORADIC}
                /> */}

                {/* <Noise 
                    blendFunction={ PostProcessing.BlendFunction.SOFT_LIGHT }
                    premultiply
                /> */}
            
                {/* <Bloom 
                    mipmapBlur 
                    intensity={ .1 } 
                    luminanceThreshold={ 0 }
                /> */}
                {/* <DepthOfField 
                    focusDistance={ 0.025}
                    focalLength={ 0.025 }
                    bokehScale={ 6 }
                /> */}

                {/* <SSR /> */}

            {/* </EffectComposer> */}
            <Box
                    {...props}  
                    args={[.5, .5, .5]}         
                    ref={meshRef}  
                    raycast={ meshBounds }
                    // onClick={ boxClicked }
                    onPointerEnter={ () =>  setHovered(true) }
                    onPointerLeave={ () => setHovered(false) }
                    // onPointerEnter={ () => { document.body.style.cursor = 'pointer' } }
                    // onPointerLeave={ () => { document.body.style.cursor = 'default' } }
                    

                >
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

export default BoxPostProcessing;