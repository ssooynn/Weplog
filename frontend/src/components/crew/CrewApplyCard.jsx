import { Box, Text } from "grommet";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { StyledProfile } from "../common/ProfileImg";
import acceptIcon from "../../assets/icons/acceptIcon.svg";
import rejectIcon from "../../assets/icons/rejectIcon.svg";
import { approveCrewJoin, rejectCrewJoin } from "../../apis/crewApi";

export const CrewApplyCard = ({ member, getCrew, getWaitingList }) => {
  console.log(member);
  const navigate = useNavigate();

  const approve = () => {
    approveCrewJoin(member.joinWaitingId, (res) => {
      alert(member.nickname + "멤버 승인")
      console.log(res);
      getCrew();
      getWaitingList();
    }, (err) => {
      console.log(err);
    })
  }

  const reject = () => {
    rejectCrewJoin(member.joinWaitingId, (res) => {
      alert(member.nickname + " 멤버 거절")
      getCrew();
      getWaitingList();
    }, (err) => {
      console.log(err);
    })
  }
  return (
    <Box
      background={{
        opacity: "strong",
        minHeight: "100px",
      }}
      width="100%"
      margin="10px 0px"
      round="small"
      elevation="medium"
    >
      <Box justify="around" pad="14px 18px">
        <Box direction="row" justify="between">
          <Box direction="row" align="center">
            <StyledProfile
              height="30px"
              width="30px"
              src={member.imageUrl}
            />
            <Text
              size="16px"
              weight={500}
              color="black"
              margin={{ left: "5px" }}
            >
              {member.nickname}
            </Text>
          </Box>
          <Box direction="row" align="center" width="45px" justify="between">
            <img src={acceptIcon} width="20px" height="20px" alt="승인" onClick={approve} />
            <img src={rejectIcon} width="20px" height="20px" alt="거절" onClick={reject} />
          </Box>
        </Box>
        <Text
          size="14px"
          weight={500}
          color="black"
          margin={{ left: "5px", top: "5px" }}
        >
          {member.comment ? member.comment : "작성내용이 없습니다."}
        </Text>
      </Box>
    </Box>
  );
};
