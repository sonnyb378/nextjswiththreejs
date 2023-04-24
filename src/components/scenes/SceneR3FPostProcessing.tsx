// "use client"

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

import { EffectComposer } from "@react-three/postprocessing";

const SceneR3FPostProcessing = () => {

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
                        <h1 className="text-orange-500">Post Processing</h1>
                        <ol className='list-decimal ml-[8px] text-xs  w-full p-2 space-y-2 border-0 text-orange-500'>
                            <li className="text-yellow-500">We need two(2) dependencies
                                <ul className="w-full text-xs space-y-2 mt-2 list-disc p-2 text-white">
                                    <li>R3F implements it as @react-three/postprocessing</li>
                                    <li>github.com/pmndrs/postprocessing</li>
                                    <li className="list-none p-2">Only install @react-fiber/postprocessing as it will also install "postprocessing"
                                        <pre><code className="text-green-400 p-2">
                                        {`
npm install @react-three/postprocessing
                                        `}</code></pre>
                                    </li>
                                    <li className="list-none p-2">Use {`<EffectComposer>...</EffectComposer>`} in your scene
                                        <pre>
                                            <code className="text-green-400 p-2">{`
<EffectComposer>
    // add effect here
</EffectComposer>                                            
                                            `}</code>
                                        </pre>
                                    </li>
                                    <li>Note: @react-three/postprocessing will not work in NextJS if you are using "/app" </li>
                                </ul>
                            </li>  
                            <li>MultiSampling
                                <ul className="w-full text-xs space-y-2 mt-2 list-disc p-2 text-white">
                                    <li>MultiSampling is used to prevent anti-aliasing effect. Default value is 8
                                        <pre>
                                            <code className="text-green-400 p-2">{`
<EffectComposer multisampling={ 0 }>
    // add effect here      
</EffectComposer>                                            
                                            `}</code>
                                        </pre></li>
                                </ul>
                            </li>  
                            <li>Effects
                                <ul className="w-full text-xs space-y-2 mt-2 list-disc p-2 text-white">
                                    <li>Documentation: https://github.com/pmndrs/postprocessing
                                        <pre>
                                            <code className="text-green-400 p-2">{`
<EffectComposer>
        
</EffectComposer>                                            
                                            `}</code>
                                        </pre></li>
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

                            <Sphere     
                                position={[ -3.2, 2, 0] } 
                                scale={ 5 }
                                args={[.3]}
                                visible={ true }
                                onClick={ (event) => { event.stopPropagation() } }
                            >
                                <meshStandardMaterial color={ `#e38100` } 
                            />
                            </Sphere>   

                            <EffectComposer>
                                <BoxDrei position={[ 3.2, 2, 0]} scale={ 5 }>
                                    <meshStandardMaterial color='hotpink' />
                                </BoxDrei>
                            </EffectComposer>


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

export default SceneR3FPostProcessing;
