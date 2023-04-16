
import { useGLTF, useAnimations } from "@react-three/drei"
import { ThreeElements } from "@react-three/fiber";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three"
import { useEffect } from "react";
import { useControls } from "leva";

type FoxProps = Omit<ThreeElements["primitive"], "object">

const Fox = (props : FoxProps) => {

    const fox = useGLTF("/models/Fox/glTF/Fox.gltf");
    const animations = useAnimations(fox.animations, fox.scene)

    const foxActions = useControls("Fox", {
        animationName: { options: animations.names }
    })

    useEffect(() => {
        const action = animations.actions[foxActions.animationName]
        action?.reset().fadeIn(.5).play()

        return () => {
            action?.fadeOut(.5)
        }
    }, [foxActions])

    return (
        <primitive {...props} object={ fox.scene } />
    )
}

export default Fox;

useGLTF.preload("/models/Fox/glTF/Fox.gltf")

