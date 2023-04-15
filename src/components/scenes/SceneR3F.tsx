"use client"

import * as THREE from 'three';
import CanvasComponent from "@/components/canvas/CanvasComponent";
import BoxComponent from "@/components/box/BoxComponent";
import CustomObject from "@/components/customobject/CustomObject";
import TorusComponent from "@/components/torus/TorusComponent";

const SceneR3F = () => {
    return (
<       CanvasComponent 
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
                near: 0.1,
                far: 200,
                position: [3, 2, 6]
                }
            }
            >
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <pointLight position={[-10, -10, -10]} />
            <BoxComponent position={ [-2, 0, 0] }/>
            <CustomObject />
            <TorusComponent position={ [ 2, 0, 0] } />            
        </CanvasComponent>
    )
}

export default SceneR3F;