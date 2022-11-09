import React, { Suspense, useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import {OrbitControls, useGLTF, Environment} from '@react-three/drei';
import { VolcanoModel } from "./VolcanoModel";
import { PersonModel } from "./PersonModel";
import { SnowIsland } from "./Snow_island";
import { DinoModel1 } from "./DinoModel1";
import { DinoModel2 } from "./DinoModel2";
import { DinoModel3 } from "./DinoModel3";
import { DinoModel4 } from "./DinoModel4";

function Island() {
  const mesh = useRef(null);
  useFrame(() => (mesh.current.rotation.y = mesh.current.rotation.y += 0.0005));
  return (
    <mesh ref={mesh} scale={0.5}>
      <SnowIsland />
        <DinoModel1 scale={0.05} position={[0, 23, 11]}/>
        <DinoModel2 scale={0.05} position={[-8, 15.2, 26]}/>
        <DinoModel3 scale={0.05} position={[-15, 15.2, -14]} rotation={[0, -90, 0]}/>
        <DinoModel4 scale={0.05} position={[-22, 14, 6]} rotation={[0, 80, 0]}/>
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