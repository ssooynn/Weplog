import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {OrbitControls} from '@react-three/drei';
import { DinoModel3 } from "../components/main/DinoModel3";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import BackArrowIcon from "../assets/icons/backArrowIcon.svg";
import { Box } from "grommet";
import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";
const PlomonTableTitle = styled.div`
  padding-top: 8%;
  padding-left: 7%;
  height: 30px;
  font-size: 19px;
  font-weight: bold;
  color: #232323;
  display: flex;
  align-items: center;
`


function Plomon() {
    const mesh = useRef(null);
    useFrame(() => (mesh.current.rotation.y = mesh.current.rotation.y += 0.0005));
    return (
      <mesh ref={mesh} scale={0.5} position={[0, 1, 0]}>
        <DinoModel3 scale={0.4} position={[0, 0, 0]}/>
        <meshLambertMaterial attach="material" />
      </mesh>
    );
  }

export const Plomon3D = () => {
    const navigate = useNavigate();
    const plomonRef = useRef();

    // --------------- function -------------
    const handleCapture = () =>{
        const plomon = plomonRef.current;

    const filter = (plomon) => {
        console.log(plomon);
      return plomon.style.position !== "absolute";
    };

    domtoimage.toSvg(plomon, { filter: filter }).then(function (dataUrl) {
      /* do something */
      // console.log(dataUrl);
      saveAs(dataUrl, "card.svg");
    });
    }

    return (
        <div
        style={{
            width: "100%",
            justify: "center",
            height: "100vh",
            background:
            "linear-gradient(307.96deg, rgba(87, 186, 131, 0.296), rgba(29, 38, 255, 0.088))",
            textAlign: "center",
            display: "flex",
            justifyContent: "space-between",
            position: "relative",
        }}
        ref={plomonRef}
        >
            <Box
                
                width="100%"
                justify="start"
                style={{ position: "absolute", zIndex:3 }}
            >
                <PlomonTableTitle onClick={() => navigate("/main")}>
                    <img style={{width:"30px", height:"30px", paddingRight:"20px"}} src={BackArrowIcon} />
                    재권
                </PlomonTableTitle>
                <button onClick={handleCapture} >클릭</button>
            </Box>
            <Canvas
            camera={{position: [0, 10, 40]}}
            >
                <Suspense fallback={null}>
                <Plomon />
                <OrbitControls />
                <directionalLight color={"white"} position={[0, 10, 10]} />
                <directionalLight color={"white"} position={[-8.6, 10, -5]} />
                <directionalLight color={"white"} position={[8.6, 10, -5]} />
                <directionalLight color={"white"} position={[0, -20, 0]} />
                </Suspense>
            </Canvas>
        </div>
    );
  }