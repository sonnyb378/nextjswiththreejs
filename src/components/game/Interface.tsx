import { useKeyboardControls } from "@react-three/drei";
import { Controls } from "../scenes/SceneR3FGame";

import { useGameStore } from "./stores/useGame";
import { useEffect, useRef } from "react"
import { addEffect } from "@react-three/fiber";

const Interface = () => {

    const elapsedTimeRef = useRef<HTMLDivElement | null>(null);

    const phase = useGameStore((state) => state.phase)
    const restart = useGameStore((state) => state.restartPhase)

    const forwardPressed = useKeyboardControls<Controls>((state) => state.forward );
    const rightPressed = useKeyboardControls<Controls>((state) => state.right );
    const backPressed = useKeyboardControls<Controls>((state) => state.back );
    const leftPressed = useKeyboardControls<Controls>((state) => state.left );
    const spacePressed = useKeyboardControls<Controls>((state) => state.jump );

    const onRestartHandler = () => {
        restart()
    }

    useEffect(() => {
        const unsubscribeEffect = addEffect(() => {
            const state = useGameStore.getState()
            let elapsedTime = 0;

            if (state.phase === 'playing') {
                elapsedTime = Date.now() - state.startTime;
            } else if (state.phase === 'ended') {
                elapsedTime = state.endTime - state.startTime;
            }

            elapsedTime /= 1000
            elapsedTime = +elapsedTime.toFixed(2)

            if (elapsedTimeRef.current) {
                elapsedTimeRef.current.textContent = `${elapsedTime}`;
            }

        })

        return () => {
            unsubscribeEffect()
        }
    }, [])

    return (
        <div style={{ width:"100%", height:"100%" }} className="flex flex-col items-center justify-start w-full font-Bebas text-[50px] top-0 left-0 m-0 p-0 fixed  pointer-events-none z-[1002]">
            <div ref={ elapsedTimeRef } className="flex items-center justify-center absolute text-[30px] text-white bg-black bg-opacity-50 p-2 w-full mt-[15%]">
                0.00
            </div>

            {
                phase === "ended" &&

                <div  
                    onClick={ onRestartHandler } 
                        className={`flex items-center justify-center tex-white bg-black bg-opacity-50 p-2 w-full mt-[30%] cursor-pointer pointer-events-auto hover:text-yellow-400`}
                >
                    Restart
                </div>

            }
            
            
            <div className="flex flex-col items-center justify-center p-2 space-y-2 border-0 text-[40px] bottom-[20%] absolute">
                <div className={`flex items-center justify-center border-2 rounded-sm w-[50px] h-[50px] ${ forwardPressed ? 'bg-orange-500 bg-opacity-90' : 'bg-white bg-opacity-20' }`}></div>
                <div className="flex items-center justify-center border-0 space-x-2">
                    <div className={`flex items-center justify-center border-2 rounded-sm w-[50px] h-[50px] ${ leftPressed ? 'bg-orange-500 bg-opacity-90' : 'bg-white bg-opacity-20' }`}></div>
                    <div className={`flex items-center justify-center border-2 rounded-sm w-[50px] h-[50px] ${ backPressed ? 'bg-orange-500 bg-opacity-90' : 'bg-white bg-opacity-20' }`}></div>
                    <div className={`flex items-center justify-center border-2 rounded-sm w-[50px] h-[50px] ${ rightPressed ? 'bg-orange-500 bg-opacity-90' : 'bg-white bg-opacity-20' }`}></div>
                </div>
                <div className={`flex items-center justify-center w-full border-2 rounded-sm h-[50px] ${ spacePressed ? 'bg-orange-500 bg-opacity-90' : 'bg-white bg-opacity-20' }`}></div>
            </div>

        </div>
    )
}

export default Interface;