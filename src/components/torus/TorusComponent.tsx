"use client"

import * as THREE from 'three'
import React, { useRef, useState } from 'react'
import { useFrame, ThreeElements } from '@react-three/fiber'

function TorusComponent(props: ThreeElements['mesh']) {
  const mesh = useRef<THREE.Mesh>(null!)
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  useFrame((state, delta) => {
    return (
      mesh.current.rotation.x += delta,
      mesh.current.rotation.y += delta
    )  
  })
  
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? .45 : .3}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <torusGeometry args={[1.8, 1.2, 48, 64]} />
      <meshStandardMaterial color={hovered ? 'orange' : 'purple'} />
    </mesh>
  )
}

export default TorusComponent;





