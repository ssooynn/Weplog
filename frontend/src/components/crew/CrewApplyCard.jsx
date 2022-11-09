import { Box, Text } from "grommet";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { StyledProfile } from "../common/ProfileImg";
import acceptIcon from "../../assets/icons/acceptIcon.svg";
import rejectIcon from "../../assets/icons/rejectIcon.svg";

export const CrewApplyCard = (data) => {
  console.log(data.bgimage);
  const navigate = useNavigate();
  const goChallengeDetail = () => {
    navigate(`/challenge/detail/${data.challengeId}`);
  };
  return (
    <Box
      background={{
        image: `url(${data.bgimage})`,
        opacity: "strong",
        minHeight: "100px",
      }}
      width="100%"
      margin="10px 0px"
      round="small"
      elevation="medium"
      onClick={goChallengeDetail}
    >
      <Box justify="around" pad="14px 18px">
        <Box direction="row" justify="between">
          <Box direction="row" align="center">
            <StyledProfile
              height="30px"
              width="30px"
              src="https://picsum.photos/100/100?random=48"
            />
            <Text
              size="16px"
              weight={500}
              color="black"
              margin={{ left: "5px" }}
            >
              댕댕
            </Text>
          </Box>
          <Box direction="row" align="center" width="45px" justify="between">
            <img src={acceptIcon} width="20px" height="20px" alt="승인" />
            <img src={rejectIcon} width="20px" height="20px" alt="거절" />
          </Box>
        </Box>
        <Text
          size="14px"
          weight={500}
          color="black"
          margin={{ left: "5px", top: "5px" }}
        >
          저 이 팀 꼭 가입하고 싶어요.저 이 팀 꼭 가입하고 싶어요저 이 팀 꼭
          가입하고 싶어요저 이 팀 꼭 가입하고 싶어요 저 이 팀 꼭 가입하고
          싶어요.저 이 팀 꼭 가입하고 싶어요저 이 팀 꼭 가입하고 싶어요저 이 팀
          꼭 가입하고 싶어요
        </Text>
      </Box>
    </Box>
  );
};
