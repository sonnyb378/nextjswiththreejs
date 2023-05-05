import { ThreeElements, useFrame } from "@react-three/fiber"
import { RigidBody, RigidBodyApi } from "@react-three/rapier"
import { useRef, useState } from "react"
import * as THREE from "three"


export type BlockSpinnerProp = ThreeElements["group"] & {
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

const BlockSpinner = ({ floor, floorScale, floorMaterial, obstacle, obstacleMaterial, rbPosition, ...props }: BlockSpinnerProp): JSX.Element => {
    
    /**
     *   Rotate obstacle 
    */
    const [ speed ] = useState(() => (Math.random() + .5) * (Math.random() < .5 ? -1 : 1))

    const obstacleRef = useRef<RigidBodyApi>(null!);
    useFrame((state, delta) => {
        const time = state.clock.getElapsedTime();
        const rotation = new THREE.Quaternion()
        rotation.setFromEuler(new THREE.Euler(0, time * speed, 0))
        obstacleRef.current.setNextKinematicRotation(rotation)
        
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

export default BlockSpinner;
