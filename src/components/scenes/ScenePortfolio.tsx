"use client"

import * as THREE from "three"
import CanvasComponent from "@/components/canvas/CanvasComponent";

import { Environment, PresentationControls } from "@react-three/drei";
import { useControls } from "leva";
import { Perf } from "r3f-perf";
import ArrowRight from "../icons/ArrowRight";
import { useState } from "react";

import MacBookModel from "../models/Laptop";


const ScenePortfolio = () => {

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
                    <h1 className="text-orange-500">Portfolio</h1>
                        <ol className='list-decimal ml-[8px] text-xs  w-full p-2 space-y-2 border-0 text-orange-500'>
                            <li className="text-yellow-500">Free 3D Models
                                <ul className="w-full text-xs space-y-2 mt-2 list-disc p-2 text-white">
                                    <li>https://market.pmnd.rs/</li>
                                </ul>
                            </li>  
                            <li className="text-yellow-500">Replace {`<OrbitControls>`} with {`<PresentationControls>`}. PresentationControls uses Spring (spring.dev)
                                <ul className="w-full text-xs space-y-2 mt-2 list-disc p-2 text-white">
                                    <li>PresentationControls has more control
                                        <pre><code className="text-green-400">{`
<PresentationControls 
    global 
    rotation={[0.13, 0.1, 0]}
    polar={ [-.4, .2 ] }
    azimuth={ [-1, .35 ]}
>
    <MacBookModel />
</PresentationControls>
                                    `}</code></pre></li>
                                    <li>Use "polar" and "azimuth" to control the limit of vertical and horizontal drag of the view</li>
                                </ul>
                            </li>   
                            <li className="text-yellow-500">Spring Configuration
                                <ul className="w-full text-xs space-y-2 mt-2 list-disc p-2 text-white">
                                    <li>To spring /  tension effect when dragging
                                        <pre><code className="text-green-400">{`
<PresentationControls 
    global 
    rotation={[0.13, 0.1, 0]}
    polar={ [-.2, .2 ] }
    azimuth={ [-1, .35 ]}
    config={
        {
            mass: 2,
            tension: 400
        }
    }
>
    <MacBookModel />
</PresentationControls>
                                        `}</code></pre>
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
                                fov: 45,
                                near: 1,
                                far: 100,
                                position: [-1.9, 0, 5.5]
                            }
                        }
                        
                        className="border-0"
                        showControls={ showControls }
                        flat={true}
                    >
                        

                        {
                            perfVisible && <Perf position="bottom-right" />
                        }

                        <color args={["#190f03"]} attach="background" />
                        
                        <Environment preset="city" />
 
                            <PresentationControls 
                                global 
                                rotation={[0.13, 0.1, 0]}
                                polar={ [-.2, .2 ] }
                                azimuth={ [-1, .35 ]}
                                config={
                                    {
                                        mass: 2,
                                        tension: 400
                                    }
                                }
                            >
                                <MacBookModel />
                            </PresentationControls>
                          


                        

                    </CanvasComponent>
               
            </div>
            
            
            
        </div>
    )
}

export default ScenePortfolio;
