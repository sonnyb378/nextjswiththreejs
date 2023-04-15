import Link from "next/link"


export default function PortfolioPage() {
  const textColor = "text-white"
  const hoverTextColor = "text-yellow-500"
  const strokeColor = "stroke-white"
  const hoverStrokeColor = "stroke-yellow-500"
  return (
    <section className="flex flex-col flex-1 flex-grow items-start justify-start w-full p-4 border-0 border-r-orange-500">
        <h1>ThreeJS Journey: React-Three-Fiber (R3F)
            <div className="text-sm breadcrumbs">
                <ul>
                    <li><Link href="/">Home</Link></li> 
                    <li className='text-orange-500'>Portfolio</li>
                </ul>
            </div>
        </h1>
       
    </section>
  )
}
