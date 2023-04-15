"use client"

import SceneR3fEnvAndStaging from "@/components/scenes/SceneR3FEnvironmentAndStaging";
import Link from "next/link";


export default function EnvironmentAndStagingPage() {
    return (
        <section id="parent-container" className="flex flex-col flex-1 flex-grow items-start justify-start w-full p-4 border-0 border-orange-500" style={{ height: "100%" }}>
            <h1>
                ThreeJS Journey
                <div className="text-sm breadcrumbs">
                    <ul>
                        <li><Link href="/">Home</Link></li>
                        <li className='text-orange-500'>Environment and Staging</li>
                    </ul>
                </div>
            </h1>
            <SceneR3fEnvAndStaging />
      </section>
    )
  }
  