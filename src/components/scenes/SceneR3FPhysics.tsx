"use client"

import * as THREE from "three"
import CanvasComponent from "@/components/canvas/CanvasComponent";

import { Environment, OrbitControls, PerspectiveCamera, PresentationControls, ContactShadows, Html, useHelper } from "@react-three/drei";

import { useControls } from "leva";
import { Perf } from "r3f-perf";
import ArrowRight from "../icons/ArrowRight";
import { useRef, useState } from "react";

import DirectionalLight from "@/components/lights/DirectionalLight";
import MacBookModel from "@/components/models/Laptop";
import PlaneComponent from "../plane/PlaneComponent";
import BoxDrei from "../box/BoxDrei";
import SphereDrei from "../sphere/SphereDrei";
import { CuboidCollider, Debug, Physics, RigidBody, RigidBodyApi, RigidBodyProps } from "@react-three/rapier";
import ButtonNav from "../ui/buttonnav/ButtonNav";
import Link from "next/link";
import Experience from "@/components/Experience";



const SceneR3FPhysics = () => {

    const [isShow, setIsShow] = useState(true);
    const [showControls, setShowControls] = useState(true);

    const toggleHandler = () => {
        setIsShow(!isShow)
    }

    const showControlsHandler = () => {
        setShowControls(!showControls)
    }

    return (

        <div id="scene-container" className="flex w-full h-full items-start flex-1 flex-grow justify-start border-0 border-cyan-500 overflow-hidden">
            
            <div className={`flex flex-row-reverse items-start justify-between relative h-full`}>
                <div onClick={toggleHandler} className={`flex items-center justify-center absolute z-[1001] p-2 group cursor-pointer ${ isShow ? "-mr-[74px]": "-mr-[74px]" } hover:bg-slate-800`}>
                    <ArrowRight className={`${ isShow? "rotate-180" : ""} stroke-white group-hover:stroke-yellow-500 w-[20px] h-[20px] -ml-[5px]`} />
                    <span>Notes</span>
                </div>
                
                <div id="text-container" className={`scrollbar scrollbar-thumb-gray-800 scrollbar-track-zinc-900 transition-all flex flex-col w-[300px]  ${ isShow ? "ml-[0px]": "-ml-[310px]" } items-start justify-start p-2 border-0 border-emerald-500 overflow-y-auto h-full`}>
                    
                    <div className="flex flex-col items-start justify-start space-y-1 w-full border-0">
                        <button className="btn btn-primary w-full" onClick={ showControlsHandler }>Toggle Controls</button> 
                    </div>
                    <div className="flex items-center justify-center w-full mt-2">
                        <Link href="/r3f/physics/colliders" className="w-full">
                            <button className="btn btn-secondary w-full">Colliders Examples</button> 
                        </Link>
                    </div>

                    <div className="flex flex-col items-start justify-start space-y-1 w-full mt-4 border-0 text-sm">
                        <h1 className="text-orange-500">Physics</h1>
                        <ol className='list-decimal ml-[8px] text-xs  w-full p-2 space-y-2 border-0 text-orange-500'>
                            <li className="text-yellow-500">Rapier
                                <ul className="w-full text-xs space-y-2 mt-2 list-disc p-2 text-white">
                                    <li><span className="text-green-400">{`npm install @react-three/rapier`}</span></li>
                                    <li><span className="text-white">rapier.rs</span></li>
                                </ul>
                            </li> 
                            <li className="text-yellow-500">{`<Physics>`}
                                <ul className="w-full text-xs space-y-2 mt-2 list-disc p-2 text-white">
                                    <li><pre><code className="text-green-400 p-2">{`import { Physics } from "@react-three/rapier";`}</code></pre></li>
                                    <li>Wrap all meshes that will be affected by "Physics" inside the {`<Physics>`} tag</li>
                                </ul>
                            </li>   
                            <li className="text-yellow-500">{`<RigidBody>`}
                                <ul className="w-full text-xs space-y-2 mt-2 list-disc p-2 text-white">
                                    <li className="list-none"><pre><code className="text-green-400 p-2">{`import { RigidBody } from "@react-three/rapier";`}</code></pre></li>
                                    <li>Wrap meshes inside {`<RigidBody>`} to be affected by physics</li>
                                    <li>{`<RigidBody>`} can only be used inside {`<Physics>`} tag</li>
                                    <li>You can add multiple meshes inside the {`<RigidBody>`}</li>
                                </ul>
                            </li>                              
                            <li className="text-yellow-500">{`<Debug>`}
                                <ul className="w-full text-xs space-y-2 mt-2 list-disc p-2 text-white">
                                    <li className="list-none"><pre><code className="text-green-400 p-2">{`import { Debug } from "@react-three/rapier";`}</code></pre></li>
                                    <li>{`<Debug>`} can only be used inside {`<Physics>`} tag</li>
                                    <li>After adding {`<Debug>`} inside the {`<Physics>`} tag, you will see a wireframe around the meshes, it is called <span className="text-yello-500">"Colliders"</span></li>
                                    <li>{`<Debug>`} development only</li>
                                </ul>
                            </li>    
                            <li className="text-yellow-500">Colliders
                                <span className="text-white block mt-2">By default, colliders are cuboids (box), we can change that by adding "colliders" prop and specifying which collider type to use</span>
                                <ul className="w-full text-xs space-y-2 mt-2 list-disc p-2 text-orange-400">
                                    <li>Ball Colliders
                                        <pre><code className="text-green-400 p-2">{`
<RigidBody colliders="ball">
    <mesh scale={ 2 } position-y={ 10 } position-x={ -3.75 } castShadow>
        <sphereGeometry />
        <meshStandardMaterial color="#ffff00" />
    </mesh>
</RigidBody>
                                    `}</code></pre>                                    
                                    </li>
                                    <li>Hull Collider
                                        <pre><code className="text-green-400 p-2">{`
<RigidBody colliders="hull" >
    <mesh scale={ 2 } position-y={ 10 } position-x={ .75 } rotation={[Math.PI * .5, 0, 0]}  castShadow>
        <torusGeometry args={[1, .5, 16, 32]} />
        <meshStandardMaterial color="mediumpurple" />
    </mesh>
</RigidBody>
                                    `}</code></pre>    
                                        <ul className="text-white list-decimal ml-2">
                                            <li>"hull" collider will add "membrane" inside the torus</li>
                                        </ul>                     
                                    </li>
                                    <li>Trimesh Collider
                                        <pre><code className="text-green-400 p-2">{`
<RigidBody colliders="trimesh" >
    <mesh scale={ 2 } position-y={ 10 } position-x={ .75 } rotation={[Math.PI * .5, 0, 0]}  castShadow>
        <torusGeometry args={[1, .5, 16, 32]} />
        <meshStandardMaterial color="mediumpurple" />
    </mesh>
</RigidBody>
                                    `}</code></pre>  
                                        <ul className="text-white list-decimal ml-2">
                                            <li>Avoid using trimesh collider with dynamic RigidBodies</li>
                                        </ul>                                  
                                    </li>
                                    <li>Custom Collider
                                        <pre><code className="text-green-400 p-2">{`
<RigidBody colliders={ false } >
  ...
</RigidBody>
                                    `}</code></pre>  
                                        <ul className="text-white list-decimal ml-2">
                                            <li>Adding "false" to the RigidBody tells Rapier not to automatically create a collider (eg: ball, hull, etc)</li>
                                            <li>Add a "CuboidCollider" from rapier, inside a {`RigidBody`}
                                                <pre>
                                                    <code className="text-green-400 p-2">
                                                        {`
<CuboidCollider args={[1, 1, 1]}></CuboidCollider>                                                
                                                        `}
                                                    </code>
                                                </pre>
                                                <ul className="list-disc">                                                    
                                                    <li>{`args={[1,1,1]}`}: The 1s are half extent values, meaning there's 1 point between the center of the cuboidcollider to its edges</li>
                                                    <li>Multiple colliders can be added inside a RigidBody
                                                    <pre><code className="text-green-400">{`
<RigidBody colliders={false} position={[0, 5, 0]} rotation={[Math.PI * .5, 0, 0]}  >
    <CuboidCollider args={[1.5, 1.5, .5]}/>
    <CuboidCollider args={[1, 1, 1]}/>
    <mesh castShadow>
        <torusGeometry args={[1, .5, 16, 32]} />
        <meshStandardMaterial color="mediumpurple" />
    </mesh>
</RigidBody>                                                    
                                                    `}</code></pre>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>To check more colliders, go to "Colliders Example" page</li>
                                        </ul>                                  
                                    </li>
                                </ul>
                            </li>  
                            
                            <li className="text-yellow-500">Access the body and apply forces
                                <ul className="w-full text-xs space-y-2 mt-2 list-disc p-2 text-white">
                                    <li className="list-disc">Reference and Impulse
                                        <ul className="p-2 text-white">
                                            <li>Add a reference to the mesh you want to apply force
                                                <pre>
                                                    <code className="text-green-400 p-2">
                                                    {`
const cube = useRef();  

<RigidBody ref={ cube } >
    ...mesh
</RigidBody>
                                                `}
                                                    </code>
                                                </pre>
                                            </li>
                                            <li>Create a function and supply it to the onClick prop of the mesh
                                                <pre><code className="text-green-400 p-2">{`
const cubeJump = () => {
    cube.current.applyImpulse({ x:0, y:5, z:0 })
    cube.current.applyTorqueImpulse({ x:0, y:1, z:0 })
}                                                

<RigidBody ref={ cube } position={ [0,2,0] } mass={ .5 } >
    <mesh scale={ 1.6 } castShadow onClick={ cubeJump }>
        <boxGeometry args={[2,2,2]} />
        <meshStandardMaterial color="hotpink" />
    </mesh>
</RigidBody>
                                                `}</code></pre>
                                                Note: We need to provide mass to the RigidBody
                                                <pre>applyTourgueImpulse: applies rotation (euler) to the mesh
                                                    <code className="text-green-400">{`
cube.current.applyTorqueImpulse({ x:0, y:1, z:0 })                                                    
                                                    `}</code>
                                                </pre>
                                            </li>
                                        </ul>
                                    </li>
                                    
                                </ul>
                            </li>     

                            <li className="text-yellow-500">Gravity
                                <ul className="w-full text-xs space-y-2 mt-2 list-disc p-2 text-white">

                                    <li className="list-disc">Add "gravity" prop to the {`<Physics>`} tag
                                        <pre>
                                            <code className="text-green-400 p-2">{`
<Physics gravity={ [0, -9.81, 0] }>
                                            `}</code>
                                        </pre>
                                        <ul className="list-decimal p-2">
                                            <li>-9.81: free-falling object acceleration on Earth (9.8 m/s2 - meters per square second)</li>
                                            <li>Values can be changed in run-time</li>
                                            <li>A negative y value pushes the object downward (normal gravity behaviour)</li>
                                            <li>A positive y value inverts gravity upward</li>
                                        </ul>
                                    </li>
                                    
                                </ul>
                            </li>
                            <li className="text-yellow-500">Restitution
                                <ul className="w-full text-xs space-y-2 mt-2 list-disc p-2 text-white">

                                    <li className="list-disc">"restitution" controls the bounciness of an object
                                        <pre>
                                            <code className="text-green-400 p-2">{`
<RigidBody ref={ cube } position={ [-3, 15, 0] } mass={ 1 } gravityScale={ 1 } restitution={ 2 }>
                                            `}</code>
                                        </pre>
                                        <ul className="list-decimal p-2">
                                            <li>default value is 0</li>
                                            <li>Also put restitution on the floor surface (eg. to simulate wood, metal, carpet, etc)</li>
                                        </ul>
                                    </li>
                                    
                                </ul>
                            </li>
                            <li className="text-yellow-500">Friction
                                <ul className="w-full text-xs space-y-2 mt-2 list-disc p-2 text-white">

                                    <li className="list-disc">"friction" attribute
                                        <pre>
                                            <code className="text-green-400 p-2">{`
<RigidBody ref={ cube } position={ [-3, 15, 0] } mass={ 1 } gravityScale={ 1 } restitution={ 2 } friction={ 0 } >
                                            `}</code>
                                        </pre>
                                        <ul className="list-decimal p-2">
                                            <li>default value is 0.7</li>
                                            <li>You can also put "friction" on the floor surface (eg. to simulate wood, metal, carpet, etc)</li>
                                        </ul>
                                    </li>
                                    
                                </ul>
                            </li>     
                            <li className="text-yellow-500">Mass
                                <ul className="w-full text-xs space-y-2 mt-2 list-disc p-2 text-white">

                                    <li className="list-disc">"mass" attribute
                                        <pre>
                                            <code className="text-green-400 p-2">{`
<RigidBody ref={ cube } position={ [-3, 15, 0] } mass={ 1 } gravityScale={ 1 } restitution={ 2 } friction={ 0 } >
                                            `}</code>
                                        </pre>
                                        <ul className="list-decimal p-2">
                                            <li>Bigger objects have bigger mass</li>
                                            <li>To make the force adapt to the mass of the object
                                                <pre>
                                                    <code className="text-green-400">{`
 const mass = cube.current.mass();
 cube.current.applyImpulse({ x:0, y:5 * mass, z:0 })                                                    
                                                    `}</code>
                                                </pre>
                                            </li>
                                        </ul>
                                    </li>
                                    
                                </ul>
                            </li>        
                            <li className="text-yellow-500">Position and Rotation
                                <ul className="w-full text-xs space-y-2 mt-2 list-disc p-2 text-white">
                                    <li>For dynamic and fixed objects, do not change the values of position and rotation at run time
                                        <span className="block mt-2 text-purple-400">Object type:</span>
                                        <ul className="p-2 text-orange-500 text-xs list-disc ml-2">
                                            <li>Dynamic</li>
                                            <li>Fixed</li>
                                            <li>Kinematic</li>
                                        </ul>
                                    </li>
                                    <li>If you want to move object, use forces to it</li>
                                    <li>Here are some options to move an object:
                                        <ul className="list-decimal p-2">
                                            <li>Move the object only once: reset velocities</li>
                                            <li>Move object with time (eg: carousel or moving obstacles): use "kinematic" types
                                                <ul className="list-none p-2">
                                                    <li>Kinematic types
                                                        <ul className="list-disc p-2">
                                                            <li><span className="text-pink-300">kinematicPosition</span>: we provide the next position</li>
                                                            <li><span className="text-pink-300">kinematicVelocity</span>: we provide the velocity directly</li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                                <ul className="list-decimal p-2 ml-2">
                                                    <li>Differences is how you update</li>
                                                    <li>kinematic objects can only be moved with forces</li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="text-xs">Rotate the kinematic Object
                                        <ul className="list-decimal p-2">
                                            <li>Create a reference to the kinematic RigidBody
                                                <pre className="p-2">
                                                    <code className="p-2 text-green-400">{`const twister = useRef<RigidBodyApi>(null!)`}</code>
                                                </pre>
                                            </li>
                                            <li>Add the reference to the "ref" prop</li>
                                            <li>Add "kinematicPosition" to the "type" prop of the RigidBody
                                                <pre className="p-2">
                                                    <code className="p-2 text-green-400">{`
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
                                                    `}</code>
                                                </pre>
                                            </li>
                                            <li>To rotate the kinematic object, use "useFrame". "setNextKinematicRotation" is expecting a Quaternion not Euler (rotation)
                                                <span className="block mt-2 text-yellow-500">Steps to create a Quaternion</span>
                                                <ul className="p-2 ml-2 text-xs space-y-2 list-disc">
                                                    <li>Create a ThreeJS "Euler"</li>
                                                    <li>Create a ThreeJS "Quaternion"</li>
                                                    <li>Send that "Quaternion" to "setNextKinematicRotation" (rapier method)</li>
                                                </ul>
                                                <pre>
                                                    <code className="p-2 text-green-400">{`
useFrame((state, delta) => {
    const time = state.clock.getElapsedTime()
    const euler = new THREE.Euler(0, time, 0)
    const quaternion = new THREE.Quaternion()
    quaternion.setFromEuler(euler)
    twister.current.setNextKinematicRotation(quaternion)
})                                                    
                                                    `}</code>
                                                </pre>
                                            </li>

                                            <li>To move the kinematic object 
                                                <span className="block mt-2 text-yellow-500">use the "setNextKinematicTranslation" of the RigidBody</span>
                                                <ul className="p-2 ml-2 text-xs space-y-2 list-disc">
                                                    <li>Accepts object: {`{x:0, y:0 z: 0}`}</li>
                                                </ul>
                                                <pre>
                                                    <code className="p-2 text-green-400">{`
useFrame((state, delta) => {
    const time = state.clock.getElapsedTime()
    ...

    const angle = time * .5;
    const x = Math.cos(angle) * 5;
    const z = Math.sin(angle) * 5;
    twister.current.setNextKinematicTranslation({ x:x, y: 1.3, z:z })

})                                                    
                                                    `}</code>
                                                </pre>
                                            </li>
                                        </ul>                                        
                                    </li>
                                </ul>
                            </li>        
                            <li className="text-yellow-500 text-xs">Events
                                <ul className="list-none p-2 text-white">
                                    <li>4 Different Events
                                        <ul className="list-decimal ml-2 p-2 space-y-2">
                                            <li><span className="text-green-400">onCollisionEnter</span>: When the RigidBody hits something
                                                <ul className="p-2 ml-2">
                                                    <li><pre><code className="text-blue-300 p-2">{`
const collisionEnter = () => {
    console.log('collisionEnter')
}                       

<RigidBody 
    ref={ cube } 
    colliders={ false }  
    position={ [-3, 8, 0] } 
    gravityScale={ 1 } 
    restitution={ .5 }
    onCollisionEnter={ collisionEnter }
>
                                                `}</code></pre></li>
                                                    <li className="list-disc">Adding Audio
                                                        <pre>
                                                            <code className="text-blue-300 p-2">{`
const [ hitSound ] = useState(() => new Audio("/assets/hit.mp3"))    

const collisionEnter = () => {
    hitSound.currentTime = 0
    hitSound.volume = Math.random();
    hitSound.play();
}
    
                                                            `}</code>
                                                        </pre>
                                                    </li>
                                                </ul>                                                
                                            </li>
                                            <li><span className="text-green-400">onCollisionExit</span>: When the RigidBody separates from the object it just hit
                                                <ul className="p-2 ml-2">
                                                    <li><pre><code className="text-blue-300 p-2">{`
<RigidBody 
    ref={ cube } 
    colliders={ false }  
    position={ [-3, 8, 0] } 
    gravityScale={ 1 } 
    restitution={ .5 }
    onCollisionExit={ () => console.log("exit") } 
>                                                    
                                                    `}</code></pre></li>
                                                </ul>
                                            </li>
                                            <li><span className="text-green-400">onSleep</span>: When the RigidBody starts sleeping
                                                <ul className="p-2 ml-2">
                                                    <li><pre><code className="text-blue-300 p-2">{`
<RigidBody 
    ref={ cube } 
    colliders={ false }  
    position={ [-3, 8, 0] } 
    gravityScale={ 1 } 
    restitution={ .5 }
    onSleep={ () => console.log("sleep") }
>                                                    
                                                    `}</code></pre></li>
                                                </ul>
                                            </li>
                                            <li><span className="text-green-400">onWake</span>: When the RigidBody stops sleeping
                                                <ul className="p-2 ml-2">
                                                    <li><pre><code className="text-blue-300 p-2">{`
<RigidBody 
    ref={ cube } 
    colliders={ false }  
    position={ [-3, 8, 0] } 
    gravityScale={ 1 } 
    restitution={ .5 }
    onWake={ () => console.log("wake") }
>                                                    
                                                    `}</code></pre></li>
                                                </ul>                                            
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>       
                            <li className="text-yellow-500 text-xs">Models and Physics
                                <ul className="list-decimal p-2 text-white">
                                    <li>Loading the model
                                        <ul className="p-2 ml-2">
                                            <li><pre><code className="text-blue-300 p-2">{`
const hamburger = useGLTF('/models/hamburger.glb')

<RigidBody scale={ .6 } position={[0, 8, 9]} mass={ 1.2 } restitution={ .5 }>
    <primitive object={ hamburger.scene } />
</RigidBody>                                            
                                            `}</code></pre>
                                            Each piece of the mesh has its own "CuboidCollider"
                                            </li>
                                            <li><pre><code className="text-blue-300">{`
<RigidBody colliders={ false } position={[0, 8, 9]} mass={ 1.2 } restitution={ .5 }>
    <primitive object={ hamburger.scene } scale={ .6 } />
    <CylinderCollider args={ [ 1.5, 2.75 ] } position={[0, 1.75, 0]}/>
</RigidBody>                                            
                                            `}</code></pre>
                                            Using "CylinderCollider" is a more realistic collider
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </li> 
                            <li className="text-yellow-500 text-xs">Stress Test
                                <ul className="list-decimal p-2 text-white">
                                    <li>Creating invisible walls
                                        <ul className="p-2 ml-2">
                                            <li><pre><code className="text-blue-300 p-2">{`
<RigidBody type="fixed">
    <CuboidCollider args={[ 15, 3, .5 ]} position={[0, 3.75, 15.5]} />
    <CuboidCollider args={[ 15, 3, .5 ]} position={[0, 3.75, -15.5]} />
    <CuboidCollider args={[ .5, 3, 15 ]} position={[15.5, 3.75, 0]} />
    <CuboidCollider args={[ .5, 3, 15 ]} position={[-15.5, 3.75, 0]} />
</RigidBody>            
                                            `}</code></pre>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>In order to test the limits of rapier, we need {`<instancedMesh/>`} to handle hundreds of objects
                                        <ul className="p-2 ml-2">
                                            <li><pre><code className="text-blue-300 p-2">{`

const cubesCount = 3
const cubes = useRef<THREE.InstancedMesh>(null!)

...

<instancedMesh ref={ cubes } args={[ undefined, undefined, cubesCount]}>
    <boxGeometry />
    <meshStandardMaterial color="tomato" />
</instancedMesh>      
                                            `}</code></pre>
                                            </li>                                           
                                        </ul>
                                    </li>
                                    <li>To create transformations for each of the cubes
                                        <pre><code className="text-blue-300 p-2">{`
const cubesCount = 3
const cubes = useRef<THREE.InstancedMesh>(null!)

const cubeTransforms = useMemo(() => {
    const positions: Vector3Array[] = []
    const rotations: Vector3Array[] = []
    const scales: Vector3Array[] = []

    for (let i = 0; i < cubesCount; i++) {
        positions.push([i * 5, 8, 0])
        rotations.push([0, 0, 0])
        scales.push([2, 2, 2])
    }
    return {
        positions,
        rotations,
        scales
    }

}, [])                                    
                                        `}</code></pre>
                                    </li>
                                    <li>To create RigidBody  on {`<instancedMesh/>`}, we need to use {`InstancedRigidBodies`} from rapier. Use the transformations 
                                        (positions, rotations, scales) in the {`<InstancedRigidBodies />`} props
                                        <pre><code className="text-blue-300 p-2">{`
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
                                        `}</code></pre>
                                    </li>
                                </ul>
                            </li>                
                        </ol>
                    </div>
                    
                    <div className="flex items-center justify-center w-full mb-2">
                        <Link href="/r3f/physics/colliders" className="w-full">
                            <button className="btn btn-secondary w-full">Colliders Examples</button> 
                        </Link>
                    </div>

                    <div className="flex flex-col items-start justify-start space-y-1 w-full border-0">
                        <button className="btn btn-primary w-full" onClick={ showControlsHandler }>Toggle Controls</button> 
                    </div>
                    
                </div>
            </div>

            <div id="canvas" style={{ width:"100%" }} className="flex items-center justify-center w-full h-full max-h-full border-0 border-yellow-700">
                <CanvasComponent
                    gl = {
                        {
                            antialias: true,
                            toneMapping: THREE.ACESFilmicToneMapping,
                            outputEncoding: THREE.sRGBEncoding
                        }
                    }

                    camera={
                        {
                            fov: 45,
                            near: 1,
                            far: 200,
                            position: [0, 5, 35]
                        }
                    }
                    
                    className="border-0"
                    showControls={ showControls }
                    // flat={true}
                >
                    
                    <Experience showControls={showControls} />
                
                </CanvasComponent>  
            
            </div>
            
            
            
        </div>
    )
}

export default SceneR3FPhysics;
