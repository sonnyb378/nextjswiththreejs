
import { useMatcapTexture } from "@react-three/drei";
import { ThreeElements, useFrame } from "@react-three/fiber";
import { useEffect, useState, useRef, Ref } from "react";
import { TorusGeometry } from "three";

type DonutProps = {
    matID?: string, 
    torus: TorusGeometry
}

const Donuts = ({ torus, matID,  ...props}: DonutProps) => {

    // const donutGroupRef = useRef<THREE.Group>(null!)

    const donuts = useRef<THREE.Mesh[]>([])

    const [matCapTexture] = useMatcapTexture(matID, 256)

    const tempArray = [...Array(80)]  
    
    function generateRandom(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);        
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    useFrame((state, delta) => {
        for(const donut of donuts.current) {
            donut.rotation.y += delta * 2
        }
    })
    
    return (
        <>
            
            {/* <torusGeometry ref={setDonuts} args={[1, 0.6, 16, 32]} />  */}
            {/* <group ref={ donutGroupRef }> */}
                {
                    tempArray.map((_, i) => {
                        const randomNumberX = generateRandom(-30, 30);
                        const randomNumberY = generateRandom(-30, 30);
                        const randomNumberZ = generateRandom(-30, 30);
                        return(
                            
                                <mesh
                                    ref={ (element: THREE.Mesh) => donuts.current[i] = element }
                                    key={i}
                                    geometry={ torus }
                                    scale={ .8 + Math.random() * 1.5 } 
                                    rotation={ [
                                        Math.random() * Math.PI,
                                        Math.random() * Math.PI,
                                        0
                                    ] }
                                    position={ [randomNumberX, randomNumberY, randomNumberZ] }
                                >
                                    <meshMatcapMaterial matcap={matCapTexture} />
                                </mesh>
                        )
                    })
                }
            {/* </group> */}
        </>
    )
}

export default Donuts;