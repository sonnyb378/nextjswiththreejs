

import { Sphere, Html } from "@react-three/drei"
import { ThreeElements } from "@react-three/fiber"
import React from "react";
import { ReactNode, useRef } from "react";

type SphereHTMLProps = {
    children?: ReactNode
}
const SphereDreiHtml = ({ children, ...props}: SphereHTMLProps & ThreeElements['mesh']) => {

    const meshRef = useRef<THREE.Mesh>(null!);

    const hasChildren = React.Children.count(children) > 0;
    
    return (
        <>
            <Sphere 
                { ...props }
                args={[.3]}
                ref={meshRef}
            >
                {
                    hasChildren ? children : <meshStandardMaterial color="skyblue" />
                }
                <Html 
                    wrapperClass="label"
                    center
                    className="flex flex-1 flex-grow items-center justify-center
                        p-2 bg-slate-200 text-gray-500 rounded-md hover:bg-blue-500 hover:text-orange-300 select-none whitespace-nowrap" 
                    position={[.5, 0, 0]}
                    occlude={[ meshRef ]}
                >
                    Hello, World!
                </Html>
            </Sphere>            
        </>
    )
}

export default SphereDreiHtml;