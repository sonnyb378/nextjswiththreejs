"use client"

import SceneR3FPortalScene from "@/components/scenes/SceneR3FPortalScene";
import Link from "next/link";


export default function PortalScenePage() {
    return (
        <section id="parent-container" className="flex flex-col flex-1 flex-grow items-start justify-start w-full p-4 border-0 border-orange-500" style={{ height: "100%" }}>
            <h1>
                ThreeJS Journey
                <div className="text-sm breadcrumbs">
                    <ul>
                        <li><Link href="/">Home</Link></li> 
                        <li><Link href="/r3f">R3F</Link></li> 
                        <li className='text-orange-500'>Portal Scene</li>
                    </ul>
                </div>
            </h1>
            <SceneR3FPortalScene />
      </section>
    )
  }
  