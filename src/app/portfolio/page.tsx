
import SceneR3FPortfolio from "@/components/scenes/SceneR3FPortfolio"
import Link from "next/link"


export default function PortfolioPage() {
  const textColor = "text-white"
  const hoverTextColor = "text-yellow-500"
  const strokeColor = "stroke-white"
  const hoverStrokeColor = "stroke-yellow-500"
  return (
    <section id="parent-container" className="flex flex-col flex-1 flex-grow items-start justify-start w-full p-4 border-0 border-orange-500" style={{ height: "100%" }}>
        <h1>ThreeJS Journey: React-Three-Fiber (R3F)
            <div className="text-sm breadcrumbs">
                <ul>
                    <li><Link href="/">Home</Link></li> 
                    <li className='text-orange-500'>Portfolio</li>
                </ul>
            </div>
        </h1>
       <SceneR3FPortfolio />
    </section>
  )
}
