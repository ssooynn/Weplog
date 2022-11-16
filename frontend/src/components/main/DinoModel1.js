import React, {
  useRef,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export const DinoModel1 = forwardRef((props, reff) => {
  // props.petId = 1
  const [modelGLB, setModelGLB] = useState(`/${props.name}.glb`);
  // if (props.petId === 1) {setModelGLB("/재권.glb")};
  const { nodes, materials, animations } = useGLTF(modelGLB);
  const { ref, actions, names } = useAnimations(animations);
  const [index, setIndex] = useState(9);
  const mesh = useRef(null);
  // useFrame(() => (mesh.current.rotation.y = mesh.current.rotation.y += 0.02));
  useImperativeHandle(reff, () => ({
    // 부모에서 사용하고 싶었던 함수
    handleAnimation,
  }));
  const handleAnimation = (index3) => {
    setIndex(index3);
    actions[names[index3]].reset().fadeIn(0.5).play();
  };

  useEffect(() => {
    // Reset and fade in animation after an index has been changed
    handleAnimation(index);
    // In the clean-up phase, fade it out
    return () => actions[names[index]];
  }, []);
  return (
    <group ref={ref} {...props} dispose={null}>
      <group ref={mesh}>
        <group name="Dino011">
          <group name="Mesh2">
            <group name="Body_A3">
              <skinnedMesh
                name="mesh_0"
                geometry={nodes.mesh_0.geometry}
                material={nodes.mesh_0.material}
                skeleton={nodes.mesh_0.skeleton}
              />
            </group>
            <group name="Face_A4">
              <skinnedMesh
                name="mesh_1"
                geometry={nodes.mesh_1.geometry}
                material={nodes.mesh_1.material}
                skeleton={nodes.mesh_1.skeleton}
              />
            </group>
            <group name="Head_A5">
              <skinnedMesh
                name="mesh_2"
                geometry={nodes.mesh_2.geometry}
                material={nodes.mesh_2.material}
                skeleton={nodes.mesh_2.skeleton}
              />
            </group>
            <group name="Horn_A_part16">
              <skinnedMesh
                name="mesh_3"
                geometry={nodes.mesh_3.geometry}
                material={nodes.mesh_3.material}
                skeleton={nodes.mesh_3.skeleton}
              />
            </group>
            <group name="Horn_A_part27">
              <skinnedMesh
                name="mesh_4"
                geometry={nodes.mesh_4.geometry}
                material={nodes.mesh_4.material}
                skeleton={nodes.mesh_4.skeleton}
              />
            </group>
            <group name="Tail_A8">
              <skinnedMesh
                name="mesh_5"
                geometry={nodes.mesh_5.geometry}
                material={nodes.mesh_5.material}
                skeleton={nodes.mesh_5.skeleton}
              />
            </group>
            <group name="Teeth_A9">
              <skinnedMesh
                name="mesh_6"
                geometry={nodes.mesh_6.geometry}
                material={nodes.mesh_6.material}
                skeleton={nodes.mesh_6.skeleton}
              />
            </group>
          </group>
          <group name="Root10">
            <primitive object={nodes.Dino_Center11} />
          </group>
        </group>
      </group>
    </group>
  );
});
