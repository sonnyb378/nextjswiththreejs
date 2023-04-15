import CanvasComponent from "@/components/canvas/CanvasComponent"
import BoxComponent from "@/components/box/BoxComponent"

export default function BoxPage() {
  return (
    <section className="flex flex-col flex-1 flex-grow items-start justify-start w-full p-4 border-0 border-r-orange-500">
        <h1>Box Page</h1>
        <CanvasComponent>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <pointLight position={[-10, -10, -10]} />
            <BoxComponent position={[0, 0, 0]} />
        </CanvasComponent>
    </section>
  )
}
