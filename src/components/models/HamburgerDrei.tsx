
import { GroupProps, ThreeElements, useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { RefAttributes, useRef } from "react";
import { CloneProps, Gltf } from "@react-three/drei";
import { EventHandlers } from "@react-three/fiber/dist/declarations/src/core/events";
import { Object3D, Event } from "three";

const HamburgerDrei = (props: JSX.IntrinsicAttributes & Pick<Omit<GroupProps, "children"> & Omit<CloneProps, "object"> & { src: string; }, "attach" | "args" | "children" | "key" | "onUpdate" | "position" | "up" | "scale" | "rotation" | "matrix" | "quaternion" | "layers" | "dispose" | "isGroup" | "type" | "isObject3D" | "id" | "uuid" | "name" | "parent" | "modelViewMatrix" | "normalMatrix" | "matrixWorld" | "matrixAutoUpdate" | "matrixWorldAutoUpdate" | "matrixWorldNeedsUpdate" | "visible" | "castShadow" | "receiveShadow" | "frustumCulled" | "renderOrder" | "animations" | "userData" | "customDepthMaterial" | "customDistanceMaterial" | "onBeforeRender" | "onAfterRender" | "applyMatrix4" | "applyQuaternion" | "setRotationFromAxisAngle" | "setRotationFromEuler" | "setRotationFromMatrix" | "setRotationFromQuaternion" | "rotateOnAxis" | "rotateOnWorldAxis" | "rotateX" | "rotateY" | "rotateZ" | "translateOnAxis" | "translateX" | "translateY" | "translateZ" | "localToWorld" | "worldToLocal" | "lookAt" | "add" | "remove" | "removeFromParent" | "clear" | "getObjectById" | "getObjectByName" | "getObjectByProperty" | "getObjectsByProperty" | "getWorldPosition" | "getWorldQuaternion" | "getWorldScale" | "getWorldDirection" | "raycast" | "traverse" | "traverseVisible" | "traverseAncestors" | "updateMatrix" | "updateMatrixWorld" | "updateWorldMatrix" | "toJSON" | "clone" | "copy" | "addEventListener" | "hasEventListener" | "removeEventListener" | "dispatchEvent" | keyof EventHandlers | "deep" | "keys" | "inject" | "isChild" | "src"> & RefAttributes<Object3D<Event>>) => {

    const mesh = useRef<THREE.Mesh>(null!)

    useFrame((state, delta) => {

        return (
            mesh.current.rotation.y += delta / 3.0
        )
    })

    return(
        <Gltf {...props} ref={mesh} />
    )
}

export default HamburgerDrei;