"use client"

import * as THREE from "three"
import CanvasComponent from "@/components/canvas/CanvasComponent";

import { Environment, PresentationControls } from "@react-three/drei";
import { Leva, useControls } from "leva";
import { Perf } from "r3f-perf";
import ArrowRight from "../icons/ArrowRight";
import { useState } from "react";

import ExperienceScrollBasedAnimation from "../scrollbasedanimation/Experience";
import { Canvas } from "@react-three/fiber";


const SceneR3FScrollBasedAnimation = () => {

    const [isShow, setIsShow] = useState(false);
    const [showControls, setShowControls] = useState(!true);

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
            
            <div style={ {position: 'fixed', top: '70px', right: '0px', zIndex: 1, transform: 'translate(0%, 0%)',} }> 
                <Leva collapsed hidden={ showControls || false } />
            </div>

            <div className={`flex flex-row-reverse items-start justify-between relative h-full`}>
                <div onClick={toggleHandler} className={`flex items-center justify-center absolute z-[1001] p-2 group cursor-pointer ${ isShow ? "-mr-[74px]": "-mr-[74px]" } hover:bg-slate-800`}>
                    {/* <ArrowRight className={`${ isShow? "rotate-180" : ""} stroke-white group-hover:stroke-yellow-500 w-[20px] h-[20px] -ml-[5px]`} />
                    <span>Notes</span> */}
                </div>
                
                <div id="text-container" className={`scrollbar scrollbar-thumb-gray-800 scrollbar-track-zinc-900 transition-all flex flex-col w-[300px]  ${ isShow ? "ml-[0px]": "-ml-[310px]" } items-start justify-start p-2 border-0 border-emerald-500 overflow-y-auto h-full`}>
                    
                    <div className="flex flex-col items-start justify-start space-y-1 w-full border-0">
                        <button className="btn btn-primary w-full" onClick={ showControlsHandler }>Toggle Controls</button> 
                    </div>

                    <div className="flex flex-col items-start justify-start space-y-1 w-full mt-4 border-0 text-sm">
                    <h1 className="text-orange-500">Scroll-based Animation</h1>
                        <ol className='list-decimal ml-[8px] text-xs  w-full p-2 space-y-2 border-0 text-orange-500'>
                            <li className="text-yellow-500">Parallax Effect
                                <ul className="w-full text-xs space-y-2 mt-2 list-disc p-2 text-white">
                                    <li></li>
                                </ul>
                            </li>  
                           
                        </ol>
                    </div>

                    <div className="flex flex-col items-start justify-start space-y-1 w-full border-0">
                        <button className="btn btn-primary w-full" onClick={ showControlsHandler }>Toggle Controls</button> 
                    </div>
                    
                </div>
            </div>

            <div 
                id="canvas" style={{ width:"100%" }} 
                className="relative w-full h-full max-h-full border-0 border-yellow-700 overflow-y-scroll"
            >
                <div className="sticky top-0 border-0 h-full w-full z-900">
                    <Canvas
                        gl = {
                            {
                                antialias: true,
                                toneMapping: THREE.ACESFilmicToneMapping,
                                outputEncoding: THREE.sRGBEncoding
                            }
                        }
                       
                        shadows 
                        flat={true}
                        className="border-0 border-orange-500"
                    >
                        <ExperienceScrollBasedAnimation showControls={ showControls } />
                    </Canvas>
                </div>
          
                
                <section className="flex items-center justify-center z-910 border-0 w-full absolute top-0">
                    <section className="flex flex-col items-start justify-start w-[50%] border-0 border-red-500">
                        <article className="flex items-center justify-center text-center h-[600px] border-0 text-lg mt-2">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </article>
                        <article className="flex items-center justify-center text-center h-[600px] border-0 text-lg  mt-2">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </article>
                        <article className="flex items-center justify-center text-center h-[600px] border-0 text-lg  mt-2">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </article>
                        <article className="flex items-center justify-center text-center h-[600px] border-0 text-lg  mt-2">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </article>
                        <article className="flex items-center justify-center text-center h-[600px] border-0 text-lg  mt-2">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </article>
                        <article className="flex items-center justify-center text-center h-[600px] border-0 text-lg  mt-2">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </article>
                    </section>                        
                </section>
               
            </div>
            
            
            
        </div>
    )
}

export default SceneR3FScrollBasedAnimation;
