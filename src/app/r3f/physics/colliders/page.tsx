"use client"

import SceneR3FPhysics from "@/components/scenes/SceneR3FPhysics";
import ButtonNav from "@/components/ui/buttonnav/ButtonNav";
import Link from "next/link";

export default function CollidersPage() {
    return (
        <section id="parent-container" className="flex flex-col flex-1 flex-grow items-start justify-start w-full p-4 border-0 border-orange-500" style={{ height: "100%" }}>
            <h1>
                ThreeJS Journey
                <div className="text-sm breadcrumbs">
                    <ul>
                        <li><Link href="/">Home</Link></li> 
                        <li><Link href="/r3f">R3F</Link></li> 
                        <li><Link href="/r3f/physics">Physics</Link></li>
                        <li className='text-orange-500'>Colliders</li>
                    </ul>
                </div>
            </h1>
            <nav className="w-full">
                <ul className="flex flex-wrap gap-2">
                    <li>
                        <ButtonNav link="/r3f/physics/colliders/cuboid" title="CuboidCollider" />
                    </li>
                    <li>
                        <ButtonNav link="/r3f/physics/colliders/ball" title="BallCollider" />
                    </li>
                    <li>
                        <ButtonNav link="/r3f/physics/colliders/roundcuboid" title="RoundCuboidCollider" />
                    </li>
                    <li>
                        <ButtonNav link="/r3f/physics/colliders/hull" title="HullCollider" />
                    </li>
                    <li>
                        <ButtonNav link="/r3f/physics/colliders/trimesh" title="TrimeshCollider" />
                    </li>
                    <li>
                        <ButtonNav link="/r3f/physics/colliders/capsule" title="CapsuleCollider" />
                    </li>
                    <li>
                        <ButtonNav link="/r3f/physics/colliders/cylinder" title="CylinderCollider" />
                    </li>
                    <li>
                        <ButtonNav link="/r3f/physics/colliders/cone" title="ConeCollider" />
                    </li>
                    <li>
                        <ButtonNav link="/r3f/physics/colliders/convexhull" title="ConvexHullCollider" />
                    </li>
                    <li>
                        <ButtonNav link="/r3f/physics/colliders/heightfield" title="HeightfieldCollider" />
                    </li>
                
                </ul>
          </nav>
      </section>
    )
  }
  