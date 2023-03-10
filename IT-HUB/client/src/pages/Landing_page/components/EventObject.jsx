import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage } from "@react-three/drei";
import Html from "../objects3d/Html";

const EventObject = () => {
  return (
    <>
      <Canvas>
        <OrbitControls enableZoom={false} autoRotate={true} enablePan={false} />
        <Stage environment="night" intensity={0.6}>
          <Html />
        </Stage>
      </Canvas>
    </>
  );
};

export default EventObject;
