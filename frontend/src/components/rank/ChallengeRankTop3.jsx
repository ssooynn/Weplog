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

export const ChallengeRankTop3 = ({ top3Crews }) => {
  if (top3Crews && top3Crews.length > 0)
    return (
      <Box
        direction="row"
        justify="evenly"
        width="100%"
        align="end"
        margin="20px 0px"
      >
        <Box direction="column" height="85px" justify="between" align="center">
          <Profile2nd src={top3Crews[1].imageUrl} alt="프로필 사진" />
          <Box direction="column">
            <Text size="10px" weight={400}>
              {top3Crews[1].name}
            </Text>
            <Text size="10px" weight={400}>
              {top3Crews[1].totalAmount}
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
          <Profile1st src={top3Crews[0].imageUrl} alt="프로필 사진" />
          <Box direction="column" align="center">
            <Text size="12px" weight={500}>
              {top3Crews[0].name}
            </Text>
            <Text size="10px" weight={400}>
              {top3Crews[0].totalAmount}
            </Text>
          </Box>
        </Box>
        <Box direction="column" height="85px" justify="between" align="center">
          <Profile3rd src={top3Crews[2].imageUrl} alt="프로필 사진" />
          <Box direction="column">
            <Text size="10px" weight={400}>
              {top3Crews[2].name}
            </Text>
            <Text size="10px" weight={400}>
              {top3Crews[2].totalAmount}
            </Text>
          </Box>
        </Box>
      </Box>
    );
  else return <Box>없어요</Box>;
};
