"use client"

import SceneDreiMeshReflectorMaterial from "@/components/scenes/SceneDrei.MeshReflectorMaterial";
import Link from "next/link";


export default function MeshReflectorMaterialPage() {
    return (
        <section id="parent-container" className="flex flex-col flex-1 flex-grow items-start justify-start w-full p-4 border-0 border-orange-500" style={{ height: "100%" }}>
            <h1>
                ThreeJS Journey: Drei
                <div className="text-sm breadcrumbs">
                    <ul>
                        <li><Link href="/">Home</Link></li> 
                        <li><Link href="/drei">Drei</Link></li> 
                        <li>MeshReflectorMaterial</li>
                    </ul>
                </div>
            </h1>
            <SceneDreiMeshReflectorMaterial />
      </section>
    )
  }
  