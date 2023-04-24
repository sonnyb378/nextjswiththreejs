import ButtonNav from "@/components/ui/buttonnav/ButtonNav";
import ArrowRight from "@/components/icons/ArrowRight";

export default function Shaders() {
  const icon = <ArrowRight className={`stroke-white group-hover:stroke-yellow-500 w-[20px] h-[20px]`} />
  return (
    <section className="flex flex-col flex-1 flex-grow items-start justify-start w-full p-4 border-0 border-r-orange-500">
        <h1>ThreeJS Journey: <span className="text-orange-500">Shaders</span></h1>
        <div className="mt-4">
          <nav>
            <ul className="flex space-x-2">
              <li>
                <ButtonNav link="/r3f/shaders/animated-galaxy" title="Animated Galaxy" />
              </li>              
            </ul>
          </nav>
        </div>
    </section>
  )
}
