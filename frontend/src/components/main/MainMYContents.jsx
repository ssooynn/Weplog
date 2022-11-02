import React, { Suspense, useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import {OrbitControls, useGLTF, Environment} from '@react-three/drei';
import { VolcanoModel } from "./VolcanoModel";
import { PersonModel } from "./PersonModel";
import { SnowIsland } from "./Snow_island";

function Island() {
  const mesh = useRef(null);
  useFrame(() => (mesh.current.rotation.y = mesh.current.rotation.y += 0.0005));
  return (
    <mesh ref={mesh} scale={0.5}>
      <SnowIsland />
      <PersonModel />
      <meshLambertMaterial attach="material" />
    </mesh>
  );
}

export function MainMYContents() {
  // const gltf = useLoader(GLTFLoader, "")
  
  return (
    <Canvas
    camera={{position: [30, 15, 30]}}
    >
        <Suspense fallback={null}>
          <Island />
          <OrbitControls />
          <directionalLight color={"white"} position={[2, 10, 2]} />
          <directionalLight color={"white"} position={[-2, 10, -2]} />
          <directionalLight color={"white"} position={[2, -10, 2]} />
          {/* <directionalLight color={"white"} position={[-2, -10, -2]} /> */}
        </Suspense>
      </Canvas>
    // <Suspense fallback={null}>
    //   Hi
    // </Suspense>
    // <>
    //   <Canvas>
    //     <ambientLight />
    //     <OrbitControls />
    //     <Suspense fallback={null} >
    //       <Island />
    //     </Suspense>
    //   </Canvas>
    // </>
  );
}