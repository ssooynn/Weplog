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
  background-color: #cdebda;
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
`;

export const ChallengeRankCard = (rank, profileimg, name, contribution) => {
  return (
    <ChallengeRankStyled>
      <Box direction="row" justify="between" width="100%" align="center">
        <Box direction="row" width="35%" align="center">
          <Text size="14px" weight={400} color="#00853B">
            5
          </Text>
          <Box
            direction="row"
            width="70%"
            justify="between"
            margin={{ left: "20px" }}
            align="center"
          >
            <RankProfileImg
              src="https://picsum.photos/400/300"
              alt="프로필 사진"
            ></RankProfileImg>
            <Text size="13px" weight={400}>
              {" "}
              이아현{" "}
            </Text>
          </Box>
        </Box>
        <Text size="14px" weight={400} color="#00853B">
          6.2%
        </Text>
      </Box>
    </ChallengeRankStyled>
  );
};
