import { Divider, FormHelperText } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Box, Carousel, Text } from "grommet";
import React, { useState } from "react";
import { BottomSheet } from "react-spring-bottom-sheet";
import CloseBtn from "../../assets/images/close.png";
import { StyledText } from "../Common";
import { motion } from "framer-motion";
import SinglePlog from "../../assets/images/singlePlog.png";
import CrewPlog from "../../assets/images/crewPlog.png";
import { useNavigate } from "react-router-dom";

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
      <Box direction="row" justify="between" margin="20px">
        <Box width="24px" />
        <StyledText text="플로깅 선택" weight="bold" size="16px" />
        <img
          src={CloseBtn}
          onClick={() => {
            onDismiss();
          }}
        />
      </Box>
      <Box height="25vh" direction="row" justify="center" margin="50px">
        <motion.button
          onClick={() => {
            handleCrewPlogging(true);
          }}
          whileTap={{ scale: 1.2 }}
          children={
            <Box
              width="145px"
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
          }
          style={{
            background: "none",
            border: "none",
            fontFamily: "gwtt",
          }}
        />
        <Divider orientation="vertical" variant="middle" flexItem />
        <Box width="145px" align="center" justify="center">
          <Carousel activeChild={activeSlide} onChild={setActiveSlide}>
            {crews &&
              crews.map((crew, index) => {
                return (
                  <Text
                    size="18px"
                    weight={500}
                    margin={{ left: "15px", right: "15px" }}
                    key={index}
                  >
                    {crew.crewName}
                  </Text>
                );
              })}
          </Carousel>
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
                width="145px"
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
