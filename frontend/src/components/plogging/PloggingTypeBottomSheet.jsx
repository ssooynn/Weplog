import { Divider, FormHelperText } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Box } from "grommet";
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
  const navigate = useNavigate();
  const handleChange = (event) => {
    setRoomId(event.target.value);
  };
  const handleCrewPlogging = (isSingle, roomId) => {
    navigate("/plogging", {
      state: {
        ploggingType: isSingle ? "single" : "crew",
        roomId: roomId,
      },
    });
  };
  return (
    <BottomSheet
      open={open}
      onDismiss={() => {
        onDismiss();
      }}
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
      <Box height="25vh" direction="row" justify="center">
        <motion.button
          onClick={() => {
            handleCrewPlogging(true, null);
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
        <Box>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-helper-label">크루</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={roomId}
              label="크루"
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {crews &&
                crews.map((crew, index) => {
                  <MenuItem value={crew.roomId} key={index}>
                    {crew.crewName}
                  </MenuItem>;
                })}
            </Select>
            <FormHelperText>크루를 선택하세요!</FormHelperText>
          </FormControl>
          <motion.button
            style={{
              background: "none",
              border: "none",
              fontFamily: "gwtt",
            }}
            onClick={() => {
              handleCrewPlogging(false, null);
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
