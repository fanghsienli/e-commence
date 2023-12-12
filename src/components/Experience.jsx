import { PresentationControls } from "@react-three/drei";
import { Suspense } from "react";
import { GamingChair } from "./GamingChair";
import { Canvas } from "@react-three/fiber";

export const Experience = () => {
  return (
    <>
      <Canvas shadows camera={{ position: [0, 2, 5], fov: 20 }}>
        <PresentationControls
          enabled={true} // the controls can be disabled by setting this to false
          global={false} // Spin globally or by dragging the model
          cursor={true} // Whether to toggle cursor style on drag
          snap={false} // Snap-back to center (can also be a spring config)
          speed={1} // Speed factor
          zoom={1} // Zoom factor when half the polar-max is reached
          rotation={[0, 0, 0]} // Default rotation
          polar={[0, Math.PI / 2]} // Vertical limits
          azimuth={[-Infinity, Infinity]} // Horizontal limits
          config={{ mass: 1, tension: 170, friction: 26 }} // Spring config
        >
          <group position-y={-0.5}>
            <Suspense fallback={null}>
              <GamingChair />
            </Suspense>
          </group>
        </PresentationControls>
        <ambientLight intensity={1} />
        <directionalLight
          position={[-5, 5, 5]}
          castShadow
          shadow-mapSize={1024}
        />
      </Canvas>
    </>
  );
};
