import { ThreeElements } from "@react-three/fiber"
import { CuboidCollider, RigidBody } from "@react-three/rapier"
import * as THREE from "three"

type BoundsProps = {
    length?: number,
    mesh?: THREE.BufferGeometry,
    meshMaterial?: THREE.MeshStandardMaterial
}

/**
 * Render a block start component.
 *
 * @param {BoundsProps} props - Component properties.
 * @returns {JSX.Element} A React element representing the block start component.
 */

const Bounds = ({ length = 1, mesh, meshMaterial, ...props }: BoundsProps): JSX.Element => {
    return (
        <>
            <RigidBody type="fixed" restitution={ .2 } friction={ 0} >
                <mesh 
                    geometry={ mesh } 
                    material={ meshMaterial } 
                    position={ [2.15, .75, -(length * 2) + 2] } 
                    scale={[.3, 1.5, 4 * length]} 
                    castShadow 
                />
                <mesh 
                    geometry={ mesh } 
                    material={ meshMaterial } 
                    position={ [-2.15, .75, -(length * 2) + 2] } 
                    scale={[.3, 1.5, 4 * length]} 
                    receiveShadow 
                />

                <mesh 
                    geometry={ mesh } 
                    material={ meshMaterial } 
                    position={ [0, .75, -(length * 4) + 2] } 
                    scale={[4, 1.5, .3]} 
                />
                <CuboidCollider 
                    args={[2, .1, 2 * length]}
                    position={[0, -.1, -(length * 2) + 2]} 
                    friction={ 1 }
                />
            </RigidBody>
            
        </>
    )
}

export default Bounds