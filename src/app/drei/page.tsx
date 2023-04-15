import ButtonNav from "@/components/ui/buttonnav/ButtonNav";
import ArrowRight from "@/components/icons/ArrowRight";

export default function DREI() {
  const icon = <ArrowRight className={`stroke-white group-hover:stroke-yellow-500 w-[20px] h-[20px]`} />
  return (
    <section className="flex flex-col flex-1 flex-grow items-start justify-start w-full p-4 border-0 border-r-orange-500">
        <h1>ThreeJS Journey: Drei</h1>
        <div className="mt-4">
          <nav>
            <ul className="flex space-x-2">
              <li>
                <ButtonNav link="/drei/overview" title="Drei Overview" />
              </li>
              <li>
                <ButtonNav link="/drei/transform-controls" title="Transform Controls" />
              </li>
              <li>
                <ButtonNav link="/drei/pivot-controls" title="Pivot Controls" />
              </li>
              <li>
                <ButtonNav link="/drei/html" title="HTML" />
              </li>
              <li>
                <ButtonNav link="/drei/text" title="Text" />
              </li>
              <li>
                <ButtonNav link="/drei/float" title="Float" />
              </li>
              <li>
                <ButtonNav link="/drei/mesh-reflector-material" title="MeshReflectorMaterial" />
              </li>
            </ul>
          </nav>
        </div>
    </section>
  )
}
