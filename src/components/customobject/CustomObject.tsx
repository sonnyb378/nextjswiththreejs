"use client"

import * as THREE from "three";
import { useMemo, useRef, useEffect } from "react";
import { ThreeElements, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";


export default function CustomObject(props: ThreeElements['mesh']) {
    const mesh = useRef<THREE.Mesh>(null!)

    const geometryRef = useRef<THREE.BufferGeometry>(null!);

    const verticesCount = 10 * 3;
    
    const positions = useMemo(() => {
        const positions = new Float32Array(verticesCount * 3)
        for (let i = 0; i < verticesCount * 3; i++) {
            positions[i] = (Math.random() - .5) * 3;
        }
        return positions;
    }, [])

    useEffect(() => {
        geometryRef.current.computeVertexNormals()
    }, [])

    useFrame((state, delta) => {
        return(
            mesh.current.rotation.y += delta
        )
    })

    return (
        <mesh
            {...props}
            ref={mesh}
            scale={ .7 }
        >
            <bufferGeometry ref={geometryRef}>
                <bufferAttribute 
                    attach="attributes-position"
                    count={ verticesCount}
                    itemSize={3}
                    array={positions}
                />
            </bufferGeometry>
            <meshStandardMaterial color="red" side={ THREE.DoubleSide } />
            <OrbitControls />
        </mesh>
    )
}