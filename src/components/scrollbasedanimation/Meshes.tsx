import { useTexture } from "@react-three/drei";
import { MeshProps, useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import React, { MutableRefObject, Ref, useEffect } from "react";
import { useRef } from "react";
import * as THREE from "three"
import { ThreeElements } from "@react-three/fiber";
import { gsap } from "gsap";

import SectionMesh from "./SectionMesh";


const Meshes = ({ objectDistance, meshColor = "#ffeded", element } : { objectDistance: number, meshColor: string, element: HTMLElement }) => {

    const torusRef = useRef<THREE.Mesh>(null!);
    const coneRef = useRef<THREE.Mesh>(null!);
    const capsuleRef = useRef<THREE.Mesh>(null!);
    const boxRef = useRef<THREE.Mesh>(null!);
    const torusKnotRef = useRef<THREE.Mesh>(null!);
    const dodecaHedronRef = useRef<THREE.Mesh>(null!);

    const texture = useTexture("/assets/textures/gradients/3.jpg") 
    texture.magFilter = THREE.NearestFilter

    const mesh1 = (<mesh ref={torusRef} scale={.2} position={[3, -objectDistance * 0, 0]}>
        <torusGeometry args={[10, 3, 16, 100]} />
        <meshToonMaterial color={meshColor} gradientMap={texture} />
    </mesh>) as unknown as THREE.Mesh;

    const mesh2 = (<mesh ref={coneRef} scale={ 1.9 } position={[-3, -objectDistance * 1, 0]}>
        <coneGeometry args={[1, 2,32]} />
        <meshToonMaterial color={ meshColor }  gradientMap={ texture } />
    </mesh>) as unknown as THREE.Mesh;

    const mesh3 = (<mesh ref={capsuleRef} scale={ 1.5 } position={[3, -objectDistance * 2, 0]}>
        <capsuleGeometry args={[1, 1, 4, 8]} />
        <meshToonMaterial color={ meshColor }  gradientMap={ texture } />
    </mesh>) as unknown as THREE.Mesh;

    const mesh4 = (<mesh ref={boxRef} scale={ 1.5 } position={[-3, -objectDistance * 3, 0]}>
        <boxGeometry args={[2,2,2]} />
        <meshToonMaterial color={ meshColor } gradientMap={ texture } />
    </mesh>) as unknown as THREE.Mesh;

    const mesh5 =  (<mesh ref={torusKnotRef} scale={ 1.5 } position={[3, -objectDistance * 4, 0]} >
        <torusKnotGeometry args={[.8, .35, 100, 16]} />
        <meshToonMaterial color={ meshColor }  gradientMap={ texture } />
    </mesh>) as unknown as THREE.Mesh;

    const mesh6 =  (<mesh ref={dodecaHedronRef} scale={ .25 } position={[-3, -objectDistance * 5, 0]} >
        <dodecahedronGeometry args={[10, 5]} />
        <meshToonMaterial color={ meshColor } gradientMap={ texture } />
    </mesh>) as unknown as THREE.Mesh;

    const sectionMeshes: THREE.Mesh[] = [mesh1, mesh2, mesh3, mesh4, mesh5, mesh6]
    const sectionMeshRef: MutableRefObject<THREE.Mesh>[] = [
        torusRef,
        coneRef,
        capsuleRef,
        boxRef, 
        torusKnotRef,
        dodecaHedronRef
    ]

    let currentSection = 0;

    useEffect(() => {

        const handleScroll = () => {
            const newSection = Math.round(element.scrollTop / 600);

            if (newSection !== currentSection) {
                currentSection = newSection;
                gsap.to(sectionMeshRef[currentSection].current.rotation, {
                    duration: 1.5,
                    ease: 'power2.inOut',
                    x: '+=6',
                    y: '+=3',
                    z: '+=1.5'
                });
            }
            
            
    
        }

        element.addEventListener("scroll", handleScroll)

        return () => {
            element?.removeEventListener("scroll", handleScroll)
        }
        
    }, [])
    
    useFrame((state, delta) => {
       
        for (const mesh of sectionMeshRef) {
            mesh.current.rotation.x += delta * .1,
            mesh.current.rotation.y += delta * .12
        }

    })

    return (
        <>
        {
            sectionMeshes && sectionMeshes.map((sectionMesh, i) => {
                return (
                    <SectionMesh key={i } mesh={ sectionMesh } />
                )
            })
        }
        </>
        
    )
}

export default Meshes;