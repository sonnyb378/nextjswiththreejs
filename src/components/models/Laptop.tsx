/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/
        
import React, { useRef } from 'react'
import { Center, useGLTF, Float, Html, Text } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { useControls } from 'leva'
import { text } from 'stream/consumers'


type GLTFResult = GLTF & {
    nodes: {
        AppleLogo000: THREE.Mesh
        Circle: THREE.Mesh
        Circle001: THREE.Mesh
        Circle006: THREE.Mesh
        Circle006_1: THREE.Mesh
        Circle_1: THREE.Mesh
        Circle001_1: THREE.Mesh
        Circle001_2: THREE.Mesh
        Circle001_3: THREE.Mesh
        Circle001_4: THREE.Mesh
        Circle001_5: THREE.Mesh
        Circle001_6: THREE.Mesh
        Circle_2: THREE.Mesh
        Circle002: THREE.Mesh
        Circle002_1: THREE.Mesh
        Circle002_2: THREE.Mesh
        Circle002_3: THREE.Mesh
        Circle002_4: THREE.Mesh
        Circle003: THREE.Mesh
        Circle003_1: THREE.Mesh
        FrontCameraRing001: THREE.Mesh
        KeyboardKeyHole: THREE.Mesh
        RubberFoot: THREE.Mesh
        Circle009: THREE.Mesh
        Circle009_1: THREE.Mesh
        Circle012: THREE.Mesh
        Circle012_1: THREE.Mesh
    }
    materials: {
        Circle001: THREE.MeshStandardMaterial
        HeadPhoneHole: THREE.MeshStandardMaterial
        TouchbarBorder: THREE.MeshStandardMaterial
        DarkRubber: THREE.MeshStandardMaterial
        Keyboard: THREE.MeshStandardMaterial
        HingeBlack: THREE.MeshStandardMaterial
        HingeMetal: THREE.MeshStandardMaterial
        Key: THREE.MeshStandardMaterial
        Touchbar: THREE.MeshStandardMaterial
        Screen: THREE.MeshStandardMaterial
        ScreenGlass: THREE.MeshStandardMaterial
        Rubber: THREE.MeshStandardMaterial
        DisplayGlass: THREE.MeshStandardMaterial
        "CameraRIngBlack.002": THREE.MeshStandardMaterial
        "AppleLogo.004": THREE.MeshStandardMaterial
    }
  }

export default function MacBookModel(props: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>(null!)
  const { nodes, materials } = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf') as GLTFResult

  const htmlControls = useControls("HTML Controls", {
    positionX: { value: 0, min: -10, max: 10, step: .01},
    positionY: { value: 1.23, min: -10, max: 10, step: .01},
    positionZ: { value: -1.45, min: -10, max: 10, step: .01},
    rotationX: { value: -.256, min: -10, max: 10, step: .01},
    rotationY: { value: 0, min: -10, max: 10, step: .01},
    rotationZ: { value: 0, min: -10, max: 10, step: .01}
  })

  const textControls = useControls("Text Controls", {
    positionX: { value: 1.70, min: -10, max: 10, step: .01},
    positionY: { value: .89, min: -10, max: 10, step: .01},
    positionZ: { value: .43, min: -10, max: 10, step: .01},
    rotationX: { value: 0.32, min: -10, max: 10, step: .01},
    rotationY: { value: -1.63, min: -10, max: 10, step: .01},
    rotationZ: { value: 0.31, min: -10, max: 10, step: .01}
  })
  return (
    <Float rotationIntensity={ 0.4 }>
        <rectAreaLight 
            width={2.5}
            height={1.65}
            intensity={65}
            color={"#ff6900"}
            rotation={[ -.1, Math.PI, 0]}
            position={[ 0, .55, -1.15]}
        />
        <group ref={group} {...props} dispose={null} position-y={ -.78 } rotation-y={ 0 }>   
            <Html
                transform
                wrapperClass='htmlScreen'
                distanceFactor={ 1.17 }
                position={ [ 0, 1, -1.36] }
                rotation={[ -.28, 0, 0]}
            >
                <iframe 
                    src="https://sonnybaga.dev" 
                    className="w-[1000px] h-[680px] border-0 rounded-[30px] bg-black"

                />
            </Html> 
            <group position={[0, 0, 0,]} scale={[0.1, 0.1, 0.1,]} >                

                <mesh geometry={nodes.Circle001.geometry} material={nodes.Circle001.material} />
                <mesh geometry={nodes.Circle001_1.geometry} material={nodes.Circle001_1.material} />
                <mesh geometry={nodes.Circle001_2.geometry} material={materials.HeadPhoneHole} />
                <mesh geometry={nodes.Circle001_3.geometry} material={nodes.Circle001_3.material} />
                <mesh geometry={nodes.Circle001_4.geometry} material={nodes.Circle001_4.material} />
                <mesh geometry={nodes.Circle001_5.geometry} material={materials.TouchbarBorder} />
                <mesh geometry={nodes.Circle001_6.geometry} material={materials.Keyboard} />
                <mesh geometry={nodes.FrontCameraRing001.geometry} material={materials['CameraRIngBlack.002']} position={[-0.15, 19.57, -16.15,]} scale={5.8} />
                <mesh geometry={nodes.KeyboardKeyHole.geometry} material={nodes.KeyboardKeyHole.material} position={[-11.79, -0.15, -8.3,]} scale={5.8} />
                <mesh geometry={nodes.RubberFoot.geometry} material={materials.DarkRubber} position={[-11.95, -0.75, 7.86,]} scale={5.8} />
                <group position={[0.01, -0.21, -10.56,]} scale={5.8} >
                    <mesh geometry={nodes.Circle012.geometry} material={materials.HingeBlack} />
                    <mesh geometry={nodes.Circle012_1.geometry} material={materials.HingeMetal} />
                </group>
                <group position={[0, -0.51, 0,]} scale={5.8} >
                    <mesh geometry={nodes.Circle006.geometry} material={nodes.Circle006.material} />
                    <mesh geometry={nodes.Circle006_1.geometry} material={nodes.Circle006_1.material} />
                </group>
                <group position={[-11.79, -0.15, -8.3,]} scale={5.8} >
                    <mesh geometry={nodes.Circle.geometry} material={nodes.Circle.material} />
                    <mesh geometry={nodes.Circle_1.geometry} material={materials.Key} />
                    <mesh geometry={nodes.Circle_2.geometry} material={materials.Touchbar} />
                </group>
                <group position={[0.01, -0.47, -10.41,]} rotation={[1.31, 0, 0,]} scale={5.8} >
                    <mesh geometry={nodes.Circle002.geometry} material={nodes.Circle002.material} />
                    <mesh geometry={nodes.Circle002_1.geometry} material={materials.Screen} />
                    <mesh geometry={nodes.Circle002_2.geometry} material={materials.ScreenGlass} />
                    <mesh geometry={nodes.Circle002_3.geometry} material={materials.Rubber} />
                    <mesh geometry={nodes.Circle002_4.geometry} material={materials.DisplayGlass} />
                    <mesh geometry={nodes.AppleLogo000.geometry} material={materials['AppleLogo.004']} position={[0, -0.11, -1.8,]} rotation={[-Math.PI, 0, -Math.PI,]} scale={[0.58, 0.58, 0.58,]} />
                </group>
                <group position={[-15.03, 0.03, 0.6,]} scale={5.8} >
                    <mesh geometry={nodes.Circle009.geometry} material={nodes.Circle009.material} />
                    <mesh geometry={nodes.Circle009_1.geometry} material={nodes.Circle009_1.material} />
                </group>
                <group position={[12.2, 0.03, 0.6,]} scale={5.8} >
                    <mesh geometry={nodes.Circle003.geometry} material={nodes.Circle003.material} />
                    <mesh geometry={nodes.Circle003_1.geometry} material={nodes.Circle003_1.material} />
                </group>
            </group>

        </group>
        <Text
            font="/assets/fonts/bangers-v20-latin-regular.woff"
            fontSize={ 1 }
            position={ [textControls.positionX, textControls.positionY, textControls.positionZ] }
            rotation={ [textControls.rotationX, textControls.rotationY, textControls.rotationZ]}
            maxWidth={ 2 }
        >
            Sonny Baga
        </Text>
    </Float>
   
  )
}

useGLTF.preload('/models/macbook.gltf')