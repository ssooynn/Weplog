import React, {
useRef,
useState,
useEffect,
forwardRef,
useImperativeHandle,
} from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export const Plomon3DDetail2 = forwardRef((props, reff) => {
const [modelGLB, setModelGLB] = useState(`/${props.name}2.glb`);
const { nodes, materials, animations } = useGLTF(modelGLB);
const { ref, actions, names } = useAnimations(animations);
const [animationIdx, setAnimationIdx] = useState(4);
const mesh = useRef(null);
const [animationIndex, setAnimationIndex] = useState([5, 0, 14, 11, 15, 4]);
// console.log("^^", props);
//   useFrame(() => (mesh.current.rotation.y = mesh.current.rotation.y += 0.02));
useImperativeHandle(reff, () => ({
    // 부모에서 사용하고 싶었던 함수
    handleAnimation,
}));
const handleAnimation = (idx) => {
    actions[names[Number(animationIdx)]].stop();
    setAnimationIdx(animationIndex[idx]);
    // actions[names[Number(animationIndex)]].reset().stop();
};
useEffect(() => {
    // Reset and fade in animation after an index has been changed
    // setAnimationIdx(props.animationIndex);
    // handleAnimation(animationIdx);
    actions[names[Number(animationIdx)]].play();
    // actions[names[Number(props.animationIndex)]].reset().fadeIn(0.5).play(); // 0:뒤뚱뒤뚱 2:하이 3:흐느적흐느적 9:점프 13:꼬물꼬물
    // In the clean-up phase, fade it out
});
return (
    <group ref={ref} {...props} dispose={null}>
    <group ref={mesh}>
        <group name="DragonSD_321">
        <group name="BackA2">
            <skinnedMesh
            name="mesh_0"
            geometry={nodes.mesh_0.geometry}
            material={nodes.mesh_0.material}
            skeleton={nodes.mesh_0.skeleton}
            />
        </group>
        <group name="Dragon_body3">
            <skinnedMesh
            name="mesh_1"
            geometry={nodes.mesh_1.geometry}
            material={nodes.mesh_1.material}
            skeleton={nodes.mesh_1.skeleton}
            />
        </group>
        <group name="Face4">
            <skinnedMesh
            name="mesh_2"
            geometry={nodes.mesh_2.geometry}
            material={nodes.mesh_2.material}
            skeleton={nodes.mesh_2.skeleton}
            />
        </group>
        <group name="HornC5">
            <skinnedMesh
            name="mesh_3"
            geometry={nodes.mesh_3.geometry}
            material={nodes.mesh_3.material}
            skeleton={nodes.mesh_3.skeleton}
            />
        </group>
        <group name="Root6">
            <primitive object={nodes.Center7} />
        </group>
        <group name="Teech41">
            <skinnedMesh
            name="mesh_4"
            geometry={nodes.mesh_4.geometry}
            material={nodes.mesh_4.material}
            skeleton={nodes.mesh_4.skeleton}
            />
        </group>
        <group name="Wing_A42">
            <skinnedMesh
            name="mesh_5"
            geometry={nodes.mesh_5.geometry}
            material={nodes.mesh_5.material}
            skeleton={nodes.mesh_5.skeleton}
            />
        </group>
        </group>
    </group>
    </group>
);
});
