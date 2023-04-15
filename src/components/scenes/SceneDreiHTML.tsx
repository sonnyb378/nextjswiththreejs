"use client"

import * as THREE from "three"
import CanvasComponent from "@/components/canvas/CanvasComponent";
import PlaneComponent from "@/components/plane/PlaneComponent";
import { OrbitControls, Html } from "@react-three/drei";
import SphereDreiHtml from "@/components/sphere/SphereHTML";

const SceneDreiHTML = () => {

    return (
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
                    position: [0, .5, 3]
                }
            }
            
        >
            <ambientLight intensity={0.5} />
            <directionalLight position={[1, 2, 3]} intensity={ 1.5} />
            
                {/* <Html position={[2, 0, 0]} >Hello World!!!</Html> */}

                <SphereDreiHtml position={[0, .5, 0]} >
                    <meshStandardMaterial color="green" />
                </SphereDreiHtml>


                <PlaneComponent 
                    position={[0, -.2, 0]}
                    rotation={[-Math.PI * .5, 0, 0]}
                >
                    <meshStandardMaterial color={'yellow'} side={ THREE.DoubleSide } />
                </PlaneComponent> 
                
            <OrbitControls makeDefault />
        </CanvasComponent>
    )
}

export default SceneDreiHTML
