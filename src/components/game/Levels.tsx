import { Physics } from "@react-three/rapier";
import BlockStart from "./BlockStart";
import BlockSpinner from "./BlockSpinner";
import * as THREE from "three"
import BlockLimbo from "./BlockLimbo";
import BlockAxe from "./BlockAxe";
import BlockEnd from "./BlockEnd";

import { BlockSpinnerProp } from "./BlockSpinner";
import { BlockLimboProps } from "./BlockLimbo";
import { BlockAxeProps } from "./BlockAxe";
import { useMemo } from "react";
import React from "react";
import Bounds from "./Bounds";


type LevelsProps = {
    count?: number,
    types?: React.ComponentType<BlockSpinnerProp | BlockLimboProps | BlockAxeProps>[];
    seed?: number
}

export default function Levels({ count = 5, types = [BlockSpinner, BlockLimbo, BlockAxe], seed = 0 } : LevelsProps ) {

    const blocks = useMemo(() => {
        
        const blocks = [];

        for (let i = 0; i < count; i++) {
            const type = types[Math.floor(Math.random() * types.length)]
            blocks.push(type)
        }

        return blocks;

    }, [count, types, seed])

    const floor1Material = new THREE.MeshStandardMaterial({color:"#111111", metalness: 0, roughness: 0})
    const floor2Material = new THREE.MeshStandardMaterial({color:"#222222", metalness: 0, roughness: 0})
    const obstacleMaterial = new THREE.MeshStandardMaterial({color:"#ff0000", metalness: 0, roughness: 1})
    const wallMaterial = new THREE.MeshStandardMaterial({color:"#887777", metalness: 0, roughness: 0})

    return(
        <>
           <BlockStart 
                position={ [0, 0, 0] } 
                mesh={ new THREE.BoxGeometry(1, 1, 1) } 
                meshMaterial={ floor1Material }
                meshScale={ new THREE.Vector3(4, .2, 4) } 
            />

            {
                blocks.map((Block, i) => {
                    return(
                        <Block 
                            key={ i }
                            position={[0, 0, - (i + 1) * 4]}
                            floor={ new THREE.BoxGeometry(1, 1, 1) } 
                            floorMaterial={ floor2Material }
                            floorScale={ new THREE.Vector3(4, .2, 4) } 
                            obstacle={ new THREE.BoxGeometry(1, 1, 1) }
                            obstacleMaterial={ obstacleMaterial  }
                            rbPosition={ new THREE.Vector3(0, .3, 0) }
                        />
                    )
                })
            }

            <BlockEnd 
                position={ [0, .1, -(count + 1) * 4] } 
                mesh={ new THREE.BoxGeometry(1, 1, 1) } 
                meshMaterial={ floor1Material }
                meshScale={ new THREE.Vector3(4, .2, 4) } 
            />
            
            <Bounds 
                mesh={ new THREE.BoxGeometry() } 
                meshMaterial={ wallMaterial }
                length={ count + 2 } 
            />
        </>
    )
}
