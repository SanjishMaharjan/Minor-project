import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage } from "@react-three/drei";
import News from "../objects3d/News";

const NewsObject = () => {
  return (
    <>
      <Canvas>
        <OrbitControls enableZoom={false} autoRotate={true} />
        <Stage environment="night" intensity={0.6}>
          <News />
        </Stage>
      </Canvas>
    </>
  );
};

export default NewsObject;
