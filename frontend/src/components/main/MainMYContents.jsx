import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {OrbitControls} from '@react-three/drei';
import { SnowIsland } from "./Snow_island";
import { Plomon } from "./Plomon";
import { getAllMyPet } from '../../apis/memberPetApi'


function Island(props) {
  const mesh = useRef(null);
  const [allMyPet, setAllMyPet] = useState([]);
  const [plomonStates, setPlomonStates] = useState([[[0, 23, 11], 0, 9], [[-8, 15.2, 26], 0, 0], [[-20, 14, 13], 0, 3], [[-21, 15.2, -7], 0, 2], [[-7, 15, -21], 0, 10], [[22, 38, 0], 0.5, 13]]); //[position, direction, speed, animationIndex]
  // useFrame(() => (mesh.current.rotation.y = mesh.current.rotation.y += 0.0005));
  useEffect(()=>{
    getAllMyPet(
      (res) => {
        console.log(res.data);
        setAllMyPet(res.data);
      },
      (err) => {
        console.log(err);
      }
    );
  },[])
  return (
    <mesh ref={mesh} scale={0.5} position={[0, -5, 0]}>
      <SnowIsland />
        {allMyPet!==undefined && allMyPet.length>0 && allMyPet.map((pet, idx)=>
        <Plomon key={idx} name={pet.name} position={plomonStates[idx][0]} speed={plomonStates[idx][1]} animationIndex={plomonStates[idx][2]} scale={0.08} onClick={() => (props.setPlomonOpen(true), props.setIsPlomonClicked(true))}/>
        )}
        {/* <Plomon name="피스" position={plomonStates[4][0]} speed={plomonStates[4][1]} animationIndex={plomonStates[4][2]} scale={0.08} onClick={() => (props.setPlomonOpen(true), props.setIsPlomonClicked(true))}/>
        <Plomon name="재권" position={plomonStates[1][0]} speed={plomonStates[1][1]} animationIndex={plomonStates[1][2]} scale={0.08} onClick={() => (props.setPlomonOpen(true), props.setIsPlomonClicked(true))}/> */}
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
