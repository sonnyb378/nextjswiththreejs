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




const SceneR3F3DText = () => {

    const [isShow, setIsShow] = useState(true);
    const [showControls, setShowControls] = useState(true);

    const { perfVisible } = useControls('r3F perf', {
        perfVisible: false
    })

    // const planeControl = useControls('Plane Component', {
    //     color: "#c0dc0d"
    // })


    const toggleHandler = () => {
        setIsShow(!isShow)
    }

    const showControlsHandler = () => {
        setShowControls(!showControls)
    }

    const torusGeometry = new THREE.TorusGeometry(1, 0.6, 16, 32)
    
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
                        <h1 className="text-orange-500">3D Text</h1>
                        <ol className='list-decimal ml-[8px] text-xs  p-2 space-y-2'>
                            <li>Typeface fonts must be used for Text3D</li>
                            <li>To create your own typeface font: 
                                <ul className="text-xs space-y-2 mt-2">
                                    <li><code className="whitespace-pre-wrap break-all text-green-400 text-xs">{`http://gero3.github.io/facetype.js`}</code></li>
                                </ul>
                            </li>     
                            <li>Import "Center" and "Text3D" from drei
                                <ul className="text-xs space-y-2 mt-2">
                                    <li className="whitespace-pre-wrap break-all text-green-400">{`import { Text3D, Center } from "@react-three/drei";`}</li>
                                </ul>
                            </li>  
                            <li>Use "Center" and "Text3D" in your scene
                                <ul className="text-xs space-y-2 mt-2">
                                    <li className="whitespace-pre-wrap break-all text-green-400">
                                        <code>{`<Center><Text3D font="/assets/fonts/helvetiker_regular.typeface.json" size={ 3 } position={ [0, -.7, 0] } >{ children }</Text3D></Center>`}</code>
                                    </li>
                                </ul>
                            </li>   
                            <li>We can use props used in <span className="text-green-400">TextGeometry</span>
                                <ul className="text-xs space-y-2 mt-2">
                                    <li className="whitespace-pre-wrap break-all text-green-400">
                                        size, height, curveSegments, etc...
                                    </li>
                                </ul>
                            </li>  
                            <li className="whitespace-pre-wrap break-all">Replace "meshNormalMaterial" with MatcapTexture. Use <span className="text-green-400">useMatcapTexture</span> from drei
                                <ul className="text-xs space-y-2 mt-2">
                                    <li className="whitespace-pre-wrap break-all text-green-400">
                                        Do not use Matcap in production
                                    </li>
                                </ul>
                            </li>  
                            <li className="whitespace-pre-wrap break-all">Destructure to get the "Texture" from "useMatcapTexture"
                                <ul className="text-xs space-y-2 mt-2">Get matcaps texture here: https://github.com/emmelleppi/matcaps
                                    <li className="whitespace-pre-wrap break-all text-green-400 mt-2">
                                        {`const [matCapTexture] = useMatcapTexture('3E3E3E_AEAEAE_848484_777777', 256)`}
                                    </li>
                                </ul>
                            </li>   
                            <li className="whitespace-pre-wrap break-all">Use "matCapTexture" in "matcap" prop of {`<meshMatcapMaterial />`}
                                <ul className="text-xs space-y-2 mt-2">
                                    <li className="whitespace-pre-wrap break-all text-green-400 mt-2">
                                        {`<meshMatcapMaterial matcap={ matCapTexture } />`}
                                    </li>
                                </ul>
                            </li>   
                            <li className="whitespace-pre-wrap break-all">Create multiple "Donuts"
                                <ul className="text-xs space-y-2 mt-2 list-disc">
                                    <li className="whitespace-pre-wrap break-all mt-2">Create a torus geometry
                                        <ul>
                                            <li className="text-green-400 p-2">{`const torusGeometry = new THREE.TorusGeometry(1, 0.6, 16, 32)`}</li>
                                        </ul>
                                    </li>
                                    <li className="whitespace-pre-wrap break-all mt-2">Add the "torusGeometry" to the geometry prop of the mesh
                                        <ul>
                                            <li className="text-green-400 p-2">{`<mesh geometry={ torusGeometry } />`}</li>
                                        </ul>                                        
                                    </li>
                                    <li>Create an empty array
                                        <ul>
                                            <li className="text-green-400 p-2">{`const tempArray = [...Array(80)]`}</li>
                                        </ul>
                                    </li>
                                    <li>Using map(), insert instances of torus in tempArray
                                        <ul>
                                            <li className="text-green-400 p-2">{`tempArray.map((_, i) => {`}</li>
                                        </ul>
                                    </li>
                                    <li className="whitespace-pre-wrap break-all mt-2">MatcapMaterial
                                        <ul>
                                            <li className="p-2">Use "useMatcapTexture"
                                                <ul>
                                                    <li className="text-green-400 mt-2">{`const [matCapTexture] = useMatcapTexture('320455_720DBE_560496_47047B', 256)`}</li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>Use 'meshMatcapMaterial' to render donut texture
                                        <ul>
                                            <li className="text-green-400 p-2">{`<meshMatcapMaterial matcap={matCapTexture} />`}</li>
                                        </ul>
                                    </li>
                                    
                                </ul>
                            </li>  
                            <li className="whitespace-pre-wrap break-all">
                                Animating Donuts
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
                    >
                        
                        {
                            perfVisible && <Perf position="bottom-right" />
                        }

                        <PerspectiveCamera rotation={ [0, .45, 0]} position={[0, -.5, 0]}>                    
                            <color args={ ['#4db9ce'] } attach="background" />
                            <ambientLight intensity={0.5} />
                            <DirectionalLight 
                                position={ [1, 5, 6] } 
                                intensity={ 1.5 } 
                                scale={1} 
                                castShadow
                                shadow-normalBias={ 0.04 }
                            />

                            <Text3DComponent matID="323C4D_B79039_7C6A44_605C48">
                                Hello World
                                {/* <meshNormalMaterial /> */}
                            </Text3DComponent>

                            <Donuts torus={torusGeometry} matID="320455_720DBE_560496_47047B" />

                            {/* <PlaneComponent 
                                scale={ 10 }
                                position={[0, 0, 0]}
                                rotation={[-Math.PI * .5, 0, 0]}
                                receiveShadow
                            >
                                <meshStandardMaterial color={ planeControl.color } side={ THREE.DoubleSide } />
                            </PlaneComponent>  */}

                            <OrbitControls makeDefault  />
                        </PerspectiveCamera>
                    </CanvasComponent>
               
            </div>
            
            
            
        </div>
    )
}

export default SceneR3F3DText;
