"use client"

import * as THREE from 'three'
import { Plane, TransformControls } from "@react-three/drei"
import { ThreeElements } from "@react-three/fiber"
import { ReactNode, useEffect, useRef, useState } from "react";
import React from 'react';
import { EffectComposer, SSR } from "@react-three/postprocessing";
import { useControls } from 'leva';

type PlaneProps = {
  children?: ReactNode
}
const PlanePostProcessing = ({ children, ...props } : PlaneProps & ThreeElements['mesh']) => {
 
  // console.log(!!children);
  // using Drei to create a Plane Geometry: <Plane />
  // const hasChildren = React.Children.count(children) > 0;

  return (
    <>

        <Plane
            {...props}
            args={[ 2, 2]}
        >
            {/* { hasChildren ? children : <meshStandardMaterial color={'yellow'} side={ THREE.DoubleSide } /> } */}
            {
            children
            }
        </Plane>
     
    </>
  )
}

export default PlanePostProcessing;





