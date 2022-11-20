import { motion } from "framer-motion";
import { Box, Text } from "grommet";
import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { StyledText } from "../../components/Common";
import { BootstrapButton } from "../../components/common/Buttons";
import { PlomonEgg } from "../../components/PlomonEgg";
import { container, petList } from "../../utils/util";
import { loadLightInteraction } from "tsparticles-interaction-light";
import LightEffect from "../../assets/images/light.png";
import { tsParticles } from "tsparticles-engine";
import { getAllMyPet, postMyPet } from "../../apis/memberPetApi";
import styled, { css } from "styled-components";
import useInterval from "../../hooks/UseInterval";
import { Navigate } from "grommet-icons";
import { useNavigate } from "react-router-dom";
import { myPageProfileApi } from "../../apis/mypageApi";
import { setUser } from "../../stores/modules/user";
import { useDispatch } from "react-redux";


const LightStyled = styled.div`
  position: absolute;
  top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  width: 1px;
  height: 1px;
  z-index: 2100;
  border-radius: 50%;
  background-color: white;
  box-shadow: 0 0 20px white,
  0 0 40px white, 
  0 0 60px white, 
  0 0 80px white, 
  0 0 120px white,
  0 0 220px white,
  0 0 320px white;
  transition: 4s;
${(props) =>
    props.start && css`
       box-shadow: 0 0 0 40px white, 
    0 0 40px 60px white,
    0 0 40px 100px white,
    0 0 40px 120px white, 
    0 0 40px 200px white,
    0 0 40px 400px white, 
    0 0 40px 450px white;
    transition: 1s;
    `}
`
export const DrawingCharacter = () => {
  const [eggs, setEggs] = useState([1, 2, 3]);
  const [select, setSelect] = useState(null);
  const [clicked, setClicked] = useState(false);
  const [myPets, setMyPets] = useState(petList);
  const [eggClikced, setEggClicked] = useState(false);
  const [light, setLight] = useState(false);
  const [tic, setTic] = useState(2);
  const [tic2, setTic2] = useState(5);
  const [ready, setReady] = useState(false);
  const [ready2, setReady2] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const particlesInit = useCallback(async (engine) => {
    console.log(engine);
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
    loadLightInteraction(tsParticles);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    await console.log(container);
  }, []);

  useEffect(() => {
    getAllMyPet(
      (response) => {
        console.log(response);
        console.log(response.data.find(function (item) { return item.petId === 1 }).petId)
        const pets = myPets.filter((pet) => (response.data.find(function (item) { return item.petId === pet }) === undefined));
        console.log(myPets);
        console.log(pets);
        setMyPets(pets);
      },
      (fail) => {
        console.log(fail);
      }
    );
  }, []);


  useInterval(
    () => {
      if (light) {
        if (tic === 1) setReady(true);
        setTic((rec) => rec - 1);
        console.log("ready,,,");
      }
    },
    ready ? null : 1000
  );

  useInterval(
    () => {
      if (light) {
        if (tic2 === 1) {
          setReady2(true)
          const petId = myPets[Math.floor(Math.random() * myPets.length)];
          postMyPet(petId, (res) => {
            console.log(res);
            myPageProfileApi(
              (res) => {
                const user = {
                  name: res.data.name,
                  nickname: res.data.nickname,
                  weight: res.data.weight,
                  profileImageUrl: res.data.profileImageUrl,
                  plomon: res.data.petId,
                };
                dispatch(setUser(user));
                navigate("/main/plomon3d", { state: { gottenPetId: petId } });
              },
              (err) => {
                console.log(err);
              })
          }, (err) => {
            console.log(err);
          })
        };
        setTic2((rec) => rec - 1);
        console.log("ready,,,");
      }
    },
    ready2 ? null : 600
  );


  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={container}
      style={{
        width: "100%",
        textAlign: "center",
        height: "100vh",
        background:
          "linear-gradient(307.96deg, rgba(87, 186, 131, 0.296), rgba(29, 38, 255, 0.088))",
      }}
    >
      {/* {eggClikced}/// */}
      <Box
        width="100%"
        height="100%"
        style={{
          position: "absolute",
          zIndex: "1500",
        }}
        align="center"
        gap="100px"
      >
        {!clicked && (
          <>
            <Box
              width="100%"
              height="200px"
              align="center"
              background={{
                size: "contain",
                image: "url(assets/images/ribbon.png)",
              }}
            >
              <StyledText
                text="두근두근 플로몬 뽑기"
                color="white"
                size="20px"
                weight="bold"
                style={{ marginTop: "76px" }}
              />
            </Box>
            <Box>
              <StyledText
                text={"플로몬 EGG를 선택하세요!"}
                weight="bold"
                size="16px"
              />
            </Box>
            <Box direction="row" justify="center" gap="large">
              {eggs.map((egg, index) => {
                return (
                  <PlomonEgg
                    egg={egg}
                    exit={{ opacity: 0 }}
                    isActive={select === egg}
                    onClick={() => {
                      if (select === egg) {
                        setSelect(null);
                      } else {
                        setSelect(egg);
                      }
                    }}
                    key={index}
                  />
                );
              })}
            </Box>
            <BootstrapButton
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                setClicked(true);
              }}
              style={{ position: "fixed", bottom: 25 }}
            >
              선택 완료
            </BootstrapButton>
          </>
        )}
        {clicked && (
          <Box width="100%" height="100%" align="center" justify="center">
            <Text size="18px" weight={500} margin="0px 0px 40px 0px">클릭해보세요!</Text>
            <motion.img
              whileTap={eggClikced ? {} : { scale: 1.0 }}
              initial={{ opacity: 0, scale: 0.1 }}
              animate={
                eggClikced
                  ? {
                    opacity: 1,
                    scale: 1.3,
                    rotate: [0, 15, 0, -15, 0],
                  }
                  : {
                    opacity: 1,
                    scale: 1.3,
                    rotate: [0, 20, 0, -20, 0],
                  }
              }
              transition={
                eggClikced
                  ? {
                    default: {
                      duration: 0.3,
                      ease: [0, 0.71, 0.2, 1.01],
                    },
                    scale: {
                      type: "spring",
                      damping: 5,
                      stiffness: 100,
                      restDelta: 0.001,
                    },
                    rotate: {
                      repeatDelay: 0.005,
                      repeat: Infinity,
                      repeatType: "loop",
                    },
                  }
                  : {
                    default: {
                      duration: 0.3,
                      ease: [0, 0.71, 0.2, 1.01],
                    },
                    scale: {
                      type: "spring",
                      damping: 5,
                      stiffness: 100,
                      restDelta: 0.001,
                    },
                    rotate: {
                      repeatDelay: 0.7,
                      repeat: Infinity,
                      repeatType: "loop",
                    },
                  }
              }
              onTap={() => {
                // 짱~
                console.log("test")
                setEggClicked(true);
                setLight(true);
              }}
              src={`/assets/images/egg${select}.png`}
            />
          </Box>


        )}
      </Box>
      {light && <LightStyled start={ready} />}
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          fpsLimit: 60,
          interactivity: {
            detectsOn: "canvas",
            events: {
              resize: true,
            },
          },
          particles: {
            color: {
              value: "#bdbd01",
            },
            number: {
              density: {
                enable: true,
                area: 1000,
              },
              limit: 0,
              value: 150,
            },
            opacity: {
              animation: {
                enable: true,
                minimumValue: 0.05,
                speed: 2,
                sync: false,
              },
              random: {
                enable: true,
                minimumValue: 0.05,
              },
              value: 1,
            },
            shape: {
              type: "star",
            },
            size: {
              randmon: {
                enable: true,
                minimumValue: 0.5,
                value: 3,
              },
            },
          },
        }}
      />
    </motion.div>
  );
};
