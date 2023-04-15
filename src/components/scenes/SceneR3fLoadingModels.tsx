"use client"

import * as THREE from "three"
import CanvasComponent from "@/components/canvas/CanvasComponent";

import { OrbitControls, PerspectiveCamera, AsciiRenderer,  Stage, Lightformer, Sphere, Sky, BakeShadows, SoftShadows, AccumulativeShadows, RandomizedLight, Environment, ContactShadows, Plane, Box } from "@react-three/drei";
import PlaneComponent from "@/components/plane/PlaneComponent";
import { button, useControls } from "leva";
import { Perf } from "r3f-perf";
import ArrowRight from "../icons/ArrowRight";
import { useEffect, useRef, useState, Suspense } from "react";
import BoxDrei from "@/components/box/BoxDrei";
import DirectionalLight from "@/components/lights/DirectionalLight";
import { Canvas } from "@react-three/fiber";
import Iphone13 from "@/components/models/Iphone13";
import Hamburger from "@/components/models/Hamburger";
import Iphone13Draco from "@/components/models/Iphone13Draco";
import HamburgerDraco from "@/components/models/HamburgerDraco";
import FlightHelmet from "@/components/models/FlightHelmet";
import Loading from "@/components/loading/Loading";
import HamburgerDrei from "@/components/models/HamburgerDrei";



const SceneR3fLoadingModels = () => {

    const [isShow, setIsShow] = useState(true);
    const [showControls, setShowControls] = useState(true);

    const { perfVisible } = useControls('r3F perf', {
        perfVisible: false
    })

    const planeControl = useControls('Plane Component', {
        color: "#c0dc0d"
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
                
                <div id="text-container" className={`scrollbar bg- scrollbar-thumb-gray-800 scrollbar-track-zinc-900 transition-all flex flex-col w-[300px]  ${ isShow ? "ml-[0px]": "-ml-[310px]" } items-start justify-start p-2 border-0 border-emerald-500 overflow-y-auto h-full`}>
                    
                    <div className="flex flex-col items-start justify-start space-y-1 w-full border-0">
                        <button className="btn btn-primary w-full" onClick={ showControlsHandler }>Toggle Controls</button> 
                    </div>
                    <div className="flex flex-col items-start justify-start space-y-1 w-full mt-4 border-0 text-sm">
                        <h1 className="text-orange-500">Loading Models</h1>
                        <ol className='text-yellow-400 list-decimal p-2'>
                            <li>GLTFLoader
                                <ol className="text-white text-xs p-2 list-disc">
                                    <li>Import useLoader from @react-three/fiber
                                        <ul>
                                            <li className="p-2"><code className="text-green-400">{`import { useLoader } from "@react-three/fiber"`}</code></li>                                        
                                        </ul>
                                    </li>                                    
                                    <li>Import GLTFLoader from the three examples
                                        <ul>
                                            <li className="whitespace-pre-wrap break-all p-2"><code className="text-green-400">{`import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'`}</code></li>                                        
                                        </ul>
                                    </li>
                                    <li>Load the .glb model
                                        <ul>
                                            <li className="whitespace-pre-wrap break-all p-2"><code className="text-green-400">{`const iphoneModel = useLoader(GLTFLoader, '/models/iphone13.glb')`}</code></li>
                                        </ul>
                                    </li>
                                    <li>Use <span className="text-green-400">{`<primitive object={ iphoneModel.scene } />`}</span> to render the model</li>
                                </ol>
                            </li>
                            <li>Draco Version of the model
                                <h1 className="text-pink-600 text-sm">Hard version</h1>
                                <ol className="text-white text-xs p-2 list-disc">
                                    <li>Import <span className="text-green-400">"{`DRACOLoader`}"</span>
                                        <ul className="p-2">
                                            <li className="whitespace-pre-wrap break-all italic"><code className="text-green-400">{`import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";`}</code></li>
                                        </ul>
                                    </li>
                                    <li>Instantiate the <span className="text-green-400">{`DRACOLoader`}</span> class and add it to the <span className="text-green-400">{`GLTFLoader`}</span>
                                        <ul className="p-2">
                                            <li className="whitespace-pre-wrap break-all text-green-400 italic">{`const model = useLoader(GLTFLoader, '/models/iphone13-draco.glb', (loader) => {`}<br /><br />                                    
                                                <span className="text-green-400">{`const dracoLoader = new DRACOLoader();`}</span><br /><br /> 
                                                {`dracoLoader.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.6/");`} <br /><br /> 
                                                {`loader.setDRACOLoader(dracoLoader);`} <br />
                                                {`})`}
                                            </li>
                                        </ul>
                                    </li>
                                    <li>Draco Decoder:
                                        <ul className="p-2">
                                            <li className="whitespace-pre-wrap break-all text-green-400 italic">{`https://www.gstatic.com/draco/versioned/decoders/1.5.6/`}</li>
                                        </ul>
                                    </li>
                                    <li>Render the model
                                        <ul className="p-2">
                                            <li className="text-green-400 italic">{`return( <primitive object={ model.scene } /> )`}</li>
                                        </ul>
                                    </li>
                                </ol>
                            </li>
                            <li>Lazy Loading
                                <h1 className="text-pink-600 text-sm">Loading Big Models</h1>
                                <ol className="text-white text-xs p-2 list-disc">
                                    <li>Using "Suspense". Put your model component inside the "Suspense" tag
                                        <ul className="p-2">
                                            <li className="text-green-400 italic text-xs">
                                                {`
                                                <Suspense>
                                                    <FlightHelmet />
                                                </Suspense>
                                                `}
                                            </li>
                                        </ul>
                                    </li>
                                    <li>Using "fallback" property to display something while waiting the model to load
                                        <ul className="p-2">
                                            <li className="text-green-400">{`<Suspense fallback={ <Loading /> }>`}</li>
                                        </ul>
                                    </li>
                                </ol>
                            </li>
                            <li>
                                GLTF loading with drei
                                <ol className="text-white text-xs p-2 list-disc">
                                    <li>
                                        <ul className="p-2">
                                            <li >Import "Gltf" from drei</li>
                                            <li className="text-green-400 italic text-xs  p-2">
                                                {`<Gltf ref={mesh} src="/models/hamburger.glb" />`}
                                            </li>
                                        </ul>
                                    </li>
                                </ol>
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

                        <PerspectiveCamera rotation={ [0, -.90, 0]} position={[0, -.5, 0]}>                    
                            <color args={ ['#4db9ce'] } attach="background" />
                            <ambientLight intensity={0.5} />
                            <DirectionalLight 
                                position={ [1, 5, 6] } 
                                intensity={ 1.5 } 
                                scale={1} 
                            />

                            
                            <Suspense fallback={ <Loading /> }>
                                {/* <Iphone13 /> */}
                                {/* <Iphone13Draco /> */}
                                {/* <Hamburger /> */}
                                {/* <HamburgerDraco /> */}
                                {/* <FlightHelmet /> */}
                                <HamburgerDrei src={"/models/hamburger.glb"} position={[0, 1, 0]} scale={ .5 } />
                            </Suspense>
                            

                            <PlaneComponent 
                                scale={ 10 }
                                position={[0, 0, 0]}
                                rotation={[-Math.PI * .5, 0, 0]}
                            >
                                <meshStandardMaterial color={ planeControl.color } side={ THREE.DoubleSide } />
                            </PlaneComponent> 

                            <OrbitControls makeDefault  />
                        </PerspectiveCamera>
                    </CanvasComponent>
               
            </div>
            
            
            
        </div>
    )
}

export default SceneR3fLoadingModels
