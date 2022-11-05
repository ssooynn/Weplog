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
  return (
    <Canvas
    camera={{position: [-40, 15, 0]}}
    >
        <Suspense fallback={null}>
          <Island />
          <OrbitControls />
          <directionalLight color={"white"} position={[10, 20, 10]} />
          <directionalLight color={"white"} position={[-10, 50, -10]} />
          <directionalLight color={"white"} position={[0, -20, 0]} />
        </Suspense>
      </Canvas>
  );
}