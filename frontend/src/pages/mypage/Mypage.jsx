import { Box, Text } from "grommet";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import rightArrowIcon from "../../assets/icons/rightArrowIcon.svg";
import ploggingLogIcon from "../../assets/icons/ploggingLogIcon.png";
import ploggingQuestIcon from "../../assets/icons/ploggingQuestIcon.png";
import ploggingChallengeIcon from "../../assets/icons/ploggingChallengeIcon.png";
import ploggingCrewIcon from "../../assets/icons/ploggingCrewIcon.png";
import { ChallengeCard } from "../../components/challenge/ChallengeCard";
import { useNavigate } from "react-router-dom";
import { myAchievementApi } from "../../apis/achievementApi";
import { myPageInfoApi, myPageProfileApi } from "../../apis/mypageApi";
import { m } from "framer-motion";

const ProfileImg = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
`;

const StyledHr = styled.hr`
  background-color: #eaeaea;
  width: 100vw;
  height: 8px;
  border: none;
  margin: 0px;
`;

export const Mypage = () => {
  const [profile, setProfile] = useState("");
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [achievementAllCnt, setAchievementAllCnt] = useState(0);
  const [achievementSuccessCnt, setAchievementSuccessCnt] = useState(0);
  const [achievementIngCnt, setAchievementIngCnt] = useState(0);

  const navigate = useNavigate();
  const goPage = (url) => {
    navigate(`${url}`);
  };

  const getPloggingLogs = () => {
    console.log("2");
  }

  const getAchievement = () => {
    myAchievementApi((res) => {
      setAchievementAllCnt(res.data.length);
      let success = 0;
      for (let i = 0; i < res.data.length; i++) {
        if (res.data[i].completeFlag === true) {
          success++;
        }
      }
      setAchievementSuccessCnt(success);
      setAchievementIngCnt(res.data.length - success);
    }, (err) => {
      console.log(err);
    })
  }

  const getProfile = () => {
    myPageProfileApi((res) => {
      console.log(res);
      setProfile(res.data.profileImageUrl);
      setName(res.data.name);
      setNickname(res.data.nickname);
    }, (err) => {
      console.log(err);
    })
  }

  const getInfo = () => {
    myPageInfoApi((res) => {
      console.log(res);
    }, (err) => {
      console.log(err);
    })
  }

  useEffect(() => {
    getAchievement();
    getProfile();
    getInfo();
  }, [])
  return (
    <Box>
      {/* 유저 정보 */}
      <Box
        direction="row"
        pad="30px 30px"
        justify="between"
        align="center"
        width="100%"
      >
        <Box direction="row" width="50%" justify="between" align="center">
          <ProfileImg src={`${profile}`}></ProfileImg>
          <Box direction="row" align="center" justify="between" width="60px">
            <Text size="18px" weight={500}>
              {nickname}
            </Text>
            <Text size="14px" weight={400}>
              님
            </Text>
          </Box>
        </Box>
        <img
          src={rightArrowIcon}
          width="30px"
          height="30px"
          onClick={(e) => goPage("/mypage/user")}
        />
      </Box>

      <StyledHr />

      {/* 내 플로깅 기록 */}
      <Box
        direction="column"
        pad="30px 30px"
        justify="center"
        align="center"
        width="100%"
      >
        <Box direction="row" justify="between" align="center" width="100%">
          <Box direction="row" align="center">
            <img src={ploggingLogIcon} width="30px" height="30px" />
            <Text size="16px" weight={500} margin="0px 10px">
              내 플로깅 기록
            </Text>
          </Box>
          <Text size="12px" weight={500} color="#575757">
            플로깅 로그 보기
          </Text>
        </Box>
        <Box
          background={{ color: "#F0F0F0" }}
          direction="row"
          height="85px"
          width="100%"
          margin="medium"
          round="small"
          elevation="medium"
          justify="around"
          align="center"
        >
          <Box direction="column" align="center">
            <Text size="12px" margin="1px 0px" weight={500} color="#575757">
              총 횟수
            </Text>
            <Text size="14px" margin="1px 0px" weight={500} color="#00853B">
              13회
            </Text>
          </Box>
          <Box direction="column" align="center">
            <Text size="12px" margin="1px 0px" weight={500} color="#575757">
              총 거리
            </Text>
            <Text size="14px" margin="1px 0px" weight={500} color="#00853B">
              14.3Km
            </Text>
          </Box>
          <Box direction="column" align="center">
            <Text size="12px" margin="1px 0px" weight={500} color="#575757">
              총 시간
            </Text>
            <Text size="14px" margin="1px 0px" weight={500} color="#00853B">
              24:08:12
            </Text>
          </Box>
        </Box>
      </Box>

      {/* 내 도전 과제 */}
      <Box
        direction="column"
        pad="0px 30px 30px 30px"
        justify="center"
        align="center"
        width="100%"
      >
        <Box direction="row" justify="between" align="center" width="100%">
          <Box direction="row" align="center">
            <img src={ploggingQuestIcon} width="30px" height="30px" />
            <Text size="16px" weight={500} margin="0px 10px">
              내 도전 과제
            </Text>
          </Box>
          <Text size="12px" weight={500} color="#575757" onClick={() => navigate("/mypage/achievement")}>
            더 보기
          </Text>
        </Box>
        <Box
          background={{ color: "#F0F0F0" }}
          direction="row"
          height="85px"
          width="100%"
          margin="medium"
          round="small"
          elevation="medium"
          justify="around"
          align="center"
          onClick={() => navigate("/mypage/achievement")}
        >
          <Box direction="column" align="center">
            <Text size="12px" margin="1px 0px" weight={500} color="#575757">
              총 과제
            </Text>
            <Text size="14px" margin="1px 0px" weight={500} color="#00853B">
              {achievementAllCnt}개
            </Text>
          </Box>
          <Box direction="column" align="center">
            <Text size="12px" margin="1px 0px" weight={500} color="#575757">
              완료
            </Text>
            <Text size="14px" margin="1px 0px" weight={500} color="#00853B">
              {achievementSuccessCnt}개
            </Text>
          </Box>
          <Box direction="column" align="center">
            <Text size="12px" margin="1px 0px" weight={500} color="#575757">
              미완료
            </Text>
            <Text size="14px" margin="1px 0px" weight={500} color="#00853B">
              {achievementIngCnt}개
            </Text>
          </Box>
        </Box>
      </Box>

      <StyledHr />

      {/* 내 챌린지 */}
      <Box
        direction="column"
        pad="30px 30px 30px 30px"
        justify="center"
        align="center"
        width="100%"
      >
        <Box direction="row" justify="between" align="center" width="100%">
          <Box direction="row" align="center">
            <img src={ploggingChallengeIcon} width="27px" height="27px" />
            <Text size="16px" weight={500} margin="0px 10px">
              내 챌린지
            </Text>
          </Box>
          <Text size="12px" weight={500} color="#575757">
            챌린지 모두 보기
          </Text>
        </Box>
        {/* <ChallengeCard></ChallengeCard> */}
      </Box>

      {/* 내 크루 */}
      <Box
        direction="column"
        pad="0px 30px 30px 30px"
        justify="center"
        align="center"
        width="100%"
        margin={{ bottom: "50px" }}
      >
        <Box direction="row" justify="between" align="center" width="100%">
          <Box direction="row" align="center">
            <img src={ploggingCrewIcon} width="27px" height="27px" />
            <Text size="16px" weight={500} margin="0px 10px">
              내 크루
            </Text>
          </Box>
          <Text size="12px" weight={500} color="#575757">
            크루 모두 보기
          </Text>
        </Box>
        {/* <ChallengeCard></ChallengeCard> */}
      </Box>
    </Box >
  );
};
