
import { GroupProps, ThreeElements, useFrame, useLoader } from "@react-three/fiber";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { RefAttributes, useRef } from "react";
import { CloneProps, Gltf, Clone, useGLTF } from "@react-three/drei";
import { EventHandlers } from "@react-three/fiber/dist/declarations/src/core/events";
import { Object3D, Event, Mesh } from "three";


const HamburgerDrei = () => {

    const model = useGLTF("/models/hamburger-draco.glb")
    // const mesh = useRef<THREE.Mesh>(null!)

    // useFrame((state, delta) => {
    //     return (
    //         mesh.current.rotation.y += delta / 3.0
    //     )
    // })

    return(
        <>
            {/* <primitive ref={ mesh } object={ model.scene } /> */}
            <Clone object={ model.scene } scale={ .35 } position-x={ 4 } />
            <Clone object={ model.scene } scale={ .35 } position-x={ 0 } />
            <Clone object={ model.scene } scale={ .35 } position-x={ -4 } />
        </>
    )
}

export default HamburgerDrei;

useGLTF.preload("/models/hamburger-draco.glb")