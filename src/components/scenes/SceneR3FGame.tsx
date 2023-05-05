"use client"

import * as THREE from "three"
import CanvasComponent from "@/components/canvas/CanvasComponent";

import { useControls } from "leva";
import ArrowRight from "../icons/ArrowRight";
import { useMemo, useState } from "react";

import ExperienceGame from "@/components/game/ExperienceGame";

import { KeyboardControls, KeyboardControlsEntry } from "@react-three/drei";
import Interface from "../game/Interface";

export enum Controls {
    forward = 'forward',
    back = 'back',
    left = 'left',
    right = 'right',
    jump = 'jump',
}


const SceneR3FGame = () => {

    const [isShow, setIsShow] = useState(false);
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

    const keyMap = useMemo<KeyboardControlsEntry<Controls>[]>(()=>[
        { name: Controls.forward, keys: ['ArrowUp', 'KeyW'] },
        { name: Controls.back, keys: ['ArrowDown', 'KeyS'] },
        { name: Controls.left, keys: ['ArrowLeft', 'KeyA'] },
        { name: Controls.right, keys: ['ArrowRight', 'KeyD'] },
        { name: Controls.jump, keys: ['Space'] },
    ], [])

    
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
                        <h1 className="text-orange-500">Game</h1>
                        <ol className='list-decimal ml-[8px] text-xs  w-full p-2 space-y-2 border-0 text-orange-500'>
                            <li className="text-yellow-500">Import KeyboardControls from drei
                                <ul className="w-full text-xs space-y-2 mt-2 list-disc p-2 text-white">
                                    <li>KeyboardControls must be outside of the {`<Canvas />`}</li>
                                </ul>
                            </li>  
                            <li className="text-yellow-500">Zustand
                                <ul className="w-full text-xs space-y-2 mt-2 list-disc p-2 text-white">
                                    <li><pre><code className="text-blue-400">{`npm install zustand`}</code></pre></li>
                                    <li>Global state stores</li>
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


            <KeyboardControls
                map={ keyMap }
            >
                <Interface />

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
                    // flat={true}
                >
                    
                    <ExperienceGame showControls={showControls} />
                
                </CanvasComponent>

                
            </KeyboardControls>
               
            </div>
            
            
            
        </div>
    )
}

export default SceneR3FGame;
