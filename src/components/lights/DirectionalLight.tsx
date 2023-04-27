"use client"

import * as THREE from "three";
import { useMemo, useRef, useEffect } from "react";
import { ThreeElements, useFrame } from "@react-three/fiber";
import { OrbitControls, useHelper } from "@react-three/drei";


type dlProps = ThreeElements['directionalLight'] & {
    area?:number;
    scale?: number;
}

export default function DirectionalLight({area = 15, scale = 1, ...props}: dlProps) {
    const directional = useRef<THREE.DirectionalLight>(null!)
    // useHelper(directional, THREE.DirectionalLightHelper, .5)    

    return (
        <>
            <directionalLight 
                {...props} 
                ref={ directional } 
                castShadow 
                shadow-mapSize={ [1024, 1024] }
                shadow-camera-near={ 5 }
                shadow-camera-far={ 50 }
                shadow-camera-top={ area }
                shadow-camera-right={ area }
                shadow-camera-bottom={ (area - (area * 2)) }
                shadow-camera-left={ (area - (area * 2)) }
                scale={ scale }
            />
        </>
    )
}