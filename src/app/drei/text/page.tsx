"use client"

import SceneDreiText from "@/components/scenes/SceneDreiText";
import Link from "next/link";


export default function TextPage() {
    return (
        <section id="parent-container" className="flex flex-col flex-1 flex-grow items-start justify-start w-full p-4 border-0 border-orange-500" style={{ height: "100%" }}>
            <h1>
                ThreeJS Journey: Drei
                <div className="text-sm breadcrumbs">
                    <ul>
                        <li><Link href="/">Home</Link></li> 
                        <li><Link href="/drei">Drei</Link></li> 
                        <li>Text</li>
                    </ul>
                </div>
            </h1>
            <SceneDreiText />
      </section>
    )
  }
  