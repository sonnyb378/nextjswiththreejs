"use client"

import * as THREE from "three";
import { useMemo, useRef, useEffect } from "react";
import { ThreeElements, useFrame } from "@react-three/fiber";
import { OrbitControls, useHelper } from "@react-three/drei";


export default function DirectionalLight(props: ThreeElements['directionalLight']) {
    const directional = useRef<THREE.DirectionalLight>(null!)
    useHelper(directional, THREE.DirectionalLightHelper, .5)    

    return (
        <>
            <directionalLight 
                {...props} 
                ref={ directional } 
                castShadow 
                shadow-mapSize={ [1024, 1024] }
                shadow-camera-near={ 5 }
                shadow-camera-far={ 20 }
                shadow-camera-top={ 15 }
                shadow-camera-right={ 15 }
                shadow-camera-bottom={ -15 }
                shadow-camera-left={ -15 }
                scale={ 1 }
            />
        </>
    )
}