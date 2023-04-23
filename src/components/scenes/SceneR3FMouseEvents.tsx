"use client"

import * as THREE from "three"
import CanvasComponent from "@/components/canvas/CanvasComponent";

import { OrbitControls, PerspectiveCamera, AsciiRenderer,  Stage, Lightformer, Sphere, Sky, BakeShadows, SoftShadows, AccumulativeShadows, RandomizedLight, Environment, ContactShadows, Plane, Box, useMatcapTexture } from "@react-three/drei";
import PlaneComponent from "@/components/plane/PlaneComponent";
import { button, useControls } from "leva";
import { Perf } from "r3f-perf";
import ArrowRight from "../icons/ArrowRight";
import { useEffect, useRef, useState, Suspense } from "react";
import BoxDrei from "@/components/box/BoxDrei";
import DirectionalLight from "@/components/lights/DirectionalLight";
import Text3DComponent from "../text3d/Text3D";
import Donuts from "@/components/models/Donuts";
import Portal from "@/components/models/Portal";
import HamburgerDrei from "@/components/models/HamburgerDrei";
import HamburgerTransformed from "@/components/models/HamburgerTransformed";


const SceneR3FMouseEvents = () => {

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
                        <h1 className="text-orange-500">Mouse Events</h1>
                        <ol className='list-decimal ml-[8px] text-xs  w-full p-2 space-y-2 border-0 text-orange-500'>
                            <li>Events
                                <ul className="w-full text-xs space-y-2 mt-2 list-disc p-2 text-white">
                                    <li>Create a function for handling the click event
                                        <pre>
                                            <code className="text-green-400 text-xs">{`
const boxClicked = (event: ThreeEvent<MouseEvent>) => {
    const material = meshRef.current.material as THREE.MeshStandardMaterial;
    material.color.set(\`hsl(${Math.random() * 360}, 100%, 75%)\`)
    console.log(event)
}                                            
                                            `}</code>
                                        </pre>                                       
                                    </li>
                                    <li>Use the onClick prop
                                        <pre>
                                            <code className="text-green-400 text-xs">{`
<Box
    {...props}  
    args={[.5, .5, .5]}         
    ref={meshRef}  
    onClick={ boxClicked }
>                                            
                                            `}</code>
                                        </pre>
                                    </li>
                                    <li>More {`ThreeEvent<MouseEvent>`}
                                        <ul className="p-2 ml-2 list-decimal">
                                            <li>onDoubleClick</li>
                                            <li>onPointerUp</li>
                                            <li>onPointerDown</li>
                                            <li>onPointerMissed</li>
                                            <li>etc...</li>
                                        </ul>
                                    </li>
                                    <li>Occluding
                                        <ul className="p-2 ml-2 list-decimal">
                                            <li>If you try to click an object (with onClick) behind another object, the onClick event will still trigger. This is the default behaviour</li>
                                            <li>In the object, in this case the sphere, we want to stop propagation when the sphere is in front of the cube
                                                <pre>
                                                    <code className="text-green-400 p-2">{`
<Sphere     
    position={[ -2.2, 2, 0] } 
    scale={ 5 }
    args={[.3]}
    visible={ true }
    onClick={ (event) => { event.stopPropagation() } }
>
    <meshStandardMaterial color={ \`#e38100\` } 
/>
</Sphere>
                                                    `}</code>
                                                </pre>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>Cursor
                                        <ul className="p-2 ml-2 list-decimal">
                                            <li>Change the cursor pointer if the object is clickable</li>
                                            <li>Import "useCursor" from drei</li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                            <li>Events on Complex Objects
                                <ul className="w-full text-xs space-y-2 mt-2 list-disc p-2 text-white">
                                    <li>To prevent the onClick event propagation for complex objects
                                        <pre>
                                            <code className="text-green-400 text-xs">{`
const clickHandler= (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
}                                         
                                            `}</code>
                                        </pre> 
                                        <pre>
                                            <code className="text-green-400 text-xs">{`
<group {...props} dispose={null} onClick={ clickHandler }> ...                                            
                                            `}</code>
                                        </pre>                                      
                                    </li>
                                </ul>
                            </li>
                            <li>Performance
                                <ul className="w-full text-xs space-y-2 mt-2 list-disc p-2 text-white">
                                    <li>Minimize the number of objects that listen to events and avoid testing compliex geometries</li>
                                    <li><span className="text-green-400">meshBounds</span> from drei
                                        <ul className="list-decimal p-2 ml-2">
                                            <li><span className="text-green-400">meshBounds</span> only works on single meshes which is why we can't use it on the Hamburger since it is composed of multiple meshes</li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                            <li>BVH (Bounding Volume Heirarchy)
                                <ul className="w-full text-xs space-y-2 mt-2 list-disc p-2 text-white">
                                    <li>If you have very complex geometries and still need the pointer events to be accurate</li>
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
                                fov: 75,
                                near: 1,
                                far: 200,
                                position: [0, 5, 10]
                            }
                        }
                        className="border-0"
                        showControls={ showControls }
                        flat={true}
                    >
                        
                        {
                            perfVisible && <Perf position="bottom-right" />
                        }

                        <color args={["#030202"]} attach="background" />
                        
                        <PerspectiveCamera rotation={ [0, -.45, 0]} position={[0, 2, 0]}>   
                            <ambientLight intensity={0.5} />
                            <DirectionalLight 
                                position={ [1, 5, 6] } 
                                intensity={ 1.5 } 
                                scale={1} 
                                castShadow
                                shadow-normalBias={ 0.04 }
                            />

                            <HamburgerTransformed position={[ 0, 1, 5]} scale={ .50 } />
                            <Sphere     
                                position={[ -2.2, 2, 0] } 
                                scale={ 5 }
                                args={[.3]}
                                visible={ true }
                                onClick={ (event) => { event.stopPropagation() } }
                            >
                                <meshStandardMaterial color={ `#e38100` } 
                            />
                            </Sphere>   

                            <BoxDrei position={[ 3.2, 2, 0]} scale={ 5 }>
                                <meshStandardMaterial color='hotpink' />
                            </BoxDrei>

                            <PlaneComponent 
                                scale={ 10 }
                                position={[0, 0, 0]}
                                rotation={[-Math.PI * .5, 0, 0]}
                                receiveShadow
                            >
                                <meshStandardMaterial color={ "#ffff00" } side={ THREE.DoubleSide } />
                            </PlaneComponent> 

                            <OrbitControls makeDefault  />
                        </PerspectiveCamera>
                    </CanvasComponent>
               
            </div>
            
            
            
        </div>
    )
}

export default SceneR3FMouseEvents;
