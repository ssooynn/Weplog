import { Box } from "grommet";
import React, { useState } from "react";
import { BottomSheet } from "react-spring-bottom-sheet";
import CloseBtn from "../../assets/images/close.png";
import CourseBtn from "../../assets/images/course.png";
import WeatherBtn from "../../assets/images/weather.png";
import CheckBtn from "../../assets/images/check.png";
import { StyledText } from "../Common";
import { PloggingDataButton } from "../common/Buttons";

const DataButton = ({
  index,
  selected,
  setSelected,
  setFormat,
  active,
  child,
}) => {
  return (
    <PloggingDataButton
      whileTap={{ scale: 0.9 }}
      style={{
        position: "relative",
      }}
      onClick={() => {
        if (selected === index) {
          setSelected(null);
          setFormat(null);
        } else {
          setSelected(index);
          setFormat(index);
        }
      }}
    >
      {active && (
        <Box
          width="100%"
          height="100%"
          align="center"
          justify="center"
          style={{
            background: "rgba(0, 0, 0, 0.53)",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        >
          <img src={CheckBtn} />
        </Box>
      )}
      {child}
    </PloggingDataButton>
  );
};
export const ContentSelectBottomSheet = ({ open, onDismiss, setFormat }) => {
  const [selected, setSelected] = useState(null);
  return (
    <BottomSheet open={open} onDismiss={onDismiss}>
      <Box direction="row" justify="between" margin="20px">
        <StyledText text="플로깅 데이터" weight="bold" size="16px" />
        <img src={CloseBtn} onClick={onDismiss} />
      </Box>
      <Box height="25vh" direction="row" justify="center">
        <DataButton
          index={0}
          setSelected={setSelected}
          selected={selected}
          setFormat={setFormat}
          active={selected === 0 ? true : false}
          child={
            <Box
              align="end"
              justify="between"
              direction="row"
              width="100%"
              height="100%"
              pad={{
                bottom: "3px",
              }}
            >
              <StyledText text="km" color="white" />
              <StyledText text="H" color="white" />
              <StyledText text="Kcal" color="white" />
            </Box>
          }
        ></DataButton>
        <DataButton
          index={1}
          setSelected={setSelected}
          selected={selected}
          setFormat={setFormat}
          active={selected === 1 ? true : false}
          child={<img src={CourseBtn} />}
        ></DataButton>
        <DataButton
          index={2}
          setSelected={setSelected}
          selected={selected}
          setFormat={setFormat}
          active={selected === 2 ? true : false}
          child={
            <Box
              width="100%"
              height="100%"
              align="end"
              direction="row"
              pad={{
                bottom: "3px",
                left: "3px",
              }}
            >
              <img src={WeatherBtn} />
            </Box>
          }
        ></DataButton>
      </Box>
    </BottomSheet>
  );
};
