import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from '@react-three/drei';
import { SnowIsland } from "./Snow_island";
import { Plomon } from "./Plomon";
import { getAllMyPet } from "../../apis/memberPetApi";

function getRandomIndexList(num) {
  if (num) {
    let indexs = [];
    for (let i = 0; i < num; i++) {
      indexs.push(i);
    }
    const randomIndexList = [];
    while (indexs.length > 0) {
      let movenum = indexs.splice(
        Math.floor(Math.random() * indexs.length),
        1
      )[0];
      randomIndexList.push(movenum);
    }
    return randomIndexList;
  } else {
    return "";
  }
}

function Island(props) {
  const mesh = useRef(null);
  const [allMyPet, setAllMyPet] = useState([]);
  const plomons = useRef([]);
  const [plomonStates, setPlomonStates] = useState([
    [[0, 23, 11], [0, -90, 0], 0, 0.02, 9],
    [[-8, 15.2, 26], [0, -0.4, 0], 0, 0, 0],
    [[-20, 14, 13], [0, -1, 0], 0, 0, 3],
    [[-21, 15.2, -7], [0, -2, 0], 0, 0, 2],
    [[-7, 15, -21], [0, -2.6, 0], 0, 0, 17],
    [[22, 38, 0], [0, 0, 0], 0.5, 0, 13],
  ]); //[position, rotation, speed, rSpeed, animationIndex]
  const [randomIndexList, setRandomIndexList] = useState([]);
  useFrame(() => (mesh.current.rotation.y = mesh.current.rotation.y += 0.0005));

  const handlePlomonClick = (idx) => {
    plomons.current[idx].handleAnimation(13);
  };

  useEffect(() => {
    getAllMyPet(
      (res) => {
        console.log(res);
        setAllMyPet(res.data);
        setRandomIndexList(getRandomIndexList(res.data.length));
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);
  return (
    <mesh ref={mesh} scale={0.5} position={[0, -5, 0]}>
      <SnowIsland />
      {allMyPet !== undefined && allMyPet.length > 0 && allMyPet.map((pet, idx) => (
        randomIndexList[idx] < 6 ?
          <Plomon key={idx} name={pet.name} position={plomonStates[randomIndexList[idx]][0]} rotation={plomonStates[randomIndexList[idx]][1]} speed={plomonStates[randomIndexList[idx]][2]} rSpeed={plomonStates[randomIndexList[idx]][3]} animationIndex={plomonStates[randomIndexList[idx]][4]} scale={0.08} onClick={() => (props.setPlomonOpen(true), props.setIsPlomonClicked(true), props.setTargetPlomon(pet))} />
          : console.log('no')
      )
      )}
      {/* {allMyPet !== undefined &&
        allMyPet.length > 0 &&
        allMyPet.map((pet, idx) =>
          randomIndexList[idx] < 6 ? (
            <DinoModel1
              key={idx}
              ref={(el) => (plomons.current[idx] = el)}
              name={pet.name}
              position={plomonStates[randomIndexList[idx]][0]}
              rotation={plomonStates[randomIndexList[idx]][1]}
              speed={plomonStates[randomIndexList[idx]][2]}
              rSpeed={plomonStates[randomIndexList[idx]][3]}
              animationIndex={plomonStates[randomIndexList[idx]][4]}
              scale={0.08}
              onClick={() => handlePlomonClick(idx)}
            />
          ) : (
            console.log("no")
          )
        )} */}
      <meshLambertMaterial attach="material" />
    </mesh>
  );
}

export function MainMYContents(props) {
  return (
    <Canvas camera={{ position: [-40, 15, 0] }}>
      <Suspense fallback={null}>
        <Island
          setPlomonOpen={props.setPlomonOpen}
          setIsPlomonClicked={props.setIsPlomonClicked}
          setTargetPlomon={props.setTargetPlomon}
        />
        <OrbitControls
          minPolarAngle={0.5}
          maxPolarAngle={1.5}
          minDistance={20}
          maxDistance={50}
        />
        <directionalLight color={"white"} position={[0, 10, 10]} />
        <directionalLight color={"white"} position={[-8.6, 10, -5]} />
        <directionalLight color={"white"} position={[8.6, 10, -5]} />
        <directionalLight color={"white"} position={[0, -20, 0]} />
      </Suspense>
    </Canvas>
  );
}
