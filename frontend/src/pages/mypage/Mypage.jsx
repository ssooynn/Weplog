import { Box, Text } from "grommet";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import rightArrowIcon from "../../assets/icons/rightArrowIcon.svg";
import ploggingLogIcon from "../../assets/icons/ploggingLogIcon.png";
import ploggingQuestIcon from "../../assets/icons/ploggingQuestIcon.png";
import ploggingChallengeIcon from "../../assets/icons/ploggingChallengeIcon.png";
import ploggingCrewIcon from "../../assets/icons/ploggingCrewIcon.png";
import {
  ChallengeCard,
  ChallengeCardList,
} from "../../components/challenge/ChallengeCard";
import { useNavigate } from "react-router-dom";
import { myAchievementApi } from "../../apis/achievementApi";
import { myPageInfoApi, myPageProfileApi } from "../../apis/mypageApi";
import { m } from "framer-motion";
import { challengeIngListAPi } from "../../apis/memberChallengeApi";
import { getMyCrewList } from "../../apis/crewApi";
import { CrewCard } from "../../components/crew/CrewCard";

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
  const [ploggingCnt, setPloggingCnt] = useState(0);
  const [distance, setDistance] = useState(0);
  const [time, setTime] = useState(0);
  const [challengeList, setChallengeList] = useState([]);
  const [crewList, setCrewList] = useState([]);

  const navigate = useNavigate();
  const goPage = (url) => {
    navigate(`${url}`);
  };

  const getPloggingLogs = () => {
    console.log("2");
  };

  const getAchievement = () => {
    myAchievementApi(
      (res) => {
        setAchievementAllCnt(res.data.length);
        let success = 0;
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].completeFlag === true) {
            success++;
          }
        }
        setAchievementSuccessCnt(success);
        setAchievementIngCnt(res.data.length - success);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  const getProfile = () => {
    myPageProfileApi(
      (res) => {
        console.log(res);
        setProfile(res.data.profileImageUrl);
        setName(res.data.name);
        setNickname(res.data.nickname);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  const getInfo = () => {
    myPageInfoApi(
      (res) => {
        setPloggingCnt(res.data.ploggingCnt);
        setTime(secChangeTime(res.data.time));
        setDistance(res.data.distance);
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  const getMyChallengeList = () => {
    challengeIngListAPi(
      (res) => {
        setChallengeList(res.data);
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  const getCrewList = () => {
    getMyCrewList(
      (res) => {
        setCrewList(res.data);
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  };

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
  };

  useEffect(() => {
    getAchievement();
    getProfile();
    getInfo();
    getMyChallengeList();
    getCrewList();
  }, []);
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
        <Box direction="row" width="80%" justify="start" align="center">
          <ProfileImg src={`${profile}`}></ProfileImg>
          <Box
            direction="row"
            align="center"
            justify="between"
            style={{ minWidth: "60px" }}
            margin={{ left: "15px" }}
          >
            <Text size="18px" weight={500} margin={{ right: "8px" }}>
              {nickname}
            </Text>
            <Text size="14px" weight={400}>
              님
            </Text>
          </Box>
        </Box>
        <img
          alt="더보기"
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
            <img
              alt="플로깅"
              src={ploggingLogIcon}
              width="30px"
              height="30px"
            />
            <Text size="16px" weight={500} margin="0px 10px">
              내 플로깅 기록
            </Text>
          </Box>
          <Text
            size="12px"
            weight={500}
            color="#575757"
            onClick={() => navigate("/mypage/plogging")}
          >
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
              {ploggingCnt} 회
            </Text>
          </Box>
          <Box direction="column" align="center">
            <Text size="12px" margin="1px 0px" weight={500} color="#575757">
              총 거리
            </Text>
            <Text size="14px" margin="1px 0px" weight={500} color="#00853B">
              {distance} Km
            </Text>
          </Box>
          <Box direction="column" align="center">
            <Text size="12px" margin="1px 0px" weight={500} color="#575757">
              총 시간
            </Text>
            <Text size="14px" margin="1px 0px" weight={500} color="#00853B">
              {time}
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
            <img
              alt="도전과제"
              src={ploggingQuestIcon}
              width="30px"
              height="30px"
            />
            <Text size="16px" weight={500} margin="0px 10px">
              내 도전 과제
            </Text>
          </Box>
          <Text
            size="12px"
            weight={500}
            color="#575757"
            onClick={() => navigate("/mypage/achievement")}
          >
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
              {achievementAllCnt} 개
            </Text>
          </Box>
          <Box direction="column" align="center">
            <Text size="12px" margin="1px 0px" weight={500} color="#575757">
              완료
            </Text>
            <Text size="14px" margin="1px 0px" weight={500} color="#00853B">
              {achievementSuccessCnt} 개
            </Text>
          </Box>
          <Box direction="column" align="center">
            <Text size="12px" margin="1px 0px" weight={500} color="#575757">
              미완료
            </Text>
            <Text size="14px" margin="1px 0px" weight={500} color="#00853B">
              {achievementIngCnt} 개
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
            <img
              alt="챌린지"
              src={ploggingChallengeIcon}
              width="27px"
              height="27px"
            />
            <Text size="16px" weight={500} margin="0px 10px">
              내 챌린지
            </Text>
          </Box>
          <Text
            size="12px"
            weight={500}
            color="#575757"
            onClick={() => navigate("/mypage/challenge")}
          >
            챌린지 모두 보기
          </Text>
        </Box>
        {challengeList !== undefined && challengeList.length > 0 && (
          <ChallengeCardList ChallengeList={challengeList}></ChallengeCardList>
        )}
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
            <img alt="크루" src={ploggingCrewIcon} width="27px" height="27px" />
            <Text size="16px" weight={500} margin="0px 10px">
              내 크루
            </Text>
          </Box>
        </Box>

        <Box
          direction="row"
          wrap={true}
          justify="start"
          margin={{ left: "4px" }}
          width="100%"
        >
          {crewList.map((crew, index) => (
            <Box direction="row" justify="between" key={index} width="50%">
              <CrewCard crew={crew}></CrewCard>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
