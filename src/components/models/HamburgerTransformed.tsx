/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 public/models/hamburger.glb -o HamburgerTransformed.tsx -t -T
*/

import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { ThreeEvent } from '@react-three/fiber'

type GLTFResult = GLTF & {
  nodes: {
    bottomBun: THREE.Mesh
    meat: THREE.Mesh
    cheese: THREE.Mesh
    topBun: THREE.Mesh
  }
  materials: {
    BunMaterial: THREE.MeshStandardMaterial
    SteakMaterial: THREE.MeshStandardMaterial
    CheeseMaterial: THREE.MeshStandardMaterial
  }
}

export default function HamburgerTransformed(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/models/hamburger-transformed.glb') as GLTFResult

  const clickHandler= (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
  }

  return (
    <group {...props} dispose={null} onClick={ clickHandler }>
      <mesh castShadow receiveShadow geometry={nodes.bottomBun.geometry} material={materials.BunMaterial} />
      <mesh castShadow receiveShadow geometry={nodes.meat.geometry} material={materials.SteakMaterial} position={[0, 2.82, 0]} />
      <mesh castShadow receiveShadow geometry={nodes.cheese.geometry} position={[0, 3.04, 0]} material={materials.CheeseMaterial} >
        <meshStandardMaterial color="green"  />
      </mesh>
      <mesh castShadow receiveShadow  geometry={nodes.topBun.geometry} material={materials.BunMaterial} position={[0, 1.77, 0]} />
    </group>
  )
}

useGLTF.preload('/models/hamburger-transformed.glb')
