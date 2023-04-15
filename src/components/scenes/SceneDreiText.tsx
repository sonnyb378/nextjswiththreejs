"use client"

import * as THREE from "three"
import CanvasComponent from "@/components/canvas/CanvasComponent";
import { OrbitControls, Html, Text } from "@react-three/drei";
import ArrowRight from "@/components/icons/ArrowRight";
import { useState } from "react";

const SceneDreiText = () => {
    const [isShow, setIsShow] = useState(true);

    const toggleHandler = () => {
        setIsShow(!isShow)
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
                        <h1 className="text-orange-500">SDF (Signed Distance Field)</h1>
                        <p className="p-2">which is a mathematical function that describes the distance between a point in space and a geometric object. In the context of 3D graphics and text rendering using React Three Fiber (r3f) and Three.js, SDFs are often used to create high-quality, anti-aliased text.
                        In r3f and Three.js, SDF-based text rendering is implemented using the SignedDistanceBufferGeometry class, which generates a signed distance field for a given font and text string. This geometry can then be used to create a mesh, which can be added to the scene and rendered using WebGL.</p>
                    </div>
                    <div className="flex flex-col items-start justify-start space-y-1 w-full border-0">
                        <h1 className="text-orange-500">SDF Font</h1>
                        <p></p>
                    </div> 
                    <div className="flex flex-col items-start justify-start space-y-1 w-full border-0">
                        <h1 className="text-orange-500">Troika Library</h1>
                        <p className="p-2">troika-three-text</p>
                        <p className="p-2">troika supports woff, ttf, otf. use ".woff" as it is the lighter one</p>
                        <p className="p-2 whitespace-pre-wrap break-all">convert fonts: www.transforter.org, www.fontsquirrel.com/tools/webfont-generator</p>
                    </div> 
                </div>
            </div>
            
            <div id="canvas" style={{ width:"100%" }} className="flex w-full h-full max-h-full border-0 border-yellow-700">
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
                            position: [0, .5, 10]
                        }
                    }
                    className="border-0"
                >
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[1, 2, 3]} intensity={ 1.5} />
                    
                        <Text 
                            font="/assets/fonts/Raleway-Thin.woff"
                            fontSize={ 2 }
                            color="salmon"
                        >Hello World!</Text>
                        {/* <PlaneComponent 
                            position={[0, -.2, 0]}
                            rotation={[-Math.PI * .5, 0, 0]}
                        />  */}
                        
                    <OrbitControls makeDefault />
                </CanvasComponent>
            </div>
            
            
            
        </div>
    )
}

export default SceneDreiText
