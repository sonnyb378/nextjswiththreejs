
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

const Iphone13Draco = () => {
    const model = useLoader(GLTFLoader, '/models/iphone13-draco.glb', (loader) => {
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.6/");
        loader.setDRACOLoader(dracoLoader);
    })
    return(
        <primitive object={ model.scene } scale={ .35 } />
    )
}

export default Iphone13Draco;