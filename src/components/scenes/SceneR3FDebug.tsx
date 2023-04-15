"use client"

import * as THREE from "three"
import CanvasComponent from "@/components/canvas/CanvasComponent";

import { OrbitControls, Sphere, Box } from "@react-three/drei";
import PlaneComponent from "@/components/plane/PlaneComponent";
import { button, useControls } from "leva";
import { Perf } from "r3f-perf";
import { useState } from "react";
import ArrowRight from "@/components/icons/ArrowRight";

const SceneR3fDebug = () => {

    const [isShow, setIsShow] = useState(true);

    const { perfVisible } = useControls('r3F-perf', {
        perfVisible: false
    })

    const { position, color, visible } = useControls('Sphere', { 
        position: {
            value: { x: -1.2, y: 1 },
            step: .01,
            joystick: "invertY"
        },
        color: "#ff0000",
        visible: true,
        clickMe: button(() => { console.log("button clicked") }),
        choice: { options: ['a', 'b', 'c'] }
    })

    const boxControls = useControls('Box', { 
        position: {
            value: { x: 1.2, y: 1 },
            step: .01,
            joystick: "invertY"
        },
        scale: 2,
        color: "#2f13ba",
        visible: true,
    })

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

                <div id="text-container" className={`scrollbar bg- scrollbar-thumb-gray-800 scrollbar-track-zinc-900 text-sm transition-all flex flex-col w-[300px] ${ isShow ? "ml-[0px]" : "-ml-[320px]" } items-start justify-start p-2 border-0 border-emerald-500 overflow-y-auto h-full`}>
                    <div className="flex flex-col items-start justify-start space-y-1 w-full border-0">
                        <h1 className="text-orange-500">Debug UI: Leva</h1>
                        <p className="p-2">npm install leva@0.9</p>
                        <p className="p-2">{`located in <CanvasComponent />`}</p>
                    </div>
                    <div className="flex flex-col items-start justify-start space-y-1 w-full border-0">
                        <h1 className="text-orange-500">R3F-Perf</h1>
                        <p className="p-2">npm install r3f-perf</p>
                        <p className="p-2">twitter @onirenaud</p>
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
                            position: [0, .5, 6]
                        }
                    }
                    className="border-0"
                >
                    {
                        perfVisible && <Perf position="bottom-right" />
                    }
                    

                    <ambientLight intensity={0.5} />
                    <directionalLight position={[1, 2, 3]} intensity={ 1.5} />
                    
                    <Sphere 
                        position={[ position.x, position.y, 0]} 
                        scale={ 2 }
                        args={[.3]}
                        visible={ visible }
                    >
                        <meshStandardMaterial color={ color } />
                    </Sphere>

                    <Box
                        position={[boxControls.position.x, boxControls.position.y, 0]} 
                        scale={ boxControls.scale } 
                        args={[.5, .5, .5]}  
                        visible={ boxControls.visible}
                    >
                        <meshStandardMaterial color={ boxControls.color } />
                    </Box>

                    
                    <PlaneComponent 
                        scale={ 3 }
                        position={ [0, -.2, 0] }
                        rotation={ [-Math.PI * .5, 0, 0] }
                    >
                        <meshStandardMaterial color={'yellow'} side={ THREE.DoubleSide } />
                    </PlaneComponent> 
                        
                    <OrbitControls makeDefault />
                </CanvasComponent>
            </div>
            
            
            
        </div>
    )
}

export default SceneR3fDebug
