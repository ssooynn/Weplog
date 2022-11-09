import { Box, Text } from "grommet";
import React from "react";
import styled from "styled-components";
import crown from "../../assets/images/crown.svg";

const Profile1st = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid #ffd100;
`;

const Profile2nd = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid #c1c1c1;
`;

const Profile3rd = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid #ff9900;
`;

export const ChallengeRankTop3 = () => {
  return (
    <Box
      direction="row"
      justify="evenly"
      width="100%"
      align="end"
      margin="20px 0px"
    >
      <Box direction="column" height="85px" justify="between" align="center">
        <Profile2nd src="https://picsum.photos/400/300" alt="프로필 사진" />
        <Box direction="column">
          <Text size="10px" weight={400}>
            문석희
          </Text>
          <Text size="10px" weight={400}>
            24.5%
          </Text>
        </Box>
      </Box>
      <Box
        direction="column"
        height="120px"
        justify="between"
        align="center"
        style={{ position: "relative" }}
      >
        <img
          src={crown}
          alt="왕관 사진"
          style={{ position: "absolute", top: "-20px", left: "30px" }}
        />
        <Profile1st src="https://picsum.photos/400/300" alt="프로필 사진" />
        <Box direction="column" align="center">
          <Text size="12px" weight={500}>
            권기정
          </Text>
          <Text size="10px" weight={400}>
            24.5%
          </Text>
        </Box>
      </Box>
      <Box direction="column" height="85px" justify="between" align="center">
        <Profile3rd src="https://picsum.photos/400/300" alt="프로필 사진" />
        <Box direction="column">
          <Text size="10px" weight={400}>
            문석희
          </Text>
          <Text size="10px" weight={400}>
            24.5%
          </Text>
        </Box>
      </Box>
    </Box>
  );
};
