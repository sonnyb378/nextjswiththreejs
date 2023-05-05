import { ThreeElements, useFrame } from "@react-three/fiber"
import { RigidBody, RigidBodyApi } from "@react-three/rapier"
import { useRef, useState } from "react"
import * as THREE from "three"



export type BlockLimboProps = ThreeElements["group"] & {
    floor: THREE.BufferGeometry,
    floorScale: THREE.Vector3,
    floorMaterial: THREE.MeshStandardMaterial,
    obstacle: THREE.BufferGeometry,
    obstacleMaterial: THREE.MeshStandardMaterial,
    rbPosition: THREE.Vector3
}

/**
 * Render a block spinner component.
 *
 * @param {BlockSpinnerProp} props - Component properties.
 * @returns {JSX.Element} A React element representing the spinner block component.
 */

const BlockLimbo = ({ floor, floorScale, floorMaterial, obstacle, obstacleMaterial, rbPosition, ...props }: BlockLimboProps): JSX.Element => {

    /**
     *   Rotate obstacle 
    */
    const [ timeOffset ] = useState(() => Math.random() * Math.PI * 2)

    const obstacleRef = useRef<RigidBodyApi>(null!);
    useFrame((state, delta) => {
        const time = state.clock.getElapsedTime() * .3;
        const translation = new THREE.Vector3(0, Math.sin(time * timeOffset) + 1.25, (props.position as number[])[2])
        obstacleRef.current.setNextKinematicTranslation(translation)
        
    })

    return (
        <group { ...props } >
            <RigidBody ref={ obstacleRef } type="kinematicPosition" position={ rbPosition } restitution={ .2 } friction={ 0 } >
                <mesh 
                    geometry={ obstacle } 
                    material={ obstacleMaterial } 
                    scale={ new THREE.Vector3( 3.5, .3, .3 ) } 
                    castShadow 
                    receiveShadow 
                />
            </RigidBody>

            <mesh 
                geometry={ floor } 
                material={ floorMaterial }
                position={[0, -.1, 0]} 
                scale={ floorScale } 
                receiveShadow
            />
        </group>
    )
}

export default BlockLimbo;
