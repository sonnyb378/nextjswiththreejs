import DrunkEffect from "./DrunkEffect"
import { forwardRef } from "react";
import * as PostProcessing from "postprocessing";

export type DrunkProps = {
    frequency?: number,
    amplitude?: number,
    blendFunction?: PostProcessing.BlendFunction
}
export default forwardRef(function Drunk(props: DrunkProps, ref ) {
    
    const effect = new DrunkEffect(props);

    return (
       <primitive ref={ref} object={ effect } />
    )
})