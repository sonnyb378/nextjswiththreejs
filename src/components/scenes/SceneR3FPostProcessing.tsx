// "use client"

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
import HamburgerDrei from "@/components/models/HamburgerDrei";
import HamburgerTransformed from "@/components/models/HamburgerTransformed";

import BoxPostProcessing from "@/components/box/BoxPostProcessing";
import PlanePostProcessing from "@/components/plane/PlanePostProcessing";

import { Effects } from "@/utils/Effects";
import Drunk from "@/utils/Drunk";
import { EffectComposer } from "@react-three/postprocessing";
import * as PostProcessing from "postprocessing";

const SceneR3FPostProcessing = () => {

    const [isShow, setIsShow] = useState(true);
    const [showControls, setShowControls] = useState(true);

    const drunkRef = useRef()

    const { perfVisible } = useControls('r3F perf', {
        perfVisible: false
    })


    const toggleHandler = () => {
        setIsShow(!isShow)
    }

    const showControlsHandler = () => {
        setShowControls(!showControls)
    }

    const drunkProps = useControls('Drunk Effects', {
        frequency: { value: 2, min: 1, max: 20 }, 
        amplitude: { value: 0.1, min: 0, max: 1 }        
    })
    
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
                        <h1 className="text-orange-500">Post Processing</h1>
                        <ol className='list-decimal ml-[8px] text-xs  w-full p-2 space-y-2 border-0 text-orange-500'>
                            <li className="text-yellow-500">We need two(2) dependencies
                                <ul className="w-full text-xs space-y-2 mt-2 list-disc p-2 text-white">
                                    <li>R3F implements it as <span className="text-green-500">@react-three/postprocessing</span></li>
                                    <li><span className="text-green-500">"postprocessing" - github.com/pmndrs/postprocessing</span></li>
                                    <li>Documentation: https://github.com/pmndrs/postprocessing</li>
                                    <li className="list-none p-2">
                                        <pre><code className="text-green-400 p-2">
                                        {`
npm install @react-three/postprocessing
                                        `}</code></pre>
                                    </li>
                                    <li className="list-none p-2">Use {`<EffectComposer>...</EffectComposer>`} in your scene
                                        <pre>
                                            <code className="text-green-400 p-2">{`
<EffectComposer>
    // add effects here
</EffectComposer>                                            
                                            `}</code>
                                        </pre>
                                    </li>
                                    <li>Note: @react-three/postprocessing will not work in NextJS if you are using "/app" </li>
                                </ul>
                            </li>  
                            <li>MultiSampling
                                <ul className="w-full text-xs space-y-2 mt-2 list-disc p-2 text-white">
                                    <li>MultiSampling is used to prevent anti-aliasing effect. Default value is 8
                                        <pre>
                                            <code className="text-green-400 p-2">{`
<EffectComposer multisampling={ 0 }>
    // add effect here      
</EffectComposer>                                            
                                            `}</code>
                                        </pre></li>
                                </ul>
                            </li>  
                            <li>Effects
                                <ul className="w-full text-xs space-y-2 mt-2 list-disc p-2 text-white">
                                    <li><span className="text-yellow-500">Vignette</span> will make the corners of the render darker
                                        <pre>
                                            <code className="text-green-400 p-2">{`
<EffectComposer>
    <Vignette offset={ 0.3 } darkness={ .9 } />        
</EffectComposer>                                            
                                            `}</code>
                                        </pre>
                                    </li> 
                                    <li><span className="text-yellow-500">Glitch Effect</span> will make the screen glitch randomly
                                        <pre>
                                            <code className="text-green-400 p-2">{`
<EffectComposer>
    <Glitch
        delay={ new THREE.Vector2(.5, 1) }
        duration={ new THREE.Vector2(.1, 3) } 
        strength={ new THREE.Vector2(.2, .4) } 
        mode={ PostProcessing.GlitchMode.SPORADIC}
    />       
</EffectComposer>                                            
                                            `}</code>
                                        </pre>
                                    </li>   
                                    <li><span className="text-yellow-500">Noise Effect</span> adds a grain effect to the screen
                                        <pre>
                                            <code className="text-green-400 p-2">{`
<EffectComposer>
    <Noise 
        blendFunction={ PostProcessing.BlendFunction.SOFT_LIGHT }
        premultiply
    />    
</EffectComposer>                                            
                                            `}</code>
                                        </pre>
                                    </li>
                                    <li><span className="text-yellow-500">Bloom Effect</span> makes the object glow. Use mipmapBlue to increase the glow
                                        <pre>
                                            <code className="text-green-400 p-2">{`
<EffectComposer>
    <Bloom mipmapBlur />
</EffectComposer>                                            
                                            `}</code>
                                        </pre>
                                        <span className="block">You can change the brightness of the bloom by tweaking props in your material (eg: emissive, emissiveIntensity, etc)</span>
                                        <pre>
                                            <code className="text-green-400 p-2">{`
<BoxPostProcessing position={[ 3.2, 2, 0]} scale={ 5 }>
    <meshStandardMaterial 
        color={ \`white\` }
        toneMapped={false} 
        emissive={\`orange\`}
        emissiveIntensity={ 5 }
    />
</BoxPostProcessing>                                          
                                            `}</code>
                                        </pre>
                                        <span className="block">To get a uniform emissive, use "meshBasicMaterial" instead of "meshStandardMaterial", 
                                        but you will not be able to use "emissive" and "emissiveIntensity" but not good for performance if values get too high</span>
                                        <pre>
                                            <code className="text-green-400 p-2">{`
<BoxPostProcessing position={[ 3.2, 2, 0]} scale={ 5 }>
    <meshBasicMaterial 
        color={ [1.5, 1, 4] }
        toneMapped={false} 
    />
</BoxPostProcessing>                                          
                                            `}</code>
                                        </pre>
                                    </li> 
                                    <li><span className="text-yellow-500">DepthOfField effect</span> blur what's closer or farther from the set distance
                                        <span className="block mt-2 text-yellow-400">3 main attributes</span>
                                        <ul className="list-decimal p-2 ml-4">
                                            <li><span className=" text-green-400">focusDistance</span> at which distance the image should be sharp (camera to x)
                                                <pre className="p-2"><code>{`camera ------ x`}</code></pre>
                                            </li>
                                            <li><span className=" text-green-400">focalLength</span> the distance to travel from the focusDistance before reaching the maximum blur (x to y)
                                                <pre className="p-2"><code>{`camera ------ x ------ y`}</code></pre>
                                            </li>
                                            <li><span className=" text-green-400">bokehScale</span> the blur radius (z)
                                                <pre className="p-2"><code>{`camera ------ subject z------z x`}</code></pre>
                                            </li>
                                            <li>Values are normalised between 0 and 1</li>
                                            <li>Will affect performance</li>
                                        </ul>
                                        <pre>
                                            
                                            <code className="text-green-400 p-2">{`
<EffectComposer>
    <DepthOfField 
        focusDistance={ 0.025 }
        focalLength={ 0.025 }
        bokehScale={ 6 }
    />      
</EffectComposer>                                            
                                            `}</code>
                                        </pre>
                                    </li>   
                                    <li><span className="text-yellow-500">ScreenSpaceReflection (SSR) effect</span>
                                        <ul className="list-decimal p-2 ml-4">
                                            <li>{`<SSR />`} breaks in NextJS 13 (@react-three/postprocessing ver. 2.7.1)</li>
                                            <li>Affects performance</li>
                                        </ul>
                                        <pre>                                            
                                            <code className="text-green-400 p-2">{`
import { EffectComposer, SSR } from "@react-three/postprocessing";

<EffectComposer>
    <SSR />
</EffectComposer>                                            
                                            `}</code>
                                        </pre>
                                    </li>   
                                    <li><span className="text-yellow-500">Custom Effect</span>
                                        <ul className="list-decimal p-2 ml-4">
                                            <li>Create your custom effect (eg: DrunkEffect)
                                                <pre>                                            
                                                    <code className="text-green-400 p-2">{`
import * as PostProcessing from "postprocessing"

// webgl 2 syntax
const fragmentShader = /* glsl */\`
    void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) 
    {
        outputColor = inputColor;
    }
\`

// DrunkEffect
export default class DrunkEffect extends PostProcessing.Effect {
    constructor() {
        super(
            'DrunkEffect', 
            fragmentShader, 
            {
                
            }
        )
    }

}
                                   
                                            `}</code></pre>
                                            </li>
                                            <li>Create a component that will use the "DrunkEffect" class
                                                <pre>                                            
                                                    <code className="text-green-400 p-2">{`
import DrunkEffect from "./DrunkEffect"

export default function Drunk() {
    
    const effect = new DrunkEffect();

    return (
       <primitive object={ effect } />
    )
}                                                  
                                                    `}</code>
                                                </pre>
                                            </li>
                                            <li>In your scene, add the component (eg: Drunk component) inside the {`<EffectComposer>`}
                                                <pre>                                            
                                                    <code className="text-green-400 p-2">{`
<EffectComposer>
    <Drunk ref={ drunkRef } />
</EffectComposer>                                                 
                                                    `}</code>
                                                </pre>
                                            </li>
                                            <li>Passing props to the Drunk component
                                                <ul className="list-disc p-2">
                                                    <li>Change the Drunk component to accept props <pre>                                           
                                                        <code className="text-green-400 p-2">{`
import DrunkEffect from "./DrunkEffect"
import { forwardRef } from "react";

export type DrunkProps = {
    frequency?: number,
    amplitude?: number
}
export default forwardRef(function Drunk(props: DrunkProps) {
    
    const effect = new DrunkEffect(props);

    return (
       <primitive object={ effect } />
    )
})                                               
                                                        `}</code>
                                                        </pre>
                                                    </li>
                                                    <li>Update DrunkEffect<pre>
                                                        <code className="text-green-400">{`

import { DrunkProps } from "./Drunk"
import * as THREE from "three"

// webgl 2 syntax
const fragmentShader = /* glsl */\`
    void mainUv(inout vec2 uv) {
        uv.y += sin(uv.x * 10.0) * 0.1;
    }

    void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) 
    {
        vec4 color = inputColor;
        color.rgb *= vec3(0.8, 1.0, 0.5);
        outputColor = color;
    }
\`

export default class DrunkEffect extends PostProcessing.Effect {
    constructor(props: DrunkProps) {
        const { amplitude, frequency } = props;
        super(
            'DrunkEffect', 
            fragmentShader, 
            {
                uniforms: new Map([
                    ['frequency', new THREE.Uniform(frequency) ],
                    ['amplitude', new THREE.Uniform(amplitude) ]
                ])                
            }
        )
    }
}
                                                                
                                                        `}</code></pre>
                                                    </li>
                                                    <li>Animating Custom Effect
                                                        <ul className="list-decimal p-2">
                                                            <li>Add an "offset" uniform in the fragmentShader
                                                                <pre><code className="text-green-400 p-2">{`
const fragmentShader = /* glsl */\`
    ...
    uniform float offset;

    void mainUv(inout vec2 uv) {
        uv.y += sin(uv.x * frequency + offset) * amplitude;
    }

    void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) 
    {
        ...
    }
\``}</code></pre>
                                                            </li>
                                                            <li>in the super() method, add "offset" to uniform property
                                                                <pre><code className="text-green-400 p-2">{`
super(
    'DrunkEffect', 
    fragmentShader, 
    {
        blendFunction: blendFunction ?  blendFunction : PostProcessing.BlendFunction.DARKEN,
        uniforms: new Map([
            ['frequency', new THREE.Uniform(frequency) ],
            ['amplitude', new THREE.Uniform(amplitude) ],
            ['offset', new THREE.Uniform(0) ]
        ])
    }
)
`}</code></pre>
                                                            </li>
                                                            <li>Add the update() method
                                                                <pre><code className="text-green-400 p-2">{`
update(renderer: THREE.WebGLRenderer, inputBuffer: THREE.WebGLRenderTarget, deltaTime: number): void {
    this.uniforms.get('offset')!.value += deltaTime;
}
`}</code></pre>
                                                            </li>
                                                        </ul>
                                                        
                                                    </li>
                                                </ul>
                                                
                                            </li>
                                        </ul>   

                                    </li>                               
                                </ul>
                            </li>  
                                 
                            <li>blendFunction
                                <span className="block mt-2 text-white">An attribute available for all effects</span>
                                <pre>
                                    <code className="text-green-400 p-2">{`
import * as PostProcessing from "postprocessing"      

<EffectComposer>
    <Vignette 
        offset={ 0.3 }
        darkness={ .9 }
        blendFunction={ PostProcessing.BlendFunction.NORMAL }
    />
</EffectComposer>
                                    `}</code>
                                </pre>
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
                                position: [0, 5, 10]
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
                    
                        
                        <EffectComposer>
                            <Drunk
                                ref={ drunkRef }
                                { ...drunkProps }
                                blendFunction={ PostProcessing.BlendFunction.COLOR_BURN }
                            />
                        </EffectComposer>

                        <PerspectiveCamera rotation={ [0, -.45, 0]} position={[0, 2, 0]}>   
                            <ambientLight intensity={0.5} />
                            <DirectionalLight 
                                position={ [1, 5, 6] } 
                                intensity={ 1.5 } 
                                scale={1} 
                                castShadow
                                shadow-normalBias={ 0.04 }
                            />

                            <Sphere     
                                position={[ -3.2, 2, 0] } 
                                scale={ 5 }
                                args={[.3]}
                                visible={ true }
                                onClick={ (event) => { event.stopPropagation() } }
                            >
                                <meshStandardMaterial color={ `#e38100` } 
                            />
                            </Sphere>

                            <BoxPostProcessing position={[ 3.2, 2, 0]} scale={ 5 }>
                                <meshStandardMaterial 
                                    color={ 'mediumpurple' }
                                    // toneMapped={false} 
                                    // emissive={`orange`}
                                    // emissiveIntensity={ 5 }
                                />
                            </BoxPostProcessing>


                            <PlanePostProcessing 
                                scale={ 10 }
                                position={[0, 0, 0]}
                                rotation={[-Math.PI * .5, 0, 0]}
                                // receiveShadow
                            >
                                <meshStandardMaterial 
                                    color={ "#c9e418" } 
                                    roughness={ 0 }
                                    metalness={ 0 }
                                />
                            </PlanePostProcessing> 

                            <OrbitControls makeDefault  />
                        </PerspectiveCamera>

                        

                        {/* <Effects /> */}
                    </CanvasComponent>
               
            </div>
            
            
            
        </div>
    )
}

export default SceneR3FPostProcessing;
