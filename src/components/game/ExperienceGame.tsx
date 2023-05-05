
import * as THREE from "three"
import { useEffect, useMemo, useRef, useState } from "react";
import { CuboidCollider, CylinderCollider, Debug, InstancedRigidBodies, Physics, RigidBody, RigidBodyApi, Vector3Array } from "@react-three/rapier";
import { useControls } from "leva";
import { Perf } from "r3f-perf";
import DirectionalLight from "@/components/lights/DirectionalLight";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import Levels from "@/components/game/Levels";
import BlockStart from "./BlockStart";
import BlockSpinner from "./BlockSpinner";
import BlockLimbo from "./BlockLimbo";
import BlockAxe from "./BlockAxe";
import Player from "./Player";
import Lights from "./Lights";
import Effects from "./Effects";

import { useGameStore } from "./stores/useGame";

type ExperienceGameProps = {
    showControls: boolean
}
const ExperienceGame = ({ showControls = false, ...props}: ExperienceGameProps) => {

    const blocksCount = useGameStore((state) => state.blocksCount)
    const blocksSeed = useGameStore((state) => state.blockSeed)

    const { perfVisible } = useControls('r3F perf', {
        perfVisible: false
    })

    const user = useControls("Player", {
        color: "#e19614"
    })

    return (
        <>
        
            {
                perfVisible && <Perf position="bottom-right" />
            }

            <color args={["#190f03"]} attach="background" />
            
            
            <Physics>
                {/* <Debug /> */}
                <Lights />

                <Levels count={ blocksCount } types={ [BlockSpinner, BlockLimbo, BlockAxe] } seed={ blocksSeed } />

                <Player />
                
                <Effects />

            </Physics>
            
            
        </>
    )
}

export default ExperienceGame;