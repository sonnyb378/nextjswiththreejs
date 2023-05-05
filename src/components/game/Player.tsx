import { useFrame } from "@react-three/fiber";
import { RigidBody, RigidBodyApi, useRapier } from "@react-three/rapier";
import { useKeyboardControls } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three"

import { useGameStore } from "./stores/useGame";

const Player = () => {

    const [smoothCameraPosition] = useState(() => new THREE.Vector3(10, 10, 10))
    const [smoothCameraTarget] = useState(() => new THREE.Vector3())

    const player = useRef<RigidBodyApi>(null!);
    
    const [subscribeKeys, getKeys] = useKeyboardControls()
    const { rapier, world } = useRapier();
    const rapierWorld = world.raw();

    const startPhase = useGameStore((state) => state.startPhase )
    const endPhase = useGameStore((state) => state.endPhase )
    const restartPhase = useGameStore((state) => state.restartPhase )
    const blocksCount = useGameStore((state) => state.blocksCount )
    
    
    const jump = () => {
        const origin = player.current.translation()
        origin.y -= .31

        const direction = { x: 0, y: -1, z: 0 }
        const ray = new rapier.Ray(origin, direction)
        const hit = rapierWorld.castRay(ray, 10, true)

        if (hit && hit.toi <= 0) {
            player.current.applyImpulse({ x: 0, y: .5, z: 0 })
        }
    }

    const reset = () => {
        player.current.setTranslation({ x:0, y: 1, z: 0});
        player.current.setLinvel({ x:0, y: 0, z: 0});
        player.current.setAngvel({ x:0, y: 0, z: 0});

    }

    useEffect(() => {

        const unsubscribeReset = useGameStore.subscribe(
            (state) => state.phase,
            (phase) => {
                if (phase === 'ready') {
                    reset()
                }
            }
        )

        const unsubscribeJump = subscribeKeys(
            (state) => state.jump,
            (value) => {
                if (value) {
                    jump()
                }
            }
        )

        const unsubscribeAny = subscribeKeys(() => {
            startPhase()
        })

        return () => {
            unsubscribeReset()
            unsubscribeJump()
            unsubscribeAny()
        }
    }, [])

    useFrame((state, delta) => {
        /**
         *  Controls
         */
        const { forward, back, left, right } = getKeys();

        const impulse = { x: 0, y: 0, z: 0 }
        const torque = { x: 0, y: 0, z: 0 }

        const impulseStrength = .6 * delta
        const torqueStrength = .2 * delta

        if (forward) {
            impulse.z -= impulseStrength 
            torque.x -= torqueStrength 
        }
        if (right) {
            impulse.x += impulseStrength 
            torque.z -= torqueStrength 
        }
        if (back) {
            impulse.z += impulseStrength 
            torque.x += torqueStrength 
        }
        if (left) {
            impulse.x -= impulseStrength 
            torque.z += torqueStrength 
        }

        player.current.applyImpulse(impulse)
        player.current.applyTorqueImpulse(torque)

        /**
         *  Camera
         */

        const playerPosition = player.current.translation()
        const cameraPosition = new THREE.Vector3()
        cameraPosition.copy(playerPosition)
        cameraPosition.z += 2.25
        cameraPosition.y += .65
        
        const cameraTarget = new THREE.Vector3()
        cameraTarget.copy(playerPosition)
        cameraTarget.y += .25

        smoothCameraPosition.lerp(cameraPosition, 5 * delta)
        smoothCameraTarget.lerp(cameraTarget, 5 * delta)

        state.camera.position.copy(smoothCameraPosition)
        state.camera.lookAt(smoothCameraTarget)

        /**
         *  Phases
         */
        if (playerPosition.z < - (blocksCount * 4 + 2) ) {
            endPhase()
        }

        /**
         *   Player falling restart game
         */
        if (playerPosition.y < -4) {
            restartPhase()
        }

    })
    return(
        <RigidBody 
            ref={ player } 
            colliders="ball" 
            position={[0, 1, 0]} 
            restitution={ .2 } 
            friction={ 1 } 
            linearDamping={ .5 }
            angularDamping={ .5 }
        >
            <mesh castShadow>
                <icosahedronGeometry args={[ .3, 1]} />
                <meshStandardMaterial 
                    flatShading
                    color="mediumpurple" 
                />
            </mesh>
        </RigidBody>
    )
}

export default Player;