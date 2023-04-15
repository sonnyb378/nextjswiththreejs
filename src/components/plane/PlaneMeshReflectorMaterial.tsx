"use client"

import * as THREE from 'three'
import { Plane, MeshReflectorMaterial } from "@react-three/drei"
import { ThreeElements } from "@react-three/fiber"
import { useEffect, useRef, useState } from "react";

const PlaneMeshReflectorMaterial = (props: ThreeElements['mesh']) => {
 
  // using Drei to create a Plane Geometry: <Plane />
  return (
    <>
      <Plane
        {...props}
        args={[5, 2]}
      >
        {/* <meshStandardMaterial color={'yellow'} side={ THREE.DoubleSide }/> */}
        <MeshReflectorMaterial 
          mirror={ 0.75 } 
          resolution={ 512 }
          color="blue"
          blur={ [1000, 1000] }
          mixBlur={ 1 }
        />
      </Plane>
     
    </>
  )
}

export default PlaneMeshReflectorMaterial;





