import React, { useRef, useState, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export function Plomon(props) {
  const [modelGLB, setModelGLB] = useState(`/${props.name}.glb`);
  const { nodes, materials, animations } = useGLTF(modelGLB);
  const { ref, actions, names } = useAnimations(animations);
  const [zSpeed, setZSpeed] = useState(props.speed);
  const mesh = useRef(null);

  useFrame(() => {mesh.current.position.z += zSpeed;
    if(mesh.current.position.z > 1000) {mesh.current.position.z = -500
    }});
  useFrame(() => (mesh.current.rotation.y = mesh.current.rotation.y += props.rSpeed));
  useEffect(() => {
    // Reset and fade in animation after an index has been changed
    actions[names[Number(props.animationIndex)]].reset().fadeIn(0.5).play() // 0:뒤뚱뒤뚱 2:하이 3:흐느적흐느적 9:점프 13:꼬물꼬물
    // In the clean-up phase, fade it out
    return () => actions[names[Number(props.animationIndex)]]
  }, [])
  return (
    <group ref={ref} {...props} dispose={null}>
      <group ref={mesh}>
        <group name="Dino">
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
}