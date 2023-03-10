import { Canvas } from "@react-three/fiber";
import { Stage } from "@react-three/drei";
import { OrbitControls } from "@react-three/drei";
import StackOverflow from "../objects3d/Chat";

const ChatObject = () => {
  return (
    <>
      <Canvas>
        <OrbitControls enableZoom={false} autoRotate={true} enablePan={false} />
        <Stage environment="night">
          <StackOverflow />
        </Stage>
      </Canvas>
    </>
  );
};

export default ChatObject;
