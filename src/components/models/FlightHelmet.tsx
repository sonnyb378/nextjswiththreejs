
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

const FlightHelmet = () => {
    const model = useLoader(GLTFLoader, '/models/FlightHelmet/glTF/FlightHelmet.gltf', (loader) => {
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.6/");
        loader.setDRACOLoader(dracoLoader);
    })
    return(
        <primitive object={ model.scene } scale={ 10 } position={ [ 0, .10, 0 ]}  />
    )
}

export default FlightHelmet;