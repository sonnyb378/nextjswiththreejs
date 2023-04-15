"use client"

import SceneDreiHTML from "@/components/scenes/SceneDreiHTML";
import Link from "next/link";


export default function HtmlPage() {
    return (
      <section className="flex flex-col flex-1 flex-grow items-start justify-start w-full p-4 border-0 border-orange-500">
            <h1>
                ThreeJS Journey: Drei
                <div className="text-sm breadcrumbs">
                  <ul>
                      <li><Link href="/">Home</Link></li> 
                      <li><Link href="/drei">Drei</Link></li> 
                      <li className="text-orange-500">HTML</li>
                  </ul>
                </div>
            </h1>
            <SceneDreiHTML />
      </section>
    )
  }
  