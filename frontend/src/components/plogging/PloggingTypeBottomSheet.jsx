import { Divider, FormHelperText } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Box, Carousel, Grommet, Text } from "grommet";
import React, { useState } from "react";
import { BottomSheet } from "react-spring-bottom-sheet";
import CloseBtn from "../../assets/images/close.png";
import { StyledText } from "../Common";
import { motion } from "framer-motion";
import SinglePlog from "../../assets/images/singlePlog.png";
import CrewPlog from "../../assets/images/crewPlog.png";
import { useNavigate } from "react-router-dom";

const grommetCustom = {
  carousel: {
    animation: {
      duration: 300,
    },
  },
};

export const PloggingTypeBottomSheet = ({ crews, open, onDismiss }) => {
  const [roomId, setRoomId] = useState("");
  const [crewId, setCrewId] = useState("");
  const [activeSlide, setActiveSlide] = useState(0);
  const navigate = useNavigate();
  const handleChange = (event) => {
    setRoomId(event.target.value);
  };
  const handleCrewPlogging = (isSingle) => {
    navigate("/plogging", {
      state: {
        ploggingType: isSingle ? "single" : "crew",
        roomId: isSingle ? null : crews[activeSlide].roomId,
        crewId: isSingle ? null : crews[activeSlide].crewId,
      },
    });
  };

  return (
    <BottomSheet
      open={open}
      onDismiss={() => {
        onDismiss();
      }}
      style={{ zIndex: 1005 }}
    >
      <Box direction="row" justify="between">
        <Box width="24px" />
        <StyledText text="플로깅 선택" weight="bold" size="16px" />
        <img
          src={CloseBtn}
          onClick={() => {
            onDismiss();
          }}
        />
      </Box>
      <Box
        height="25vh"
        direction="row"
        justify="center"
        margin={{ bottom: "50px" }}
      >
        <motion.button
          onClick={() => {
            handleCrewPlogging(true);
          }}
          whileTap={{ scale: 1.2 }}
          children={
            <>
              <Box height="40px"></Box>
              <Box
                width="165px"
                align="center"
                style={{ borderRadius: "8px" }}
                gap="medium"
              >
                <img src={SinglePlog} width="96px" />
                <StyledText
                  text="혼자 하기"
                  color="black"
                  weight="bold"
                  size="18px"
                />
              </Box>
            </>
          }
          style={{
            background: "none",
            border: "none",
            fontFamily: "gwtt",
          }}
        />
        <Divider orientation="vertical" variant="middle" flexItem />
        <Box width="165px" align="center" justify="center" height="100%">
          <Grommet theme={grommetCustom}>
            <Box height="40px">
              <Carousel
                activeChild={activeSlide}
                onChild={setActiveSlide}
                controls="arrows"
                alignSelf="center"
                height="40px"
                wrap
              >
                {crews &&
                  crews.map((crew, index) => {
                    return (
                      <Box
                        align="center"
                        key={index}
                        justify="center"
                        height="40px"
                      >
                        <Text
                          alignSelf="center"
                          textAlign="center"
                          wordBreak="break-all"
                          size="14px"
                          weight={500}
                          margin={{ left: "15px", right: "15px" }}
                          style={{
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                            whiteSpace: "normal",
                            wordBreak: "break-word",
                            display: "-webkit-box",
                            WebkitLineClamp: "1",
                            // 원하는 라인수
                            WebkitBoxOrient: "vertical",
                          }}
                        >
                          {crew.crewName}
                        </Text>
                      </Box>
                    );
                  })}
              </Carousel>
            </Box>
          </Grommet>
          <motion.button
            style={{
              background: "none",
              border: "none",
              fontFamily: "gwtt",
            }}
            onClick={() => {
              handleCrewPlogging(false);
            }}
            whileTap={{ scale: 1.2 }}
            children={
              <Box
                width="165px"
                align="center"
                style={{ borderRadius: "8px" }}
                gap="medium"
              >
                <img src={CrewPlog} width="96px" />
                <StyledText
                  text="같이 하기"
                  color="black"
                  weight="bold"
                  size="18px"
                />
              </Box>
            }
          />
        </Box>
      </Box>
    </BottomSheet>
  );
};
