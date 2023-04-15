
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { useRef } from "react";

const Hamburger = () => {

    const mesh = useRef<THREE.Mesh>(null!)
    const model = useLoader(GLTFLoader, '/models/hamburger.glb')

    useFrame((state, delta) => {

        return (
            mesh.current.rotation.y += delta / 3.0
        )
    })

    return(
        <primitive ref={mesh} object={ model.scene } />
    )
}

export default Hamburger;