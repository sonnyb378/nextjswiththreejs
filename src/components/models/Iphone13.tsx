import * as THREE from "three"
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useRef } from "react";


const Iphone13 = () => {

    const mesh = useRef<THREE.Mesh>(null!);
    const iphoneModel = useLoader(GLTFLoader, '/models/iphone13.glb')

    useFrame((state, delta) => {
        return (
            mesh.current.rotation.y += delta
        )
    })
    
    return (
        <primitive ref={mesh}  object={ iphoneModel.scene }  scale={.35} position-z={ 0 } position-y={ 0 } />
    )
}

export default Iphone13;