import { create } from "zustand"
import { subscribeWithSelector } from "zustand/middleware" 


interface GameState {
    blocksCount: number;
    blockSeed: number;
    phase: string;
    startTime: number;
    endTime: number;
    startPhase: () => void;
    restartPhase: () => void;
    endPhase: () => void;
  }

export const useGameStore = create<GameState, [["zustand/subscribeWithSelector", never]]>(subscribeWithSelector((set) => {
    return {
        blocksCount: 10,
        blockSeed: 0,
        phase: 'ready',
        startTime: 0,
        endTime: 0,
        startPhase: () => {
            set((state) => {
                return state.phase === 'ready' ? { phase: 'playing', startTime: Date.now() } : {}                
            })
        },
        restartPhase: () => {
            set((state) => {
                if (state.phase === "playing" || state.phase === 'ended') {
                    return { phase: 'ready', blockSeed: Math.random() }
                }
                return {}
            })
        },
        endPhase: () => {
            set((state) => {
                if (state.phase === "playing") {
                    return { phase: 'ended', endTime: Date.now() }
                }
                return {}
            })
        }
    }
}))