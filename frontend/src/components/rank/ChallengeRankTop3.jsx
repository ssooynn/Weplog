import { Box, Text } from "grommet";
import React, { useState } from "react";
import styled from "styled-components";
import crown from "../../assets/images/crown.png";

const Profile1st = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 50%;
  border: 3px solid #ffd100;
    margin-bottom: 5px;

`;

const Profile2nd = styled.img`
  width: 65px;
  height: 65px;
  object-fit: cover;
  border-radius: 50%;
  border: 3px solid #c0c0c0;
  margin-bottom: 5px;
`;

const Profile3rd = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
  border: 3px solid #c2780a;
    margin-bottom: 5px;

`;

export const ChallengeRankTop3 = ({ type, top3, rankType }) => {
  console.log(top3);
  const changeImage = (id) => {
    if (type === 'user') {
      return top3[id].profileImageUrl;
    } else {
      return top3[id].imageUrl;
    }
  }
  const changeTitle = (id) => {
    if (type === 'user') {
      return top3[id].nickname;
    } else {
      return top3[id].name;
    }
  }
  const secChangeTime = (seconds) => {
    var hour = parseInt(seconds / 3600);
    var min = parseInt((seconds % 3600) / 60);
    var sec = seconds % 60;
    if (hour <= 10) {
      hour = `0${hour}`;
    }
    if (min <= 10) {
      min = `0${min}`;
    }
    if (sec <= 10) {
      sec = `0${sec}`;
    }
    return `${hour} : ${min} : ${sec}`;
  }
  const changevalue = (id) => {
    if (type === 'user') {
      switch (rankType) {
        case "DISTANCE":
          return (Number(top3[id].totalDistance) * 0.001).toFixed(2) + " Km";

        case "PLOGGING_CNT":
          return top3[id].totalCnt + " 회";

        case "TIME":
          return secChangeTime(top3[id].totalTime);

        default:
          return undefined;
      }
    } else {
      switch (rankType) {
        case "DISTANCE":
          return (Number(top3[id].totalAmount) * 0.001).toFixed(2) + " Km";

        case "PLOGGING_CNT":
          return top3[id].totalAmount + " 회";

        case "TIME":
          return secChangeTime(top3[id].totalAmount);

        default:
          return undefined;
      }
    }
  }
  if (top3 && top3.length > 0)
    return (
      <Box
        direction="row"
        justify="evenly"
        width="100%"
        align="end"
        margin="20px 0px"
      >
        <Box direction="column" height="140px" justify="end" align="center">
          <Profile2nd src={changeImage(1)} alt="프로필 사진" />
          <Box direction="column" align="center" width="100px" style={{ textAlign: "center", whiteSpace: "normal", wordBreak: "keep-all" }}>
            <Text size="10px" weight={500}>
              2등
            </Text>
            <Text size="10px" weight={400}>
              {changeTitle(1)}
            </Text>
            <Text size="10px" weight={400}>
              {changevalue(1)}
            </Text>
          </Box>
        </Box>
        <Box
          direction="column"
          height="160px"
          justify="end"
          align="center"
          style={{ position: "relative" }}
        >
          <Box direction="column" align="center" justify="end">
            <img
              width="25px"
              style={{ objectFit: "cover" }}
              src={crown}
              alt="왕관 사진"
            />
            <Profile1st src={changeImage(0)} alt="프로필 사진" />
          </Box>
          <Box direction="column" align="center" width="100px" style={{ textAlign: "center", whiteSpace: "normal", wordBreak: "keep-all" }}>
            <Text size="10px" weight={500}>
              1등
            </Text>
            <Text size="12px" weight={500} >
              {changeTitle(0)}
            </Text>
            <Text size="10px" weight={400}>
              {changevalue(0)}
            </Text>
          </Box>
        </Box>
        <Box direction="column" height="140px" justify="end" align="center">
          <Profile3rd src={changeImage(2)} alt="프로필 사진" />
          <Box direction="column" align="center" width="100px" style={{ textAlign: "center", whiteSpace: "normal", wordBreak: "keep-all" }}>
            <Text size="10px" weight={500}>
              3등
            </Text>
            <Text size="10px" weight={400}>
              {changeTitle(2)}
            </Text>
            <Text size="10px" weight={400}>
              {changevalue(2)}
            </Text>
          </Box>
        </Box>
      </Box>
    );
  else return <Box>없어요</Box>;
};
