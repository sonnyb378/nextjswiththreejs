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
import { CuboidCollider, Debug, Physics, RigidBody } from "@react-three/rapier";
import ButtonNav from "../ui/buttonnav/ButtonNav";
import Link from "next/link";



const SceneR3FPhysics = () => {

    const [isShow, setIsShow] = useState(true);
    const [showControls, setShowControls] = useState(true);

    const { perfVisible } = useControls('r3F perf', {
        perfVisible: false
    })


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
                            <li className="text-yellow-500">{`<Debug>`}
                                <ul className="w-full text-xs space-y-2 mt-2 list-disc p-2 text-white">
                                    <li className="list-none"><pre><code className="text-green-400 p-2">{`import { Debug } from "@react-three/rapier";`}</code></pre></li>
                                    <li>{`<Debug>`} can only be used inside {`<Physics>`} tag</li>
                                    <li>After adding {`<Debug>`} inside the {`<Physics>`} tag, you will see a wireframe around the meshes, it is called <span className="text-yello-500">"Colliders"</span></li>
                                    <li>{`<Debug>`} development only</li>
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

                        <Physics>                             
                            <Debug />
                            
                            {/* <RigidBody>
                                <mesh scale={ 1.6 } position-y={ 10 } position-x={ 3.75 } castShadow>
                                    <boxGeometry args={[2,2,2]} />
                                    <meshStandardMaterial color="hotpink" />
                                </mesh>
                            </RigidBody> */}

                            <RigidBody colliders="ball">
                                <mesh position-y={ 20 } position-x={ .75 } castShadow>
                                    <sphereGeometry />
                                    <meshStandardMaterial color="#ffff00" />
                                </mesh>
                            </RigidBody>
                            
                            <RigidBody colliders={false} position={[0, 5, 0]} rotation={[Math.PI * .5, 0, 0]}  >
                                <CuboidCollider args={[1.5, 1.5, .5]}/>
                                <CuboidCollider args={[1, 1, 1]}/>
                                <mesh castShadow>
                                    <torusGeometry args={[1, .5, 16, 32]} />
                                    <meshStandardMaterial color="mediumpurple" />
                                </mesh>
                            </RigidBody>

                            <RigidBody type="fixed">
                                <mesh scale={ 3 } receiveShadow>
                                    <boxGeometry args={[10, .5, 10 ]} />
                                    <meshStandardMaterial color="greenyellow" />
                                </mesh> 
                            </RigidBody>

                        </Physics>
                            
                        <OrbitControls makeDefault  />
                    </CanvasComponent>
               
            </div>
            
            
            
        </div>
    )
}

export default SceneR3FPhysics;
