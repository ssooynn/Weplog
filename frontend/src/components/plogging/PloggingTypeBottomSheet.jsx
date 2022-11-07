import { Box } from "grommet";
import React, { useState } from "react";
import { BottomSheet } from "react-spring-bottom-sheet";
import CloseBtn from "../../assets/images/close.png";
import { StyledText } from "../Common";

export const PloggingTypeBottomSheet = ({ open, onDismiss }) => {
  return (
    <BottomSheet open={open} onDismiss={onDismiss}>
      <Box direction="row" justify="between" margin="20px">
        <Box width="24px" />
        <StyledText text="플로깅 선택" weight="bold" size="16px" />
        <img src={CloseBtn} onClick={onDismiss} />
      </Box>
      <Box height="25vh" direction="row" justify="center"></Box>
    </BottomSheet>
  );
};
