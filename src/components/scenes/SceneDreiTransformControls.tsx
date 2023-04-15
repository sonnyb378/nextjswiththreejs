"use client"

import * as THREE from "three"
import BoxDrei from "@/components/box/BoxDrei";
import CanvasComponent from "@/components/canvas/CanvasComponent";
import PlaneComponent from "@/components/plane/PlaneComponent";
import { OrbitControls } from "@react-three/drei";

const SceneDreiTransformControls = () => {

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
            
                <BoxDrei position={[0, .26, 0]} showTransformControls={true}>
                    <meshStandardMaterial color='hotpink' />
                </BoxDrei>
                
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

export default SceneDreiTransformControls
