
import * as THREE from "three"
import { useEffect, useMemo, useRef, useState } from "react";
import { useControls } from "leva";
import { Perf } from "r3f-perf";
import { Center, OrbitControls, PerspectiveCamera, useTexture } from "@react-three/drei";
import DirectionalLight from "../lights/DirectionalLight";
import { ThreeElements, useFrame } from "@react-three/fiber";
import React from "react";

import Meshes from "./Meshes";

type ExperienceScrollBasedAnimationProps = {
    showControls: boolean
}


const ExperienceScrollBasedAnimation = ({ showControls = false, ...props}: ExperienceScrollBasedAnimationProps) => {

    const pointsRef = useRef<THREE.Points>(null!);

    const groupRef = useRef<THREE.Group>(null!)

    const { perfVisible } = useControls('r3F perf', {
        perfVisible: false
    })
    const toonMaterial = useControls('Mesh Toon', {
        color: "#ffeded"
    })

    const element = document.getElementById('canvas')!;      
    let scrollY: number = 0   
    
    const objectDistance = 7;

    let cursorPosition = { x: 0, y: 0 }

    /**
     * Particles
     */
    const particleCount = 2000;

    const particlesPositions = useMemo(() => {

        const positions = new Float32Array(particleCount * 3)        

        for (let i = 0; i < particleCount; i++) {
            let x = (Math.random() - .5) * 20
            let y = objectDistance * ((Math.random() - .5) * 12)
            let z = (Math.random() - .5) * 10

            positions.set([x,y,z], i * 3)
        }

        return positions;

    }, [particleCount])



    useEffect(() => {

        const handleOnScroll = () => {
            scrollY = element.scrollTop
        }

        const handleMouseMove = (event: MouseEvent) => {
            cursorPosition.x = event.clientX / element.clientWidth - .5
            cursorPosition.y = event.clientY / element.clientHeight - .5
        }

        element?.addEventListener("scroll", handleOnScroll)
        element?.addEventListener("mousemove", handleMouseMove)
        
        return () => {
            element?.removeEventListener("scroll", handleOnScroll),
            element?.removeEventListener('mousemove', handleMouseMove)
        }

    }, [])

    useFrame((state, delta) => {
        state.camera.position.y = -scrollY / 600 * objectDistance,
        groupRef.current.position.x += ((cursorPosition.x * .5) - groupRef.current.position.x) * 5 * delta,
        groupRef.current.position.y += ((-cursorPosition.y * .5) - groupRef.current.position.y) * 5 * delta
    })


    return (
        <>
        
            {
                perfVisible && <Perf position="bottom-right" />
            }

            {/* <color args={["#190f03"]} attach="background" /> */}
            <DirectionalLight 
                color="#ffffff"
                castShadow 
                shadow-mapSize={ [1024, 1024] }
                shadow-normalBias={ 0.04 }
                scale={ 5 }
                position={[1, 1, 0]}
            />
            <ambientLight intensity={ .5 } />

            <points ref={ pointsRef } >
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={ particlesPositions.length / 3 }
                        array={ particlesPositions }
                        itemSize={ 3 }
                    />
                </bufferGeometry>
                <pointsMaterial
                    size={0.05}
                    color={ toonMaterial.color }
                    sizeAttenuation
                    depthWrite={false}
                />
            </points>

            <group ref={ groupRef }>
                <PerspectiveCamera
                    manual={false}
                    makeDefault
                    position={ [0, 0, 10] }
                    fov={ 35 }
                    near={ .1 }
                    far={ 100 }
                />
            </group>
          
           
            {
                <Meshes objectDistance={ objectDistance } meshColor={ toonMaterial.color } element={ element } />
            }

            
        </>
    )
}

export default ExperienceScrollBasedAnimation;