import { Box, Text } from "grommet";
import React from "react";
import styled, { css } from "styled-components";

const ChallengeRankStyled = styled.div`
  //border-sizebox는 padding 포함
  box-sizing: border-box;
  height: 55px;
  width: inherit;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;
  box-shadow: 0px 5px 4px rgba(0, 0, 0, 0.2);
  padding: 20px;
  background-color: ${(props) => props.my ? "#cdebda" : "white"};
  margin-top: 10px;

  ${(props) =>
    props.white &&
    css`
      background-color: #fbfbfb;
    `}
`;

const RankProfileImg = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 20px;
`;

export const ChallengeRankCard = ({ rank, profileImgUrl, nickname, value, my }) => {

  return (
    <ChallengeRankStyled my={my}>
      <Box direction="row" justify="between" width="100%" align="center">
        <Box direction="row" width="60%" align="center">
          <Text size="14px" weight={400} color={my ? "#00853B" : "#1f1d1d"}>
            {rank}
          </Text>
          <Box
            direction="row"
            width="70%"
            justify="start"
            margin={{ left: "20px" }}
            align="center"
          >
            <RankProfileImg
              src={profileImgUrl}
              alt="프로필 사진"
            ></RankProfileImg>
            <Text size="13px" weight={500} >
              {nickname}
            </Text>
          </Box>
        </Box>
        <Text size="14px" weight={500} color={my ? "#00853B" : "#1f1d1d"}>
          {value}
        </Text>
      </Box>
    </ChallengeRankStyled>
  );
};
