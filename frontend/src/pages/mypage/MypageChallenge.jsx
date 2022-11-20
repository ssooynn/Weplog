import { Box, Text } from "grommet";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { myAchievementApi } from "../../apis/achievementApi";
import {
  challengeEndListAPi,
  challengeIngListAPi,
} from "../../apis/memberChallengeApi";
import leftArrowIcon from "../../assets/icons/leftArrowIcon.svg";
import { ChallengeCardList } from "../../components/challenge/ChallengeCard";

export const MypageChallenge = () => {
  //진행중인 챌린지
  const [challengeIngList, setChallengeIngList] = useState([]);
  //완료된 챌린지
  const [challengeEndList, setChallengeEndList] = useState([]);

  useEffect(() => {
    challengeIngListAPi(
      (res) => {
        console.log(res);
        setChallengeIngList(res.data);
      },
      (err) => {
        console.log(err);
      }
    );

    challengeEndListAPi(
      (res) => {
        console.log(res);
        setChallengeEndList(res.data);
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  const navigate = useNavigate();

  return (
    <Box
      direction="column"
      height="auto"
      justify="start"
      style={{ minHeight: "700px" }}
    >
      {/* 제목 Header */}
      <Box
        direction="row"
        pad="18px"
        width="100%"
        height="60px"
        justify="between"
        align="center"
        border={{
          color: "#EAEAEA",
          size: "2px",
          styled: "solid",
          side: "bottom",
        }}
      >
        <img
          src={leftArrowIcon}
          width="30px"
          height="30px"
          onClick={(e) => navigate(-1)}
        />
        <Text size="16px" weight={500} style={{ alignSelf: "end" }}>
          {" "}
          내 챌린지 목록
        </Text>
        <Box width="30px"></Box>
      </Box>
      <Box direction="column" width="100%" pad="large">
        <Text size="14px" weight={500} margin="10px 0px">
          진행중인 챌린지
        </Text>
        {challengeIngList !== undefined && challengeIngList.length > 0 ? (
          <ChallengeCardList ChallengeList={challengeIngList} />
        ) : (
          <Text size="10px" weight={500}>
            진행중인 챌린지가 없습니다.
          </Text>
        )}
      </Box>
      <Box direction="column" width="100%" pad="0px 24px 24px 24px">
        <Text size="14px" weight={500} margin="10px 0px">
          완료된 챌린지
        </Text>
        {challengeEndList !== undefined && challengeEndList.length > 0 ? (
          <ChallengeCardList ChallengeList={challengeEndList} />
        ) : (
          <Text size="10px" weight={500}>
            완료된 챌린지가 없습니다.
          </Text>
        )}
      </Box>
    </Box>
  );
};
