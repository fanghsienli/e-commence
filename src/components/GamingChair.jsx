import { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function GamingChair(props) {
  const { nodes, materials } = useGLTF("models/gamingChairGrey.glb");
  const group = useRef();

  return (
    <group {...props} ref={group} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_5.geometry}
        material={materials.phongE2}
      />
    </group>
  );
}

useGLTF.preload("models/gamingChairGrey.glb");
