"use client"

import * as THREE from "three"
import CanvasComponent from "@/components/canvas/CanvasComponent";

import { OrbitControls, Float, Text } from "@react-three/drei";
import PlaneMeshReflectorMaterial from "@/components/plane/PlaneMeshReflectorMaterial";
import SphereDrei from "@/components/sphere/SphereDrei";
import BoxDrei from "@/components/box/BoxDrei";

const SceneDreiMeshReflectorMaterial = () => {

   
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
                    
                    <SphereDrei position={[-2.5, 1.5, 0]} scale={ 5 } />               
                    <BoxDrei position={[2.5, 1.5, 0]} scale={ 5 } >
                        <meshStandardMaterial color='hotpink' />    
                    </BoxDrei>
                    
                    <PlaneMeshReflectorMaterial 
                        scale={ 3 }
                        position={[0, -.2, 0]}
                        rotation={[-Math.PI * .5, 0, 0]}
                    /> 
                        
                    <OrbitControls makeDefault />
                </CanvasComponent>
            </div>
            
            
            
        </div>
    )
}

export default SceneDreiMeshReflectorMaterial
