"use client"

import SceneHeightfieldCollider from "@/components/scenes/SceneHeightfieldCollider";
import SceneR3FPhysics from "@/components/scenes/SceneR3FPhysics";
import ButtonNav from "@/components/ui/buttonnav/ButtonNav";
import Link from "next/link";

export default function HeightfieldCollider() {
    return (
        <section id="parent-container" className="flex flex-col flex-1 flex-grow items-start justify-start w-full p-4 border-0 border-orange-500" style={{ height: "100%" }}>
            <h1>
                ThreeJS Journey
                <div className="text-sm breadcrumbs">
                    <ul>
                        <li><Link href="/">Home</Link></li> 
                        <li><Link href="/r3f">R3F</Link></li> 
                        <li><Link href="/r3f/physics">Physics</Link></li>
                        <li><Link href="/r3f/physics/colliders">Colliders</Link></li>
                        <li className='text-orange-500'>HeightfieldCollider</li>
                    </ul>
                </div>
            </h1>
            <SceneHeightfieldCollider />
      </section>
    )
  }
  