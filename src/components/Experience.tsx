
import * as THREE from "three"
import { useEffect, useMemo, useRef, useState } from "react";
import { CuboidCollider, CylinderCollider, Debug, InstancedRigidBodies, Physics, RigidBody, RigidBodyApi, Vector3Array } from "@react-three/rapier";
import { useControls } from "leva";
import { Perf } from "r3f-perf";
import DirectionalLight from "@/components/lights/DirectionalLight";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

type ExperienceProps = {
    showControls: boolean
}
const Experience = ({ showControls = false, ...props}: ExperienceProps) => {

    const cube = useRef<RigidBodyApi>(null!)
    const ball = useRef<RigidBodyApi>(null!)
    const twister = useRef<RigidBodyApi>(null!)

    const [ hitSound ] = useState(() => new Audio("/assets/hit.mp3"))

    const hamburger = useGLTF('/models/hamburger.glb')

    const { perfVisible } = useControls('r3F perf', {
        perfVisible: false
    })

    const cubeJump = () => {
        const mass = cube.current.mass();
        cube.current.applyImpulse({ x:0, y:8 * mass, z:0 })
        cube.current.applyTorqueImpulse({ 
            x: Math.random() - .5, 
            y: Math.random() - .5, 
            z: Math.random() - .5
        })
    }

    const ballJump = () => {
        const mass = ball.current.mass();
        ball.current.applyImpulse({ x:0, y:8 * mass, z:0 })
    }

    useFrame((state, delta) => {
        const time = state.clock.getElapsedTime()
        const euler = new THREE.Euler(0, time, 0)
        const quaternion = new THREE.Quaternion()
        quaternion.setFromEuler(euler)
        twister.current.setNextKinematicRotation(quaternion)

        const angle = time * .5;
        const x = Math.cos(angle) * 5;
        const z = Math.sin(angle) * 5;
        twister.current.setNextKinematicTranslation({ x:x, y: 1.3, z:z})
    })

    const collisionEnter = () => {
        // console.log('collisionEnter')
        // hitSound.currentTime = 0
        // hitSound.volume = Math.random();
        // hitSound.play();
    }

    const cubesCount = 100
    const cubes = useRef<THREE.InstancedMesh>(null!)

    const cubeTransforms = useMemo(() => {
        const positions: Vector3Array[] = []
        const rotations: Vector3Array[] = []
        const scales: Vector3Array[] = []

        for (let i = 0; i < cubesCount; i++) {
            positions.push([(Math.random() - .5) * 18, 6 + i * .5, (Math.random() - .5) * 18])
            rotations.push([0, 0, 0])
            const scale = 0.2 + Math.random() * 2
            scales.push([scale, scale, scale])
        }
        return {
            positions,
            rotations,
            scales
        }

    }, [])

    // useEffect(() => {
    //     for (let i = 0; i < cubesCount; i++) {
    //         const matrix = new THREE.Matrix4();
    //         matrix.compose(
    //             new THREE.Vector3(i * 5, 8, 0),
    //             new THREE.Quaternion(),
    //             new THREE.Vector3(2, 2, 2)
    //         )
    //         cubes.current.setMatrixAt(i, matrix)
    //     }
    // }, [])
    
    return (
        <>
        
            {
                perfVisible && <Perf position="bottom-right" />
            }

            <color args={["#190f03"]} attach="background" />
            
            <DirectionalLight 
                castShadow 
                shadow-mapSize={ [1024, 1024] }
                shadow-normalBias={ 0.04 }
                scale={ 5 }
                position={[0, 15, 5]}
            />
            <ambientLight intensity={ .5 } />

            <Physics gravity={ [0, -9.81, 0] }>                             
                {/* <Debug />                             */}
                
                <RigidBody 
                    ref={ cube } 
                    colliders={ false }  
                    position={ [-7, 8, -5] } 
                    gravityScale={ 1 } 
                    restitution={ .5 }
                    // onCollisionEnter={ collisionEnter }
                    // onCollisionExit={ () => console.log("exit") } 
                    // onSleep={ () => console.log("sleep") }
                    // onWake={ () => console.log("wake") }
                >
                    <mesh scale={ 1.6 } castShadow onClick={ cubeJump }>
                        <boxGeometry args={[ 2, 2, 2]} />
                        <meshStandardMaterial color="hotpink" />
                    </mesh>
                    <CuboidCollider args={ [1.5, 1.5, 1.5] } mass={ 1 } />
                </RigidBody>

                <RigidBody ref={ ball }  colliders="ball" position={[7, 8, -5]} mass={ 1 } restitution={ .5 } >
                    <mesh scale={ 1.6 } castShadow onClick={ ballJump } >
                        <sphereGeometry />
                        <meshStandardMaterial color="#ffff00" />
                    </mesh>
                </RigidBody>

                <RigidBody colliders={ false } position={[0, 8, 9]} mass={ 1.2 } restitution={ .5 }>
                    <primitive object={ hamburger.scene } scale={ .6 } />
                    <CylinderCollider args={ [ 1.5, 2.75 ] } position={[0, 1.75, 0]}/>
                </RigidBody>

                

                <RigidBody
                    ref={ twister }
                    position={[ 0, 1.3, 0] }
                    friction={ 0 }
                    type="kinematicPosition"
                >
                    <mesh castShadow scale={ [1.3, 1.3, 8] }>
                        <boxGeometry />
                        <meshStandardMaterial color="red" />
                    </mesh>
                </RigidBody>

                <InstancedRigidBodies
                    positions={ cubeTransforms.positions }
                    rotations={ cubeTransforms.rotations }
                    scales={ cubeTransforms.scales }
                >
                    <instancedMesh ref={ cubes } castShadow receiveShadow args={[ undefined, undefined, cubesCount]}>
                        <boxGeometry />
                        <meshStandardMaterial color="tomato" />
                    </instancedMesh>
                </InstancedRigidBodies>
                
                <RigidBody type="fixed">
                    <CuboidCollider args={[ 15, 3, .5 ]} position={[0, 3.75, 15.5]} />
                    <CuboidCollider args={[ 15, 3, .5 ]} position={[0, 3.75, -15.5]} />
                    <CuboidCollider args={[ .5, 3, 15 ]} position={[15.5, 3.75, 0]} />
                    <CuboidCollider args={[ .5, 3, 15 ]} position={[-15.5, 3.75, 0]} />
                </RigidBody>

                <RigidBody type="fixed" >
                    <mesh scale={ 3 } receiveShadow>
                        <boxGeometry args={[10, .5, 10 ]} />
                        <meshStandardMaterial color="greenyellow" />
                    </mesh> 
                </RigidBody>

            </Physics>
                
            <OrbitControls makeDefault  />
        </>
    )
}

export default Experience;