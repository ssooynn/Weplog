import { Box, Text } from "grommet";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ProgressBar = styled.progress`
  appearance: none;
  height: 3px;

  ::-webkit-progress-bar {
    border-radius: 5px;
    background: #c1c1c1;
  }

  ::-webkit-progress-value {
    border-radius: 5px;
    background: #57ba83;
  }
`;

const WhiteBg = styled.div`
  background-color: rgba(255, 255, 255, 0.5);
  width: 100%;
  height: 100%;
  border-radius: inherit;
`;

export const ChallengeCard = (data) => {
  console.log(data.bgimage);
  const navigate = useNavigate();
  const goChallengeDetail = () => {
    navigate(`/challenge/detail/${data.challengeId}`);
  };
  return (
    <Box
      background={{ image: `url(${data.bgimage})`, opacity: "strong" }}
      height="100px"
      width="100%"
      margin="medium"
      round="small"
      elevation="medium"
      onClick={goChallengeDetail}
    >
      <WhiteBg>
        <Box justify="between" pad="14px 18px" height="100px">
          <Text size="14px" weight={500} color="black">
            오늘도 지구와 함께
          </Text>
          <Text size="10px" weight={400}>
            Goal - 10Km 플로깅
          </Text>
          <Text size="10px" weight={400}>
            기한 - 2022.12.25 15시까지
          </Text>
          <Box direction="row" width="100%" justify="between">
            <Box direction="row" justify="between" align="center" width="190px">
              <ProgressBar
                id="progress"
                value="75"
                min="0"
                max="100"
              ></ProgressBar>
              <Text size="10px" weight={400}>
                75%
              </Text>
            </Box>
            <Box>
              <Text size="10px" weight={500}>
                참여인원 15명
              </Text>
            </Box>
          </Box>
        </Box>
      </WhiteBg>
    </Box>
  );
};
