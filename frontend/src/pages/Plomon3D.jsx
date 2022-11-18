import React, { Suspense, useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Plomon3DDetail } from "../components/main/Plomon3DDetail";
import { Plomon3DDetail2 } from "../components/main/Plomon3DDetail2";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import BackArrowIcon from "../assets/icons/backArrowIcon.svg";
import HeartCareIcon from "../assets/icons/HeartCareIcon.png";
import { ReactComponent as HeartPopIcon } from "../assets/icons/HeartPopIcon.svg";
import { Box } from "grommet";
import { getMyPetDetail } from "../apis/memberPetApi";

const PlomonTableTitle = styled.div`
  padding-top: 8%;
  padding-left: 7%;
  height: 30px;
  font-size: 19px;
  font-weight: bold;
  color: #232323;
  display: flex;
  align-items: center;
`;

const PlomonContentsArea = styled.div`
  margin-top: 58vh;
  width: 100vw;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 1;
`;

const PlomonContentsName = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #232323;
  margin-bottom: 2vh;
`;

const PlomonContentsDescription = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: #232323;
  line-height: 150%;
`;

const PlomonContentsButtonsArea = styled.div`
  margin-top: 5vh;
  display: flex;
  width: 100vw;
  flex-direction: row;
  justify-content: center;
`;

const PlomonContentsButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  // height: 4vh;
  margin: 0 5vw;
  // background-color:white;
  // padding:10px;
  // border-radius:10px
`;

function random(min, max) {
  return Math.random() * (max - min) + min;
}

const opacityDuration = 1;

const colors = [
  "#fce473",
  "#f68b39",
  "#ed6c63",
  "#847bb9",
  "#97cd76",
  "#35b1d1",
];

function Bubble({ id, onAnimationEnd }) {
  const [position, setPosition] = useState({ x: 0, y: -230 });
  const [opacity, setOpacity] = useState(1);
  const size = useRef(random(0.8, 1.2));

  const element = useRef();
  const emoji = useRef(Math.floor(random(0, colors.length - 1)));

  const initialOptions = useRef({
    animationDuration: random(8, 12),
    element,
    onAnimationEnd,
    id,
  });

  useEffect(() => {
    const { animationDuration, element, onAnimationEnd, id } =
      initialOptions.current;

    element.current.addEventListener("transitionend", (event) => {
      if (event.propertyName === "opacity") {
        onAnimationEnd(id);
      }
    });

    setTimeout(() => {
      setPosition((prevState) => ({
        ...prevState,
        x: random(-340, 340),
        y: random(-1800, -2000),
      }));
    }, 5);

    setTimeout(() => {
      setOpacity(0);
    }, animationDuration - opacityDuration);
  }, []);

  return (
    <div
      style={{
        top: 0,
        color: "red",
        fontSize: "2em",
        left: "50%",
        opacity,
        pointerEvents: "none",
        position: "absolute",
        transform: `translate(calc(-50% + ${position.x}px), calc(-100% + ${position.y}px)) scale(${size.current})`,
        textShadow: "0 0 5px rgba(0, 0, 0, .25)",
        transition: `transform ${initialOptions.current.animationDuration}s linear, opacity ${opacityDuration}s ease-in-out`,
      }}
      ref={element}
    >
      <HeartPopIcon fill={colors[emoji.current]} />
    </div>
  );
}

function Plomon(props) {
  const mesh = useRef(null);
  const ref = useRef(null);
  const [index, setIndex] = useState(0);

  const handlePlomonClick = () => {
    setIndex((index + 1) % 6);
    ref.current.handleAnimation(index);
  };

  useFrame(() => (mesh.current.rotation.y = mesh.current.rotation.y += 0.0005));
  useEffect(() => {
    console.log("test");
  }, [index]);
  return (
    <mesh ref={mesh} scale={0.5} position={[0, 1, 0]}>
      {props.imageLevel === 1 ?
        <Plomon3DDetail
        ref={ref}
        name={props.name}
        scale={0.4}
        position={[0, 0, 0]}
        onClick={handlePlomonClick} //클릭하면 애니매이션 변경
        />
        :
        <Plomon3DDetail2
        ref={ref}
        name={props.name}
        scale={0.2}
        position={[0, 0, 0]}
        onClick={handlePlomonClick} //클릭하면 애니매이션 변경
      />
      }
      
      <meshLambertMaterial attach="material" />
    </mesh>
  );
}

export const Plomon3D = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const gottenPetId = location.state.gottenPetId;
  const [myPetDetail, setMyPetDetail] = useState([]);
  const [likes, setLikes] = useState([]);
  const cleanLike = useRef((id) => {
    setLikes((currentLikes) => currentLikes.filter((like) => like !== id));
  });

  useEffect(() => {
    getMyPetDetail(
      gottenPetId,
      (res) => {
        setMyPetDetail(res.data);
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  useEffect(() => {}, []);

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
        direction: "column",
      }}
    >
      <Box width="100%" style={{ position: "absolute", zIndex: 3 }}>
        <PlomonTableTitle onClick={() => navigate("/main")}>
          <img
            style={{ width: "30px", height: "30px", paddingRight: "20px" }}
            src={BackArrowIcon}
          />
          {myPetDetail.name}
        </PlomonTableTitle>
      </Box>
      <PlomonContentsArea>
        <PlomonContentsName>{myPetDetail.name}</PlomonContentsName>
        <PlomonContentsDescription>
          {myPetDetail.description ? (
            myPetDetail.description
              .split("\\n")
              .map((item, idx) => <div key={idx}>{item}</div>)
          ) : (
            <></>
          )}
        </PlomonContentsDescription>
        <PlomonContentsButtonsArea>
          <PlomonContentsButton
            onClick={() =>
              setLikes((prevLikes) => [...prevLikes, new Date().getTime()])
            }
          >
            <div
              style={{
                objectFit: "cover",
                width: "50px",
                height: "40px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <img
                src={HeartCareIcon}
                style={{ objectFit: "cover", width: "40px", height: "40px" }}
              />
            </div>
            <div
              style={{ fontSize: "10px", fontWeight: "500", paddingTop: "3px" }}
            >
              쓰다듬기
            </div>
          </PlomonContentsButton>
          {likes ? (
            likes.map((id) => (
              <Bubble onAnimationEnd={cleanLike.current} key={id} id={id} />
            ))
          ) : (
            <></>
          )}
        </PlomonContentsButtonsArea>
      </PlomonContentsArea>
      <Canvas camera={{ position: [0, 10, 40] }}>
        <Suspense fallback={null}>
          <Plomon name={myPetDetail.name} imageLevel={myPetDetail.imageLevel} />
          <OrbitControls
            enableZoom={false}
            maxPolarAngle={1.5}
            minPolarAngle={1.5}
          />
          <directionalLight color={"white"} position={[0, 10, 10]} />
          <directionalLight color={"white"} position={[-8.6, 10, -5]} />
          <directionalLight color={"white"} position={[8.6, 10, -5]} />
          <directionalLight color={"white"} position={[0, -20, 0]} />
        </Suspense>
      </Canvas>
    </div>
  );
};
