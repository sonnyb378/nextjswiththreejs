"use client"

import CanvasComponent from "@/components/canvas/CanvasComponent";
import PlaneComponent from "@/components/plane/PlaneComponent";
import * as THREE from "three"
import { OrbitControls } from "@react-three/drei";
import SphereDrei from "@/components/sphere/SphereDrei";

const SceneDreiPivotControls = () => {

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
            
                <SphereDrei position={[0, .3, 0]} />
                <PlaneComponent 
                    position={[0, 0, 0]}
                    rotation={[-Math.PI * .5, 0, 0]}
                >
                    <meshStandardMaterial color={'yellow'} side={ THREE.DoubleSide } />
                </PlaneComponent> 
            
            <OrbitControls makeDefault />
        </CanvasComponent>
    )
}

export default SceneDreiPivotControls
