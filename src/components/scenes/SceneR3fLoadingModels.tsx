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
import HamburgerTransformed from "@/components/models/HamburgerTransformed";
import Fox from "@/components/models/Fox";



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
                
                <div id="text-container" className={`scrollbar scrollbar-thumb-gray-800 scrollbar-track-zinc-900 transition-all flex flex-col w-[300px]  ${ isShow ? "ml-[0px]": "-ml-[310px]" } items-start justify-start p-2 border-0 border-emerald-500 overflow-y-auto h-full`}>
                    
                    <div className="flex flex-col items-start justify-start space-y-1 w-full border-0">
                        <button className="btn btn-primary w-full" onClick={ showControlsHandler }>Toggle Controls</button> 
                    </div>
                    
                    <div className="flex flex-col items-start justify-start space-y-1 w-full mt-4 border-0 text-sm">
                        <h1 className="text-orange-500">Loading Models</h1>
                        <ol className='text-yellow-400 list-decimal ml-[8px] p-2'>
                            <li>GLTFLoader
                                <ul className="text-white text-xs p-2 list-disc">
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
                                </ul>
                            </li>
                            <li>Draco Version of the model
                                <h1 className="text-pink-600 text-sm">Hard version</h1>
                                <ul className="text-white text-xs p-2 list-disc">
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
                                </ul>
                            </li>
                            <li>Lazy Loading
                                <h1 className="text-pink-600 text-sm">Loading Big Models</h1>
                                <ul className="text-white text-xs p-2 list-disc">
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
                                </ul>
                            </li>
                            <li>
                                GLTF loading with drei
                                <ul className="text-white text-xs p-2 list-disc">
                                    <li>
                                        <ul className="p-2">
                                            <li >Import "useGLTF" from drei</li>
                                            <li className="text-green-400 italic text-xs  p-2">
                                                {`import { useGLTF } from "@react-three/drei";`}
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <ul className="p-2">
                                            <li >Use "useGLTF", enter the path to the glb file as param</li>
                                            <li className="whitespace-pre-wrap break-alltext-green-400 italic text-xs  p-2">
                                                {`const model = useGLTF("/models/hamburger.glb")`}
                                            </li>
                                        </ul>
                                    </li>
                                    <li> 
                                        <ul className="p-2">
                                            <li >Add the "model.scene" in the object prop</li>
                                            <li className="text-green-400 italic text-xs  p-2">
                                                {` <primitive ref={ mesh } object={ model.scene } />`}
                                            </li>
                                        </ul>
                                    </li>
                                    <li> 
                                        <ul className="p-2">
                                            <li >We can even use draco version without providing the draco decoder</li>
                                            <li className="whitespace-pre-wrap break-all text-green-400 italic text-xs  p-2">
                                                {`const model = useGLTF("/models/hamburger-draco.glb")`}
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                Preloading with useGLTF
                                <ul className="text-white text-xs p-2 list-disc">
                                    <li>
                                        <ul className="p-2">
                                            <li >"useGLTF" has a preloading method</li>
                                            <li className="whitespace-pre-wrap break-all text-green-400 italic text-xs  p-2">
                                                {`export default HamburgerDrei;`}<br/><br/>
                                                {`useGLTF.preload('/models/hamburger-draco.glb')`}
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                Multiple Instances
                                <ul className="text-white text-xs p-2 list-disc">
                                    <li>
                                        <ul className="p-2">
                                            <li >Import "Clone" helper from drei</li>
                                            <li className="text-green-400 italic text-xs  p-2">
                                                {`import { Clone }  from "@react-three/drei"`}
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <ul className="p-2">
                                            <li >Add multiple {`<Clone ... />`}</li>
                                            <li className="whitespace-pre-wrap break-all text-green-400 italic text-xs  p-2">
                                                {`<>`}<br/>
                                                {`<Clone object={ model.scene } scale={ .35 } position-x={ 4 } />`}<br/>
                                                {`<Clone object={ model.scene } scale={ .35 } position-x={ 0 } />`}<br/>
                                                {`<Clone object={ model.scene } scale={ .35 } position-x={ -4 } />`}<br/>
                                                {`<>`}<br/>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>                                
                            </li>
                            <li>
                                GLTF to Component
                                <ul className="text-white text-xs p-2 list-disc">
                                    <li>
                                        <ul className="p-2">
                                            <li >We can create a GLTF file to a React Fiber Component</li>
                                            <li className="text-xs  p-2">Command Line Tool: "https://github.com/pmndrs/gltfjsx"</li>
                                            <li className="text-xs  p-2">Online Version: "https://gltf.pmnd.rs"</li>
                                        </ul>
                                    </li>
                                    <li>In the terminal, root folder of project, enter:
                                        <ul className="whitespace-pre-wrap break-all text-green-400 italic text-xs p-2">
                                            <li>{`npx gltfjsx public/models/hamburger.glb -t -T`}</li>
                                        </ul>
                                    </li>
                                    <li>Copy / Move the generated .glb (usually with '-transformed') in your public folder
                                        <ul className="whitespace-pre-wrap break-all text-green-400 italic text-xs p-2">
                                            <li>{`/public/models/hamburger-transformed.glb`}</li>
                                        </ul>
                                    </li>
                                    <li>Copy / Move the generated .jsx / .tsx file to your "components" folder. You can rename it if you want
                                        <ul className="whitespace-pre-wrap break-all text-green-400 italic text-xs p-2">
                                            <li>{`/src/components/models/HamburgerTransformed.tsx`}</li>
                                        </ul>
                                    </li>
                                    <li>You can now use the component in your scene</li>
                                </ul>                                
                            </li>
                            <li>
                                Animation
                                <ul className="text-white text-xs p-2 list-disc">
                                    <li>Playing the fox animation
                                        <ul className="list-disc p-2 space-y-2">
                                            <li>"useAnimations" helper from drei
                                                <ul>
                                                    <li className="whitespace-pre-wrap break-all text-green-400 italic text-xs p-2">
                                                        {`import { useGLTF, useAnimations } from "@react-three/drei"`}
                                                    </li>
                                                </ul>
                                            </li>                                           
                                            <li>Create a variable (eg: "animations") then assign the "useAnimations" helper
                                                <ul>
                                                    <li className="whitespace-pre-wrap break-all text-green-400 italic text-xs p-2">
                                                        {`const animations = useAnimations(fox.animations, fox.scene)`}
                                                    </li>
                                                    <li>by console logging the "animations" variable, you can see the names of the animations under "actions" property </li>
                                                </ul>
                                            </li>
                                            <li >Play an animation
                                                <ul className="list-disc p-2 space-y-2">
                                                    <li>to target an animation, use <span className="text-green-400">{`animations.actions.Run`}</span></li>
                                                    <li className="text-white">
                                                        Call the animation on first render
                                                        <span className="whitespace-pre-wrap break-all text-green-400 text-xs">
                                                            {`
                                                            useEffect(() => {
                                                                console.log(animations)
                                                                const action = animations.actions.Run
                                                                action?.play()
                                                            }, [])
                                                            `}
                                                        </span>
                                                        
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                            <li>Changing animations
                                <ul className="text-white text-xs p-2 list-disc">
                                    <li>use "crossFadeFrom" from the animation
                                        <span className="block mt-2 whitespace-pre-wrap break-all text-green-400">{`animation.actions.Walk.crossFadeFrom(animations.actions.Run, 1)`}</span>
                                    </li>
                                </ul>
                            </li>
                            <li>Controlling Animations
                                <ul className="text-white text-xs list-disc">
                                    <li className="p-2">use Leva to add the fox actions
                                        <code className="whitespace-pre-wrap break-all text-left p-2 text-green-400 block">
                                            {`    
                                                const foxActions = useControls("Fox", {
                                                    animationName: { options: animations.names }
                                                })
                                            `}
                                        </code>
                                    </li>
                                    <li className="p-2">use Leva to add the fox actions
                                        <code className="whitespace-pre-wrap break-all text-left p-2 text-green-400 block">
                                            {`    
                                                useEffect(() => {                                                    
                                                    const action = animations.actions[foxActions.animationName]
                                                    action?.reset().fadeIn(.5).play()
                                            
                                                    return () => {
                                                        action?.fadeOut(.5)
                                                    }
                                                }, [foxActions])
                                            `}
                                        </code>
                                    </li>
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

                            
                            <Suspense fallback={ <Loading /> }>
                                {/* <Iphone13 /> */}
                                {/* <Iphone13Draco /> */}
                                {/* <Hamburger /> */}
                                {/* <HamburgerDraco /> */}
                                {/* <FlightHelmet /> */}
                                <HamburgerTransformed scale={ 1 } position={[5, 0, 0]} />
                                <Fox scale={ .075 } position={ [-5, 0.01, 0] } rotation={[0, .3, 0]} />
                            </Suspense>
                            

                            <PlaneComponent 
                                scale={ 10 }
                                position={[0, 0, 0]}
                                rotation={[-Math.PI * .5, 0, 0]}
                                receiveShadow
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
