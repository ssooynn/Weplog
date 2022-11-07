import { motion } from "framer-motion";
import { Box } from "grommet";
import React, { useCallback } from "react";
import { useState } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { StyledText } from "../../components/Common";
import { BootstrapButton } from "../../components/common/Buttons";
import { PlomonEgg } from "../../components/PlomonEgg";
import { container } from "../../utils/util";
import { loadLightInteraction } from "tsparticles-interaction-light";
import LightEffect from "../../assets/images/light.png";
import { tsParticles } from "tsparticles-engine";
export const DrawingCharacter = () => {
  const [eggs, setEggs] = useState([1, 2, 3]);
  const [select, setSelect] = useState(null);
  const [clicked, setClicked] = useState(false);

  const [eggClikced, setEggClicked] = useState(false);
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
              height="30%"
              align="center"
              justify="center"
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
            <motion.img
              whileTap={eggClikced ? {} : { scale: 1.0 }}
              initial={{ opacity: 0, scale: 0.1 }}
              animate={
                eggClikced
                  ? {
                      opacity: 1,
                      scale: 1.3,
                      rotate: [0, 15, 0, -15, 0],
                      y: 10,
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
                setEggClicked(true);
              }}
              src={`/assets/images/egg${select}.png`}
            />
          </Box>
        )}
      </Box>
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
