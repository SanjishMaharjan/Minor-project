import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage } from "@react-three/drei";

import Python from "../objects3d/Python";

const CourseObject = () => {
  return (
    <>
      <Canvas>
        <OrbitControls enableZoom={false} autoRotate={true} enablePan={false} />
        <Stage environment="night" intensity={0.6}>
          <Python />
        </Stage>
      </Canvas>
    </>
  );
};

export default CourseObject;
