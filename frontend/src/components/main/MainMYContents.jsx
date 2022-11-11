import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {OrbitControls} from '@react-three/drei';
import { SnowIsland } from "./Snow_island";
import { DinoModel1 } from "./DinoModel1";
import { DinoModel2 } from "./DinoModel2";
import { DinoModel3 } from "./DinoModel3";
import { DinoModel4 } from "./DinoModel4";
import { DinoModel5 } from "./DinoModel5";

function Island(props) {
  const mesh = useRef(null);
  useFrame(() => (mesh.current.rotation.y = mesh.current.rotation.y += 0.0005));
  return (
    <mesh ref={mesh} scale={0.5} position={[0, -5, 0]}>
      <SnowIsland />
        <DinoModel1 scale={0.08} position={[0, 23, 11]} onClick={() => (props.setPlomonOpen(true), props.setIsPlomonClicked(true))}/>
        <DinoModel2 scale={0.08} position={[-8, 15.2, 26]} onClick={() => (props.setPlomonOpen(true), props.setIsPlomonClicked(true))}/>
        <DinoModel3 scale={0.08} position={[-15, 15.2, -14]} rotation={[0, -90, 0]} onClick={() => (props.setPlomonOpen(true), props.setIsPlomonClicked(true))}/>
        <DinoModel4 scale={0.08} position={[-22, 14, 6]} rotation={[0, 80, 0]} onClick={() => (props.setPlomonOpen(true), props.setIsPlomonClicked(true))}/>
        <DinoModel5 scale={0.08} position={[22, 38, 0]} rotation={[0, 80, 0]} onClick={() => (props.setPlomonOpen(true), props.setIsPlomonClicked(true))}/>
      <meshLambertMaterial attach="material" />
    </mesh>
  );
}

export function MainMYContents(props) {
  return (
    <Canvas
    camera={{position: [-40, 15, 0]}}
    >
      <Suspense fallback={null}>
        <Island setPlomonOpen={props.setPlomonOpen} setIsPlomonClicked={props.setIsPlomonClicked}/>
        <OrbitControls minPolarAngle={0.5} maxPolarAngle={1.5} minDistance={20} maxDistance={50}/>
        <directionalLight color={"white"} position={[0, 10, 10]} />
        <directionalLight color={"white"} position={[-8.6, 10, -5]} />
        <directionalLight color={"white"} position={[8.6, 10, -5]} />
        <directionalLight color={"white"} position={[0, -20, 0]} />
      </Suspense>
    </Canvas>
  );
}
