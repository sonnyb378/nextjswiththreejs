
import * as PostProcessing from "postprocessing"
import { DrunkProps } from "./Drunk"
import * as THREE from "three"

// webgl 2 syntax
const fragmentShader = /* glsl */`
    uniform float frequency;
    uniform float amplitude;
    uniform float offset;

    void mainUv(inout vec2 uv) {
        uv.y += sin(uv.x * frequency + offset) * amplitude;
    }

    void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) 
    {
        outputColor = vec4(0.8, 1.0, 0.5, inputColor.a);
    }
`

// DrunkEffect
export default class DrunkEffect extends PostProcessing.Effect {

    constructor(props: DrunkProps) {

        const { amplitude, frequency, blendFunction } = props;

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
    }

    update(renderer: THREE.WebGLRenderer, inputBuffer: THREE.WebGLRenderTarget, deltaTime: number): void {
        this.uniforms.get('offset')!.value += deltaTime;
    }
}

