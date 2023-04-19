import { ThreeElements, ThreeEvent } from "@react-three/fiber";
import { Text3D, Center, useMatcapTexture } from "@react-three/drei";
import { ReactNode } from "react";
import * as THREE from "three"


type Text3DProps = {
    matID: string,
    children?: ReactNode;
  }

const Text3DComponent = ({ children, matID, ...props }: Text3DProps) => {

    const [matCapTexture] = useMatcapTexture(matID, 256)

    return (
        <Center>
            <Text3D 
                font="/assets/fonts/helvetiker_regular.typeface.json"
                size={ 3 }
                position={ [0, -.7, 0] }
                height={ .5 }
                curveSegments={ 12 }
                bevelEnabled
                bevelThickness={ 0.15 }
                bevelSize={ 0.1 }
                bevelOffset={ 0 }
                bevelSegments={ 3 }
            >
                { children }
                <meshMatcapMaterial matcap={ matCapTexture } />
            </Text3D>
        </Center>
    )
}

export default Text3DComponent;