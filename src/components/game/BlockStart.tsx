import { ThreeElements } from "@react-three/fiber"
import * as THREE from "three"
import { Float, Text } from "@react-three/drei"

type BlockStartProp = ThreeElements["group"] & {
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

const BlockStart = ({ mesh, meshScale, meshMaterial, ...props }: BlockStartProp): JSX.Element => {
    return (
        <group { ...props } >
            <Float floatIntensity={ .25 } rotationIntensity={ .25 }>
                <Text                     
                    font='/assets/fonts/bebas-neue-v9-latin-regular.woff'
                    scale={ .5 }
                    maxWidth={ .25 }
                    lineHeight={ .75 }
                    textAlign="right"
                    position={ [.75, .65, 0] }
                    rotation={ [0, -.25, 0] }
                >
                    Marble Race
                    <meshBasicMaterial toneMapped={ false } />
                </Text>
            </Float>
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

export default BlockStart