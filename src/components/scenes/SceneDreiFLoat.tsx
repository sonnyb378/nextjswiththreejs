"use client"

import * as THREE from "three"
import CanvasComponent from "@/components/canvas/CanvasComponent";
import PlaneComponent from "@/components/plane/PlaneComponent";
import { OrbitControls, Float, Text } from "@react-three/drei";

const SceneDreiFloat = () => {

   
    return (
        <div id="scene-container" className="flex w-full h-full items-start flex-1 flex-grow justify-start border-0 border-cyan-500 overflow-hidden">
            
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
                    
                    <Float
                        speed={5}
                        floatIntensity={2}
                    >
                        <Text 
                            font="/assets/fonts/Raleway-Thin.woff"
                            fontSize={ 2 }
                            color="salmon"
                            position={[0, 2, 0]}
                        >Hello World!</Text>
                    </Float>

                    <PlaneComponent 
                        scale={ 3 }
                        position={[0, -.2, 0]}
                        rotation={[-Math.PI * .5, 0, 0]}
                    >
                        <meshStandardMaterial color={'yellow'} side={ THREE.DoubleSide } />
                    </PlaneComponent> 
                        
                    <OrbitControls makeDefault />
                </CanvasComponent>
            </div>
            
            
            
        </div>
    )
}

export default SceneDreiFloat
