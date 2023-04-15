import CanvasComponent from "@/components/canvas/CanvasComponent"
import TorusComponent from "@/components/torus/TorusComponent"

export default function TorusPage() {
  return (
    <section className="flex flex-col flex-1 flex-grow items-start justify-start w-full p-4 border-0 border-r-orange-500">
        <h1>Torus Page</h1>
        <CanvasComponent>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <pointLight position={[-10, -10, -10]} />
            <TorusComponent position={[0, 0, 0]} />
        </CanvasComponent>
    </section>
  )
}
