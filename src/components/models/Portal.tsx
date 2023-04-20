
import { Center, useGLTF, useTexture, Sparkles, shaderMaterial } from "@react-three/drei";
import { GLTF } from 'three-stdlib'
import fragmentShader from '@/shaders/portal/fragment.glsl';
import vertexShader from '@/shaders/portal/vertex.glsl';
import * as THREE from "three";
import { Object3DNode, extend, useFrame } from "@react-three/fiber";
import { useRef } from "react";


interface PortalMaterialProps {
    uTime?: number,
    uColorStart?: THREE.Color,
    uColorEnd?: THREE.Color
}

const PortalMaterial = shaderMaterial(
    {
        uTime: 0,
        uColorStart: new THREE.Color("#8f09ad"),
        uColorEnd:  new THREE.Color("#241c49")
    },
    vertexShader,
    fragmentShader    
);

extend({ PortalMaterial })

declare global {
  namespace JSX {
    interface IntrinsicElements {
      portalMaterial: PortalMaterialProps & JSX.IntrinsicElements["meshStandardMaterial"]
    }
  }
}

type GLTFResult = GLTF & {
    nodes: {
        Scene: THREE.Group,
        baked: THREE.Mesh,
        poleLightA: THREE.Mesh,
        poleLightB: THREE.Mesh,
        portalLight: THREE.Mesh
    },
    materials: {
        "" : THREE.MeshStandardMaterial
    }
}




const Portal = () => {

    const { scene, nodes, materials } = useGLTF('/models/Portal/portal.glb') as GLTFResult;
    const bakedTexture = useTexture('/models/Portal/baked.jpg')
    bakedTexture.flipY = false   

    const portalMaterialRef = useRef<PortalMaterialProps & THREE.MeshStandardMaterial>(null!);

    useFrame((state, delta) => {
        portalMaterialRef.current.uTime! += delta * 2.0
    })

    return(
        <Center>
            <Sparkles 
                size={ 6 }
                scale={ [4, 2, 4] }
                position-y={ 1 }
                speed={ .2 }
                count={ 40}
            />
            <mesh geometry={ nodes.baked.geometry } >
                <meshBasicMaterial map={ bakedTexture } />
            </mesh>
            <mesh
                geometry={ nodes.poleLightA.geometry } 
                position={ nodes.poleLightA.position }
            >
                <meshBasicMaterial color="#ffffc5" />
            </mesh>
            <mesh
                geometry={ nodes.poleLightB.geometry } 
                position={ nodes.poleLightB.position }
            >
                <meshBasicMaterial color="#ffffc5" />
            </mesh>
            <mesh 
                geometry={ nodes.portalLight.geometry }
                position={ nodes.portalLight.position }
                rotation={ nodes.portalLight.rotation }
            >
                <portalMaterial ref={ portalMaterialRef }/>
            </mesh>
            
        </Center>
    )
}

export default Portal;