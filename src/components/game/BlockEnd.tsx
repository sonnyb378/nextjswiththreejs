import { Text, useGLTF } from "@react-three/drei"
import { ThreeElements } from "@react-three/fiber"
import { RigidBody } from "@react-three/rapier"
import * as THREE from "three"

type BlockEndProp = ThreeElements["group"] & {
    mesh: THREE.BufferGeometry,
    meshScale: THREE.Vector3,
    meshMaterial: THREE.MeshStandardMaterial,
}

/**
 * Render a block start component.
 *
 * @param {BlockStartProp} props - Component properties.
 * @returns {JSX.Element} A React element representing the block start component.
 */

const BlockEnd = ({ mesh, meshScale, meshMaterial, ...props }: BlockEndProp): JSX.Element => {

    const hamburger = useGLTF("/models/hamburger.glb")

    hamburger.scene.children.forEach((mesh) => {
        mesh.castShadow = true
    })

    return (
        <group { ...props } >
            <Text                     
                font='/assets/fonts/bebas-neue-v9-latin-regular.woff'
                scale={ .5 }
                position={ [0, 2.25, 2] }
            >
                Finish
                <meshBasicMaterial toneMapped={ false } />
            </Text>
            <RigidBody type="fixed" colliders="hull" position={[0, .25, 0]} restitution={ .2 } friction={ 0 } >
                <primitive object={ hamburger.scene } scale={ .2 } />
            </RigidBody>
            <mesh 
                geometry={ mesh } 
                material={ meshMaterial }
                position={[0, -.1, 0]} 
                scale={ meshScale } 
                receiveShadow
            />
        </group>
    )
}

export default BlockEnd