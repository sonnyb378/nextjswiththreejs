import { Html, useProgress } from "@react-three/drei";
import { CSSProperties } from "react";

type CustomCSSProperties = CSSProperties & {
    [key: string]: string | number;
  };

const Loading = () => {
    

    const { active, progress, errors, item, loaded, total } = useProgress()
    
    const percentage = progress.toFixed(0)

    const styles: CustomCSSProperties = {
        '--value': percentage,
    };

    return (
        <Html center>
            <div className="radial-progress" style={ styles }>{percentage}%</div>
        </Html>
    )
}

export default Loading;