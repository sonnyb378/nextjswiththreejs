"use client"

import * as THREE from "three"
import CanvasComponent from "@/components/canvas/CanvasComponent";

import { OrbitControls, PerspectiveCamera, AsciiRenderer,  Stage, Lightformer, Sphere, Sky, BakeShadows, SoftShadows, AccumulativeShadows, RandomizedLight, Environment, ContactShadows, Plane, Box, useMatcapTexture } from "@react-three/drei";
import PlaneComponent from "@/components/plane/PlaneComponent";
import { button, useControls } from "leva";
import { Perf } from "r3f-perf";
import ArrowRight from "../icons/ArrowRight";
import { useEffect, useRef, useState, Suspense } from "react";
import BoxDrei from "@/components/box/BoxDrei";
import DirectionalLight from "@/components/lights/DirectionalLight";
import Text3DComponent from "../text3d/Text3D";
import Donuts from "@/components/models/Donuts";
import Portal from "@/components/models/Portal";


const SceneR3FPortalScene = () => {

    const [isShow, setIsShow] = useState(true);
    const [showControls, setShowControls] = useState(true);

    const { perfVisible } = useControls('r3F perf', {
        perfVisible: false
    })


    const toggleHandler = () => {
        setIsShow(!isShow)
    }

    const showControlsHandler = () => {
        setShowControls(!showControls)
    }
    
    return (

        <div id="scene-container" className="flex w-full h-full items-start flex-1 flex-grow justify-start border-0 border-cyan-500 overflow-hidden">
            
            <div className={`flex flex-row-reverse items-start justify-between relative h-full`}>
                <div onClick={toggleHandler} className={`flex items-center justify-center absolute z-[1001] p-2 group cursor-pointer ${ isShow ? "-mr-[74px]": "-mr-[74px]" } hover:bg-slate-800`}>
                    <ArrowRight className={`${ isShow? "rotate-180" : ""} stroke-white group-hover:stroke-yellow-500 w-[20px] h-[20px] -ml-[5px]`} />
                    <span>Notes</span>
                </div>
                
                <div id="text-container" className={`scrollbar scrollbar-thumb-gray-800 scrollbar-track-zinc-900 transition-all flex flex-col w-[300px]  ${ isShow ? "ml-[0px]": "-ml-[310px]" } items-start justify-start p-2 border-0 border-emerald-500 overflow-y-auto h-full`}>
                    
                    <div className="flex flex-col items-start justify-start space-y-1 w-full border-0">
                        <button className="btn btn-primary w-full" onClick={ showControlsHandler }>Toggle Controls</button> 
                    </div>

                    <div className="flex flex-col items-start justify-start space-y-1 w-full mt-4 border-0 text-sm">
                        <h1 className="text-orange-500">Portal Scene</h1>
                        <ol className='list-decimal ml-[8px] text-xs  w-full p-2 space-y-2 border-0 text-orange-500'>
                            <li>Loading the model
                                <ul className="w-full text-xs space-y-2 mt-2 list-disc p-2 text-white">
                                    <li>Use "useGLTF" from drei to load "portal.glb"
                                        <pre>
                                            <code className="whitespace-pre-wrap break-all text-green-400 text-xs">{`import { useGLTF } from "@react-three/drei";`}</code>
                                        </pre>
                                    </li>
                                    <li>To access "nodes" & "materials" of "useGLTF" using typescript, by default you cannot destructure it like this
                                        <pre className="text-green-400 text-xs mt-2">
                                            <code>{`const { nodes, materials } = useGLTF('/models/Portal/portal.glb')`}</code>
                                        </pre>
                                    </li>
                                    <li className="border-0">
                                        First you need to create a type(eg: GLTFResult) with "nodes" and "materials" property                                        
                                        <pre className="flex items-start justify-start text-green-400 text-xs w-full">
                                            <code className="leading-none">
                                                {`
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
                                                `}
                                            </code>
                                        </pre>
                                        Import "GLTF" from "three-stdlib", "GLTF" is the type used for "useGLTF"
                                        <span className="block mt-2 text-green-400">{`import { GLTF } from 'three-stdlib'`}</span>
                                    </li>
                                    <li>Use the custom type when using "useGLTF"
                                        <pre className="flex items-start justify-start text-green-400 text-xs w-full mt-2">
                                            <code className="leading-none">{`const { nodes, materials } = useGLTF('/models/Portal/portal.glb') as GLTFResult;`}
                                            </code>
                                        </pre>
                                    </li>
                                    <li>Add the portal geometry to the {`<mesh />`}
                                        <pre className="flex items-start justify-start text-green-400 text-xs w-full mt-2">
                                            <code className="leading-none">{`<mesh geometry={ nodes.baked.geometry }>`}</code>
                                        </pre>
                                    </li>
                                </ul>
                            </li> 
                            <li>Loading the Texture
                                <ul className="w-full text-xs space-y-2 mt-2 list-disc p-2 text-white">
                                    <li>Use "useTexture" from drei
                                        <pre className="flex items-start justify-start text-green-400 text-xs w-full mt-2">
                                            <code className="leading-none">{`import { useTexture } from "@react-three/drei";`}</code>
                                        </pre>
                                    </li>
                                    <li>Load the texture using "useTexture"
                                        <pre className="flex items-start justify-start text-green-400 text-xs w-full mt-2">
                                            <code className="leading-none">{`const bakedTexture = useTexture('/models/Portal/baked.jpg')`}</code>
                                        </pre>
                                    </li>
                                    <li>Add the "bakedTexture" to the mesh
                                        <pre className="flex items-start justify-start text-green-400 text-xs w-full mt-2">
                                            <code className="leading-none">{`
<mesh geometry={ nodes.baked.geometry }>
    <meshBasicMaterial map={ bakedTexture } />
</mesh>
                                            `}</code>
                                        </pre>
                                    </li>
                                    <li>If you see your texture not aligned to the model / geometry,try flipping the Y axis to false
                                        <pre className="flex items-start justify-start text-green-400 text-xs w-full mt-2">
                                            <code className="leading-none">{`bakedTexture.flipY = false`}</code>
                                        </pre>
                                        -or-
                                        <pre className="flex items-start justify-start text-green-400 text-xs w-full mt-2">
                                            <code className="leading-none">{`<meshBasicMaterial map={ bakedTexture } map-flipY={ false } />`}</code>
                                        </pre>
                                    </li>
                                </ul>                                
                            </li>     
                            <li>Pole Lights
                                <ul className="w-full text-xs space-y-2 mt-2 list-disc p-2 text-white">
                                    <li className="space-y-2">Add poleLight meshes to the scene, after the baked geometry
                                        <pre className="flex items-start justify-start text-green-400 text-xs w-full my-2 ">
                                            <code className="leading-none">{`<mesh geometry={ nodes.poleLightA.geometry } />`}</code>
                                        </pre>
                                        <span className="text-white text-xs">If you added the "poleLightA" like that, the geometry is in the center of the scene</span>
                                    </li>  
                                    <li className="space-y-2">To position the light exactly in the pole light
                                        <pre className="flex items-start justify-start text-green-400 text-xs w-full my-2 ">
                                            <code className="leading-none">{`
<mesh
    geometry={ nodes.poleLightA.geometry } 
    position={ nodes.poleLightA.position }
/>                                            
                                            `}</code>
                                        </pre>
                                    </li>  
                                    <li className="space-y-2">To add material to the mesh 
                                        <pre className="flex items-start justify-start text-green-400 text-xs w-full my-2 ">
                                            <code className="leading-none">{`
<mesh
    geometry={ nodes.poleLightA.geometry } 
    position={ nodes.poleLightA.position }
>
    <meshBasicMaterial color="#ffffc5" />
</mesh>                                         
                                            `}</code>
                                        </pre>
                                    </li>  
                                    
                                </ul>     
                            </li>
                            <li>Fireflies
                                <ul className="w-full text-xs space-y-2 mt-2 list-disc p-2 text-white">
                                    <li className="space-y-2">Import "Sparkles" from drei
                                        <pre className="flex items-start justify-start text-green-400 text-xs w-full my-2 ">
                                            <code className="leading-none">{`import { Sparkles } from "@react-three/drei";`}</code>
                                        </pre>
                                    </li> 
                                    <li className="space-y-2">Use {`<Sparkles />`}
                                        <pre className="flex items-start justify-start text-green-400 text-xs w-full my-2 ">
                                            <code className="leading-none">{`
<Sparkles 
    size={ 6 }
    scale={ [4, 2, 4] }
    position-y={ 1 }
    speed={ .2 }
    count={ 40}
/>                                            
                                            `}</code>
                                        </pre>
                                    </li>  
                                </ul>
                            </li>
                            <li>Adding the Custom Portal Shader
                                <ul className="w-full text-xs space-y-2 mt-2 list-disc p-2 text-white">
                                    <li className="space-y-2">Install "raw-loader"
                                        <pre className="flex items-start justify-start text-green-400 text-xs w-full my-2 ">
                                            <code className="leading-none">{`npm install raw-loader`}</code>
                                        </pre>
                                    </li> 
                                    <li className="space-y-2">Also install @types/raw-loader
                                        <pre className="flex items-start justify-start text-green-400 text-xs w-full my-2 ">
                                            <code className="leading-none">{`npm install --save-dev @types/raw-loader`}</code>
                                        </pre>
                                    </li> 
                                    <li className="space-y-2">Update your next.config.ts file
                                        <pre className="flex items-start justify-start text-green-400 text-xs w-full my-2 ">
                                            <code className="leading-none">{`
webpack: (config) => {
    config.module.rules.push({
      test: /src[/\\]shaders[/\\]portal[/\\].+\.glsl$/,
      use: 'raw-loader',
    });
    return config;
},                                            
                                            `}</code>
                                        </pre>
                                    </li> 
                                    <li className="space-y-2">Also create a globals.d.ts file in "src" folder
                                        <pre className="flex items-start justify-start text-green-400 text-xs w-full my-2 ">
                                            <code className="leading-none">{`
declare module '*.glsl' {
    const value: string;
    export default value;
}                                            
                                            `}</code>
                                        </pre>
                                    </li>
                                    <li className="space-y-2">Now you can import vertex and fragment glsl files
                                        <pre className="flex items-start justify-start text-green-400 text-xs w-full my-2 ">
                                            <code className="leading-none">{`
import fragmentShader from '@/shaders/portal/fragment.glsl';
import vertexShader from '@/shaders/portal/vertex.glsl';                                            
                                            `}</code>
                                        </pre>
                                    </li> 
                                    <li className="space-y-2">Implementing Shaders
                                        <pre className="flex items-start justify-start text-green-400 text-xs w-full my-2 ">
                                            <code className="leading-none">{`
<shaderMaterial
vertexShader={ vertexShader }
fragmentShader={ fragmentShader }
uniforms={ 
    {
        uTime: { value: 0 },
        uColorStart: {
            value: new THREE.Color("#8f09ad")
        },
        uColorEnd: {
            value: new THREE.Color("#241c49")
        },
    }
}                    
/>                                        
                                            `}</code>
                                        </pre>
                                    </li>
                                </ul>
                            </li>
                            <li>The shaderMaterial helper
                                <ul className="w-full text-xs space-y-2 mt-2 list-disc p-2 text-white">
                                    <li className="space-y-2">Import shaderMaterial from drei
                                        <pre className="flex items-start justify-start text-green-400 text-xs w-full my-2 ">
                                            <code className="leading-none">{`
                                                import { shaderMaterial } from "@react-three/drei";
                                            `}</code>
                                        </pre>
                                    </li>
                                    <li className="space-y-2">Create an interface for the PortalMaterial props
                                        <pre className="flex items-start justify-start text-green-400 text-xs w-full my-2 ">
                                            <code className="leading-none">{`
interface PortalMaterialProps {
    uTime?: number,
    uColorStart?: THREE.Color,
    uColorEnd?: THREE.Color
}                                               
                                            `}</code>
                                        </pre>
                                    </li>
                                    <li className="space-y-2">Using shaderMaterial, create PortalMaterial. Add the vertex and fragment shaders
                                        <pre className="flex items-start justify-start text-green-400 text-xs w-full my-2 ">
                                            <code className="leading-none">{`
const PortalMaterial = shaderMaterial(
    {
        uTime: 0,
        uColorStart: new THREE.Color("#8f09ad"),
        uColorEnd:  new THREE.Color("#241c49")
    },
    vertexShader,
    fragmentShader    
);                                               
                                            `}</code>
                                        </pre>
                                    </li>
                                    <li className="space-y-2">import "extend" from R3F
                                        <pre className="flex items-start justify-start text-green-400 text-xs w-full my-2 ">
                                            <code className="leading-none">{`extend({ PortalMaterial })`}</code>
                                        </pre>
                                    </li>
                                    <li className="space-y-2">Using {`<portalMaterial />`} will not be recognized by Typescript
                                        <pre className="flex items-start justify-start text-green-400 text-xs w-full my-2 ">
                                            <code className="leading-none">{`Property 'portalMaterial' does not exist on type 'JSX.IntrinsicElements'.`}</code>
                                        </pre>
                                    </li>
                                    <li className="whitespace-pre-wrap break-all space-y-2">To allow our portalMaterial to be recognized, we need to extend {` JSX.IntrinsicElements["meshStandardMaterial"]`} interface
                                        <pre className="flex items-start justify-start text-green-400 text-xs w-full my-2 ">
                                            <code className="leading-none">{`
declare global {
    namespace JSX {
      interface IntrinsicElements {
        portalMaterial: PortalMaterialProps & JSX.IntrinsicElements["meshStandardMaterial"]
      }
    }
}                                            
                                            `}</code>
                                        </pre>
                                        <span className="block">This allows the 'portalMaterial' element to be used in a JSX expression</span>
                                    </li>
                                    <li className="space-y-2">You can now add {`<portalMaterial />`}
                                        <pre className="flex items-start justify-start text-green-400 text-xs w-full my-2 ">
                                            <code className="leading-none">{`
<mesh 
    geometry={ nodes.portalLight.geometry }
    position={ nodes.portalLight.position }
    rotation={ nodes.portalLight.rotation }
>
    <portalMaterial />
</mesh>                                            
                                            `}</code>
                                        </pre>
                                    </li>
                                </ul>
                            </li>
                            <li>Animating the Portal
                                <ul className="w-full text-xs space-y-2 mt-2 list-disc p-2 text-white">
                                    <li className="space-y-2">Create a reference to the portalMaterial
                                        <pre className="flex items-start justify-start text-green-400 text-xs w-full my-2 ">
                                            <code className="leading-none">{`const portalMaterialRef = useRef<PortalMaterialProps & THREE.MeshStandardMaterial>(null!);`}</code>
                                        </pre>
                                    </li> 
                                    <li className="space-y-2">Add the "portalMaterialRef"
                                        <pre className="flex items-start justify-start text-green-400 text-xs w-full my-2 ">
                                            <code className="leading-none">{`<portalMaterial ref={ portalMaterialRef }/>`}</code>
                                        </pre>
                                    </li> 
                                    <li className="space-y-2">Animate "uTime"
                                        <pre className="flex items-start justify-start text-green-400 text-xs w-full my-2 ">
                                            <code className="leading-none">{`
useFrame((state, delta) => {
    portalMaterialRef.current.uTime! += delta
})                                            
                                            `}</code>
                                        </pre>
                                    </li> 
                                </ul>
                            </li>
                        </ol>
                    </div>

                    <div className="flex flex-col items-start justify-start space-y-1 w-full border-0">
                        <button className="btn btn-primary w-full" onClick={ showControlsHandler }>Toggle Controls</button> 
                    </div>
                    
                </div>
            </div>

            <div id="canvas" style={{ width:"100%" }} className="flex items-center justify-center w-full h-full max-h-full border-0 border-yellow-700">
                
                
                    <CanvasComponent
                        gl = {
                            {
                                antialias: true,
                                toneMapping: THREE.ACESFilmicToneMapping,
                                outputEncoding: THREE.sRGBEncoding
                            }
                        }
                        camera={
                            {
                                fov: 75,
                                near: 1,
                                far: 200,
                                position: [0, 3, 3]
                            }
                        }
                        className="border-0"
                        showControls={ showControls }
                        flat={true}
                    >
                        
                        {
                            perfVisible && <Perf position="bottom-right" />
                        }

                        <color args={["#030202"]} attach="background" />
                        
                        <PerspectiveCamera rotation={ [0, -.40, 0]} position={[0, 1, 0]}>                    
                            <color args={ ['#4db9ce'] } attach="background" />
                            <ambientLight intensity={0.5} />
                            <DirectionalLight 
                                position={ [1, 5, 6] } 
                                intensity={ 1.5 } 
                                scale={1} 
                                castShadow
                                shadow-normalBias={ 0.04 }
                            />

                            <Portal />

                            <OrbitControls makeDefault  />
                        </PerspectiveCamera>
                    </CanvasComponent>
               
            </div>
            
            
            
        </div>
    )
}

export default SceneR3FPortalScene;
