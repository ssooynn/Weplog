import { Box } from "grommet";
import React, { useState } from "react";
import { BottomSheet } from "react-spring-bottom-sheet";
import CloseBtn from "../../assets/images/close.png";
import CourseBtn from "../../assets/images/course.png";
import WeatherBtn from "../../assets/images/weather.png";
import CheckBtn from "../../assets/images/check.png";
import { StyledText } from "../Common";
import { PloggingDataButton } from "../common/Buttons";

export const DataButton = ({ index, format, setFormat, active, child }) => {
  return (
    <PloggingDataButton
      whileTap={{ scale: 0.9 }}
      style={{
        position: "relative",
      }}
      onClick={() => {
        !format.some((s) => s === index)
          ? setFormat((select) => [...select, index])
          : setFormat(format.filter((s) => s !== index));
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
export const ContentSelectBottomSheet = ({
  open,
  onDismiss,
  format,
  setFormat,
}) => {
  return (
    <BottomSheet open={open} onDismiss={onDismiss}>
      <Box direction="row" justify="between" margin="20px">
        <StyledText text="플로깅 데이터" weight="bold" size="16px" />
        <img src={CloseBtn} onClick={onDismiss} />
      </Box>
      <Box height="25vh" direction="row" justify="center">
        <DataButton
          index={0}
          format={format}
          setFormat={setFormat}
          active={format.some((v) => v === 0) ? true : false}
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
          format={format}
          setFormat={setFormat}
          active={format.some((v) => v === 1) ? true : false}
          child={<img src={CourseBtn} />}
        ></DataButton>
        <DataButton
          index={2}
          format={format}
          setFormat={setFormat}
          active={format.some((v) => v === 2) ? true : false}
          child={
            <Box
              width="100%"
              height="100%"
              align="start"
              justify="end"
              direction="row"
              pad={{
                top: "3px",
                right: "3px",
              }}
            >
              서울, 관악
            </Box>
          }
        ></DataButton>
      </Box>
    </BottomSheet>
  );
};
