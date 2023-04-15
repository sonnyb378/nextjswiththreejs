"use client"

import * as THREE from "three"
import CanvasComponent from "@/components/canvas/CanvasComponent";

import { OrbitControls, PerspectiveCamera, Stage, Lightformer, Sphere, Sky, BakeShadows, SoftShadows, AccumulativeShadows, RandomizedLight, Environment, ContactShadows, Plane, Box } from "@react-three/drei";
import PlaneComponent from "@/components/plane/PlaneComponent";
import { button, useControls } from "leva";
import { Perf } from "r3f-perf";
import ArrowRight from "../icons/ArrowRight";
import { useEffect, useRef, useState } from "react";
import BoxDrei from "@/components/box/BoxDrei";
import DirectionalLight from "@/components/lights/DirectionalLight";
import { Canvas } from "@react-three/fiber";



const SceneR3fEnvAndStaging = () => {

    const [isShow, setIsShow] = useState(true);
    const [showControls, setShowControls] = useState(true);
    // const [wh, setWh] = useState({ width: 0, height: 0 })

    // const { perfVisible } = useControls('r3F perf', {
    //     perfVisible: false
    // })

    // const { position, color, visible } = useControls('Sphere Component', { 
    //     position: {
    //         value: { x: -1.2, y: .68, z: 0 },
    //         step: .01,
    //         joystick: "invertY"
    //     },
    //     color: "#ff0000",
    //     visible: true,
    //     clickMe: button(() => { console.log("button clicked") }),
    //     choice: { options: ['a', 'b', 'c'] }
    // }, {
    //     collapsed: true
    // })    

    // const boxControls = useControls('Box Component', { 
    //     position: {
    //         value: { x: 1.2, y: .68 },
    //         step: .01,
    //         joystick: "invertY"
    //     },
    //     scale: 2,
    //     color: "#f662f9",
    //     visible: true,
    // }, {
    //     collapsed: true
    // })

    // const { csColor, csOpacity, csBlur } = useControls('ContactShadow', {
    //     csColor: "#4b2709",
    //     csOpacity: { value: 0.5, min: 0, max: 1},
    //     csBlur: { value: 1, min: 0, max: 10 }
    // }, {
    //     collapsed: true
    // })

    // const skyControls = useControls('sky', {
    //     sunPosition: { value:[1, 2, 3] }
    // }, {
    //     collapsed: true
    // })

    const { envMapIntensity, envMapHeight, envMapRadius, envMapScale } = useControls('environment map', {
        envMapIntensity: {
            value: 7.0,
            min: 0, 
            max: 12
        },
        envMapHeight: {
            value: 7,
            min: 0, 
            max: 100
        },
        envMapRadius: {
            value: 28,
            min: 10, 
            max: 1000
        },
        envMapScale: {
            value: 100,
            min: 10, 
            max: 1000
        }
    })

    // const { envMapIntensity } = useControls('environment map', {
    //     envMapIntensity: {
    //         value: 7.0,
    //         min: 0, 
    //         max: 12
    //     },
    // })

    
    // useEffect(() => {
    //     const canvasContainer = document.querySelector("#canvas") as HTMLDivElement;
    //     const width = canvasContainer.offsetWidth;
    //     const height = canvasContainer.offsetHeight;
    //     setWh({ width: width, height: height})
    // },[])

    // const onCreatedHandler = ({ gl, scene } : { 
    //     gl: THREE.WebGLRenderer ,
    //     scene: THREE.Scene
    // }) => {
    //     gl.setClearColor('#b700ff', 1) // webgl renderer
    //     scene.background = new THREE.Color('#054e50')
    // }

    const toggleHandler = () => {
        // setIsShow(!isShow)
    }

    const showControlsHandler = () => {
        // setShowControls(!showControls)
    }

    
   
    return (

        <div id="scene-container" className="flex w-full h-full items-start flex-1 flex-grow justify-start border-0 border-cyan-500 overflow-hidden">
            
            <div className={`flex flex-row-reverse items-start justify-between relative h-full`}>
                <div onClick={toggleHandler} className={`flex items-center justify-center absolute z-[1001] p-2 group cursor-pointer ${ isShow ? "-mr-[74px]": "-mr-[74px]" } hover:bg-slate-800`}>
                    <ArrowRight className={`${ isShow? "rotate-180" : ""} stroke-white group-hover:stroke-yellow-500 w-[20px] h-[20px] -ml-[5px]`} />
                    <span>Notes</span>
                </div>
                
                <div id="text-container" className={`scrollbar bg- scrollbar-thumb-gray-800 scrollbar-track-zinc-900 transition-all flex flex-col w-[300px]  ${ isShow ? "ml-[0px]": "-ml-[310px]" } items-start justify-start p-2 border-0 border-emerald-500 overflow-y-auto h-full`}>
                    
                    <div className="flex flex-col items-start justify-start space-y-1 w-full border-0">
                        <button className="btn btn-primary w-full" onClick={ showControlsHandler }>Toggle Controls</button> 
                    </div>
                    <div className="flex flex-col items-start justify-start space-y-1 w-full mt-4 border-0 text-sm">
                        <h1 className="text-orange-500">Changing Background Color</h1>
                        <ol className='text-yellow-400 list-decimal p-2 ml-4'>
                            <li>WebGLRenderer: Canvas - onCreated prop</li>
                            <li>Scene: Canvas - onCreated prop</li>
                            <li>Use the &lt;color /&gt; tag, make sure that it is inside &lt;Canvas /&gt;</li>
                        </ol>
                        <p className="p-2"><code className="text-green-500">{`<color args={ ['#033f4b'] } attach="background" />`}</code> will attach the background color to its direct parent</p>
                        
                        <p className="p-2">**All these methods will make the Canvas background opaque</p>

                        <h1 className="text-orange-500">Lights</h1>
                        <ol className='text-yellow-400 list-decimal p-2 ml-4'>
                            <li>Light Helper: 'useHelper' from drei</li>
                        </ol>

                        <h1 className="text-orange-500">Shadows</h1>
                        <ol className='text-yellow-400 list-decimal p-2 ml-4'>
                            <li>Add 'shadow' props to the {`<Canvas />`}: <span className='text-green-400'>{`<Canvas {...props} shadows >`}</span></li>
                            <li>Use 'castShadow' prop to tell which objects will cast a shadow: <span className='text-green-400'>{`<directionalLight ref={directional} {...props} castShadow />`}</span></li>
                            <li>Use 'receiveShadow' prop to tell which objects will receive a shadow: <span className='text-green-400'>{`<PlaneComponent {...props} receiveShadow /> `}</span></li>
                        </ol>

                        <h1 className="text-orange-500">Configuring Shadows</h1>
                        <ol className='text-yellow-400 list-decimal p-2 ml-4'>
                            <li>To make the shadows sharper, use {`shadow-mapSize`} to the object casting the shadow: <span className='text-green-400'>{`<directionalLight ref={directional} {...props} castShadow shadow-mapSize={ [1024, 1024] } />`}</span></li>
                            <li>To control the view frustum of the camera used to render the shadows, use 'shadow-camera' property of the light source: <span className='text-green-400'>{`<directionalLight 
                                    {...props} 
                                    ref={directional} 
                                    castShadow 
                                    shadow-mapSize={ [1024, 1024] }
                                    shadow-camera-top={ 1.2 }
                                    shadow-camera-right={ 1.2 }
                                    shadow-camera-bottom={ -1.2 }
                                    shadow-camera-left={ -1.2 }
                                />`}</span>
                                <br />
                                <span>Notice that the shadow casted by both object is only casting half shadows.</span>
                            </li>
                        </ol>

                        <h1 className="text-orange-500">Baking</h1>
                        <ol className='text-yellow-400 list-decimal p-2 ml-4'>
                            <li>Import 'BakeShadows' from drei {`import { BakeShadows } from "@react-three/drei";`}</li>
                            <li>Add {`<BakeShadows />`} in the {`<Canvas />`}</li>
                        </ol>
                        <p className="p-2">Notice that the spinning box shadow is not moving, using {`<BakeShadows />`} will add shadows on first render</p>
                        <h1 className="text-orange-500">Soft Shadows</h1>
                        <ol className='text-yellow-400 list-decimal p-2 ml-4'>
                            <li>Percent Closer Soft Shadows (PCSS): PCSS will make the shadow blurry by picking the shadow map texture at an offset position according to the distance between the surface casting the shadow and the surface receiving the shadow.</li>
                            <li className="whitespace-pre-wrap break-all">https://threejs.org/examples/#webgl_shadowmap_pcss</li>
                            <li>Import SoftShadows() from drei. Inside the {`<Canvas />`}, add {`<SoftShadows size={25} samples={17} focus={9.5} />`} </li>
                        </ol>

                        <h1 className="text-orange-500">Accumulative Shadows</h1>
                        <ol className='text-yellow-400 list-decimal p-2 ml-4'>
                            <li>AccumulativeShadows will accumulate multiple shadow renders, and we are going to move the light randomly before each render.</li>
                            <li>Can be rendered on a plane only</li>
                            <li>Since AccumulativeShadows will be a shadow on its own, we should deactivate the shadows on the {`<mesh>`} corresponding to the plane. Remove the 'receiveShadow' prop</li>
                            <li>Remove {`<SoftShadows />`} too</li>
                            <li>Add {`<AccumulativeShadows>`}, opening and closing tags inside {`<Canvas />`}
                                <ol className="p-2">
                                    <li>
                                        <span className='text-green-400'>{`
                                            <AccumulativeShadows scale={ 6 } position={[0, -1.01, 0]}>
                                                <DirectionalLight position={[1, 3.5, 3]} intensity={ 1.5 } scale={1} />
                                            </AccumulativeShadows>
                                            `}
                                        </span>
                                    </li>    
                                    <li>{`<AccumulativeShadows />`} are not good with animated objects. It is only good to use for static objects.</li>                                
                                </ol>                                
                                The {`<DirectionalLight />`} inside the {`<AccumulativeShadows>`} must have the same set up as your {`<DirectionalLight />`} of the scene
                            </li>
                            <li>Use <span className='text-green-400'>RandomizedLight</span> from drei to create softer shadows
                                <ol className="p-2">
                                    <li>Replace the {`<DirectionalLight />`} in the {`<AccumulativeShadows />`} with {`<RandomizedLight />`}
                                        <ul className="p-2">
                                            <li className="text-green-400">
                                                {`
                                                    <AccumulativeShadows scale={ 6 } position={[0, -1.01, 0]}>
                                                        <RandomizedLight position={[1, 3.5, 3]} intensity={ 1.5 } scale={1} />
                                                    </AccumulativeShadows>
                                                `}
                                            </li>
                                        </ul>
                                    </li>
                                    <li>Options related to light:
                                        <ul className="p-2">
                                            <li>amount</li>
                                            <li>radius</li>
                                            <li>intensity</li>
                                            <li>ambient</li>
                                        </ul>

                                    </li>
                                    <li>Options related to light:
                                        <ul className="p-2">
                                            <li>castShadow</li>
                                            <li>bias</li>
                                            <li>mapSize</li>
                                            <li>size</li>
                                            <li>near</li>
                                            <li>far</li>
                                        </ul>
                                    </li>
                                    <li>'frames' props distributes that shadows in different frames.</li>
                                    <li>Be careful when using the 'frames' prop of {`<AccumulativeShadows />`}. Your computer might freeze, if provided with large numbers</li>
                                </ol>
                            </li>
                        </ol>

                        <h1 className="text-orange-500">Contact Shadows</h1>
                        <ol className='text-yellow-400 list-decimal p-2 ml-4'>
                            <li>{`<ContactShadows />`} works without a light and only on a plane</li>
                        </ol>

                        <h1 className="text-orange-500">Sky</h1>
                        <ol className='text-yellow-400 list-decimal p-2 ml-4'>
                            <li>Use "Sky" helper from Drei
                                <ol className='list-decimal p-2 ml-4'>
                                    <li>Add <span className='text-green-400'>{`<Sky />`}</span> in your <span className='text-green-400'>{`<Canvas />`}</span></li>
                                    <li>Using the 'sunPosition' of {`<Sky />`} is not the usual way of setting sun position
                                        <ol className='list-decimal p-2 ml-4'>
                                            <li>Better to use spherical coordinates</li>
                                            <li>Create Spherical</li>
                                            <li>Create Vector3</li>
                                            <li>Use its 'setFromSpherical' method</li>
                                        </ol>
                                    </li>
                                </ol>
                            </li>
                        </ol>

                        <h1 className="text-orange-500">Environment Map</h1>
                        <ol className='text-yellow-400 list-decimal p-2 ml-4'>
                            <li>Import 'Environment' helper from Drei
                                <ol className='list-decimal p-2 ml-4 text-white'>
                                    <li>Remove all lighting from your scene</li>
                                    <li>Add your environment maps to "public" folder. {`"public" > "environmentMaps"`}</li>
                                    <li>Add the {`<Environment />`} to your scene and set its files attribute
                                        <span className='text-green-400 block'>
                                            {`
                                                <Environment 
                                                    files={ [
                                                        '/environmentMaps/2/px.jpg',
                                                        '/environmentMaps/2/nx.jpg',
                                                        '/environmentMaps/2/py.jpg',
                                                        '/environmentMaps/2/ny.jpg',
                                                        '/environmentMaps/2/pz.jpg',
                                                        '/environmentMaps/2/nz.jpg',
                                                    ]}                                                    
                                                />
                                            `}
                                        </span>
                                    </li>                                    
                                </ol>
                            </li>
                            <li>
                                <span className='text-yellow-400'>Intensity</span>
                                <ol className='text-white'>
                                    <li>Use "envMapIntensity" of each material, to increase the intensity of the environment map</li>
                                </ol>
                            </li>
                            <li>
                                <span className='text-yellow-400'>Background</span>
                                <ol className='text-white'>
                                    <li>Add the <span className='text-green-400'>"background"</span> attribute in {`<Environment />`}</li>
                                </ol>
                            </li>
                            <li>
                                <span className='text-yellow-400'>HDRI Texture</span>
                                <ol className='text-white list-decimal p-4'>
                                    <li>Better than using 6 images</li>
                                    <li>Must use .hdr files in {`<EnvironmentMaps />`}
                                        <ul>
                                            <li><span className="text-green-400 whitespace-pre-wrap break-all">
                                                {`<Environment background={ true } files='/environmentMaps/the_sky_is_on_fire_2k.hdr' />`}
                                                </span></li>
                                        </ul>
                                    </li>
                                    <li>download HDRIs in polyhaven</li>
                                    <li>Presets
                                        <ol  className='text-white'>
                                            <li className="text-green-400 whitespace-pre-wrap break-all">{`<Environment background={ true } preset="sunset" />`}</li>
                                        </ol>
                                    </li>
                                </ol>
                            </li>
                            <li>
                                <span className='text-yellow-400'>Lightformer</span>
                                "Lightformer": Draws a flat rectangles, circles or rings. illuminates the area once you put in HDRI {`<Environment />`}
                                <ul className='text-white p-4'>
                                    <li className="text-green-400">{`<Environment background={ true } >
                                        <Lightformer 
                                            position-z={ -5 } 
                                            scale={ 10} 
                                            color="red"
                                            intensity={ 10 }
                                            form="ring"
                                        />
                                    </Environment>

                                    `}</li>
                                </ul>                                
                            </li>
                            <li>
                                <span className='text-yellow-400'>Ground</span>
                                <ol className='text-white p-4'>
                                    <li>When using environment map as a backgorund, we have the feeling that objects are floating because the image is infinitely far</li>
                                    <li>Remove the "background" attribute of {`<Environment />`}
                                        <ol className="text-white p-4">
                                            <li className="text-green-400">{`<Environment preset="sunset" ground={ { height: 7, radius: 28, scale: 100 } } />`}</li>
                                        </ol>
                                    </li>
                                </ol>
                            </li>
                            <li>
                                <span className='text-yellow-400'>Stage</span>
                                <ol className='text-white p-4'>
                                    <li>Stage Helper: Creates an Environment with minimal setting </li>
                                    <li>Import "Stage" from drei</li>
                                </ol>
                            </li>
                        </ol>

                    </div>
                    <div className="flex flex-col items-start justify-start space-y-1 w-full border-0">
                        <button className="btn btn-primary w-full" onClick={ showControlsHandler }>Toggle Controls</button> 
                    </div>
                    
                </div>
            </div>

            <div id="canvas" style={{ width:"100%" }} className="flex w-full h-full max-h-full border-0 border-yellow-700">
                
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
                            fov: 45,
                            near: 1,
                            far: 200,
                            position: [0, .5, 9]
                        }
                    }
                    className="border-0"
                    // showControls={ showControls }

                    // onCreated={ onCreatedHandler } 
                >
                    {/* {
                        perfVisible && <Perf position="bottom-right" />
                    } */}

                    <Environment 
                        background={ true }
                        preset="sunset"
                        ground={
                            {
                                height: envMapHeight,
                                radius: envMapRadius,
                                scale: envMapScale
                            }
                        }
                        resolution={32}
                        files='/environmentMaps/the_sky_is_on_fire_2k.hdr'                        
                    >
                        <color args={['#000000']} attach="background" />
                        <Plane position={ [0, 0, -3]} scale={ 3 }>
                            <meshBasicMaterial color={  [10, 0, 0] } />
                        </Plane> 
                        <Lightformer 
                            position-z={ -5 } 
                            scale={ 10} 
                            color="red"
                            intensity={ 10 }
                            form="ring"
                        />
                    </Environment>

                    
                    
                    {/* <SoftShadows size={25} samples={17} focus={9.5} /> */}
                    {/* <BakeShadows /> */}

                    {/* <AccumulativeShadows 
                        scale={ 10 } 
                        position={[0, -1.09, 0]} 
                        color="#316d39" 
                        opacity={ 0.8 } 
                        frames={ 10 }
                        temporal
                    >
                        <RandomizedLight 
                            position={[1, 2, 3]} 
                            amount={8}
                            radius={1}
                            intensity={1}
                            ambient={.5}                        
                            bias={ .001 }
                        />
                    </AccumulativeShadows> */}

                    {/* <Sky 
                        sunPosition={ skyControls.sunPosition }
                    /> */}

                    {/* <ContactShadows 
                        position={[0, -1.09, 0]} 
                        scale={ 10 }  
                        resolution={ 512 }
                        far={ 2 }
                        opacity={ csOpacity }
                        blur={ csBlur }
                        color={ `#${csColor.substring(1)}` }
                        frames={ 1 } // means render the shadow in first frame only
                    /> */}

                    <color args={ ['#4db9ce'] } attach="background" />

                    {/* <PerspectiveCamera 
                        position={ [0, -1.1, 0] }
                        args={[45, wh.width / wh.height, .5, 1000]}
                    > */}

                        {/* <ambientLight intensity={0.5} />
                        <DirectionalLight 
                            position={ skyControls.sunPosition } 
                            intensity={ 1.5 } 
                            scale={1} 
                        /> */}
                         {/* <Sphere 
                            position={[ position.x, position.y, position.z]} 
                            scale={ 2 }
                            args={[.3]}
                            visible={ visible }
                            castShadow
                        >
                            <meshStandardMaterial color={ color }  
                                // envMapIntensity={ envMapIntensity }
                            />
                        </Sphere>

                        <BoxDrei
                            position={[boxControls.position.x, boxControls.position.y, 0]} 
                            scale={ boxControls.scale } 
                            visible={ boxControls.visible}
                            showTransformControls={false}
                            castShadow
                        >
                            <meshStandardMaterial color={ boxControls.color } 
                                // envMapIntensity={ envMapIntensity } 
                            />
                        </BoxDrei> */}
                        <Sphere 
                            position={[ -1.2, .68, 0] } 
                            scale={ 2 }
                            args={[.3]}
                            visible={ true }
                            // castShadow
                        >
                            <meshStandardMaterial color={ `#ff0000` }  
                                // envMapIntensity={ envMapIntensity }
                            />
                        </Sphere>

                        <BoxDrei
                            position={[1.2, .68, 0]} 
                            scale={ 2 } 
                            visible={ true }
                            showTransformControls={false}
                            // castShadow
                        >
                            <meshStandardMaterial color={ `#f662f9` } 
                                // envMapIntensity={ envMapIntensity } 
                            />
                        </BoxDrei>

                        {/* <PlaneComponent 
                            scale={ 5 }
                            position={[0, 0, 0]}
                            rotation={[-Math.PI * .5, 0, 0]}
                            // receiveShadow
                        >
                            <meshStandardMaterial color={'yellow'} side={ THREE.DoubleSide } envMapIntensity={ envMapIntensity }/>
                        </PlaneComponent>  */}
                        
                    {/* </PerspectiveCamera> */}
                    <OrbitControls makeDefault />
                </CanvasComponent>
            </div>
            
            
            
        </div>
    )
}

export default SceneR3fEnvAndStaging
