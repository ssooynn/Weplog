import { Dialog, DialogTitle } from "@mui/material";
import { Box, Text } from "grommet";
import React, { useState } from "react";
import styled from "styled-components";
import Button from "../../Button";

const TextAreaStyle = styled.textarea`
  font-family: "Noto Sans KR", sans-serif;
  width: 60vw;
  height: 15vh;
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.6);
  border-radius: 5px;
  border: 1px rgb(255, 255, 255);
  padding: 5px 15px;
  margin: 5px 0px;
  color: black;
  resize: none;
`;
export function STextArea({ placeholder, value, onChange }) {
  return (
    <TextAreaStyle
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  );
}

export const CrewJoinDialog = ({ open, onDismiss, accept }) => {
  const [comment, setComment] = useState("");
  return (
    <Dialog
      open={open}
      onClose={onDismiss}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle
        id="alert-dialog-title"
        style={{
          fontFamily: "gwmd",
          fontWeight: "bold",
          fontSize: "16px",
        }}
      >
        가입 신청 하시겠습니까?
      </DialogTitle>
      <Box
        direction="column"
        margin="30px 24px"
        width="70vw"
        justify="around"
        align="start"
      >
        <Box gridArea="desc" justify="start" align="start">
          <Text weight="bold" size="14px">
            신청글 작성
          </Text>
        </Box>
        <Box gridArea="descData" justify="center" align="start">
          <STextArea
            placeholder="가입 신청 시 하고 싶은 말을 작성해주세요."
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />
        </Box>
        <Box align="center" width="100%">
          <Button smallgreenround="true" onClick={() => accept(comment)}>
            가입 신청
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};
