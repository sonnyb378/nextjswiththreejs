
import * as THREE from "three"
import { Sphere, Html, PivotControls } from "@react-three/drei"
import { ThreeElements } from "@react-three/fiber"
import { ReactNode, useEffect, useRef, useState } from "react";
import React from "react";

type SphereProps = {
    showTransformControls?: boolean,
    children?: ReactNode
};

const SphereDrei = ({ children, ...props} : SphereProps & ThreeElements['mesh']) => {

    const hasChildren = React.Children.count(children) > 0;
    
    return (
        <>
            <PivotControls 
                anchor={[0, 0, 0]} 
                depthTest={false} 
                lineWidth={2}
                scale={ .3 }
            >
                <Sphere 
                    { ...props }
                    args={[.3]}
                >
                    {/* <meshStandardMaterial color="skyblue" />
                     */}
                     {
                        hasChildren ? children : <meshStandardMaterial color="orange" />
                    }
                </Sphere>
                {/* <Html>Hello, World!</Html> */}
            </PivotControls>
            
        </>
    )
}

export default SphereDrei;