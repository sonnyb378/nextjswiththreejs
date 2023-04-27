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
import { ConvexHullCollider, CylinderCollider, Debug, HeightfieldCollider, Physics, RigidBody } from "@react-three/rapier";
import ButtonNav from "../ui/buttonnav/ButtonNav";
import Link from "next/link";

// import { HeightfieldArgs } from "@react-three/rapier";

const SceneHeightfieldCollider = () => {

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
                 
                    <div className="flex flex-col items-start justify-start space-y-1 w-full mt-4 border-0 text-sm">
                        <h1 className="text-orange-500">HeightFieldCollider</h1>
                        <ol className='list-decimal ml-[8px] text-xs  w-full p-2 space-y-2 border-0 text-orange-500'>
                            
                            <li className="text-yellow-500">Colliders
                                <pre><code className="text-green-400 p-2">{`
<RigidBody colliders={ false } >
  ...
</RigidBody>
                                `}</code></pre>
                            </li>  
                            <li className="text-yellow-500">You can add multiple colliders inside a {`<RigidBody />`}
                                <pre>
                                <code className="text-green-400">
                                    {`
<RigidBody colliders={false} position={[0, 5, 0]} rotation={[0, 0, 0]} >
    <HeightfieldCollider args={ [2,2,[.2,.5],{ x:1, y:2, z:2 }] } />
    <mesh castShadow>
        <cylinderGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="mediumpurple" />
    </mesh>
</RigidBody>                                
                                    `}
                                </code>
                            </pre>
                            </li>   
                            <li className="text-yellow-500">args
                                <ul className="text-white p-2 list-decimal">
                                    <li>half-height</li>   
                                    <li>radius</li>   
                                </ul>
                            </li>                                 
                        </ol>
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
                                position: [0, 5, 15]
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
                            
                            <RigidBody colliders={false} position={[0, 5, 0]} rotation={[0, 0, 0]} >
                                {/* <HeightfieldCollider args={ [7, 7,[3,1,2,1,3],{ x:3, y:3, z:3 }] } /> */}
                                <mesh castShadow>
                                    <cylinderGeometry args={[1, 1, 1]} />
                                    <meshStandardMaterial color="mediumpurple" />
                                </mesh>
                            </RigidBody>

                            <RigidBody type="fixed">
                                <mesh scale={ 1.2 } rotation={[0, Math.PI * .25, 0]} receiveShadow>
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

export default SceneHeightfieldCollider;
