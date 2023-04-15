import SceneR3F from "@/components/scenes/SceneR3F"


export default function R3FExperience() {
  const textColor = "text-white"
  const hoverTextColor = "text-yellow-500"
  const strokeColor = "stroke-white"
  const hoverStrokeColor = "stroke-yellow-500"
  return (
    <section className="flex flex-col flex-1 flex-grow items-start justify-start w-full p-4 border-0 border-r-orange-500">
        <h1>ThreeJS Journey: React-Three-Fiber (R3F)</h1>
       
       <SceneR3F />
        
    </section>
  )
}
