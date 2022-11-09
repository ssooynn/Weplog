import { motion } from "framer-motion";
import { Box, Text } from "grommet";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { challengeDetailApi, challengeGiveUpApi, challengeRankingApi } from "../../apis/challengeApi";
import { challengeJoinAPi } from "../../apis/memberChallengeApi";
import shareIcon from "../../assets/icons/shareIcon.svg";
import Button from "../../components/Button";
import { ChallengeRankCard } from "../../components/rank/ChallengeRankCard";
import { ChallengeRankCardList } from "../../components/rank/ChallengeRankCardList";
import { ChallengeRankTop3 } from "../../components/rank/ChallengeRankTop3";

const ProgressBar = styled.progress`
  appearance: none;
  height: 8px;
  width: 85%;

  ::-webkit-progress-bar {
    border-radius: 5px;
    background: #c1c1c1;
  }

  ::-webkit-progress-value {
    border-radius: 5px;
    background: #57ba83;
  }
`;

export const ChallengeDetail = () => {
  //challengeId
  const { challengeId } = useParams();
  const [challenge, setChallenge] = useState("");
  const [typeUnit, setTypeUnit] = useState();
  const [endDate, setEndDate] = useState([]);

  const sharePage = () => {
    window.navigator.share({
      title: `Beedly`,
      text: `히히`,
      url: window.location.href,
    });
  };

  useEffect(() => {
    loadChallengeDetail();
    loadChallengeRanking();
  }, [])

  const loadChallengeDetail = () => {
    challengeDetailApi(challengeId, (res) => {
      setChallenge(res.data);
      if (res.data.type === 'DISTANCE') {
        setTypeUnit("Km")
      } else if (res.data.type === 'TIME') {
        setTypeUnit("시간")
      } else {
        setTypeUnit("회")
      }
      setEndDate(challenge.endDate.split("-"));
      console.log(res.data);
    }, (err) => {
      console.log(err);
    })
  }

  const loadChallengeRanking = () => {
    challengeRankingApi(challengeId, (res) => {
      console.log(res);
    }, (err) => {
      console.log(err);
    })
  }
  const giveUpChallenge = () => {
    challengeGiveUpApi(challengeId, (res1) => {
      console.log(res1);
      loadChallengeDetail();
    }, (err) => {
      console.log(err);
    })
  }

  const joinChallenge = () => {
    challengeJoinAPi(challengeId, (res) => {
      console.log(res);
      loadChallengeDetail();
    }, (err) => {
      console.log(err);
    })
  }
  return (
    <motion.div>
      <div style={{ position: "relative" }}>
        {/* 챌린지 bgImage */}
        <Box
          background={{ image: `url(${challenge.imageUrl})` }}
          width="100%"
          height="280px"
        ></Box>
        {/* 챌린지 설명 box */}
        <div style={{ width: "100%", height: "120px" }}>
          <Box
            style={{
              position: "absolute",
              top: "110px",
              left: "10%",
              margin: "auto",
            }}
            background={{ color: "white" }}
            width="90%"
            height="270px"
            elevation="medium"
            pad="30px"
            justify="between"
          >
            <Box direction="row" justify="between" align="center">
              <Text size="20px" weight={500}>
                {challenge.title}
              </Text>
              <img src={shareIcon} alt="공유" width="22px" height="22px"></img>
            </Box>
            <Box>
              <Text size="12px" weight={400}>
                Goal - {challenge.goal}{typeUnit} 플로깅
              </Text>
              <Text size="12px" weight={400}>
                기한 - {endDate[0]}.{endDate[1]}.{endDate[2]} 까지
              </Text>
            </Box>
            <Box>
              <Text size="14px" weight={500}>
                현재 달성율
              </Text>
              <Box
                direction="row"
                justify="between"
                align="center"
                width="260px"
                margin="5px 0px"
              >
                <ProgressBar
                  id="progress"
                  value={challenge.progressRage}
                  min="0"
                  max="100"
                ></ProgressBar>
                <Text size="12px" weight={500}>
                  {challenge.progressRate} %
                </Text>
              </Box>
            </Box>
            <Box direction="row" justify="between" align="end">
              <Box>
                <Text size="12px" weight={400} margin="5px 0px 0px 0px">
                  참여자 총 플로깅 횟수 : {challenge.totalPloggingCnt} 회
                </Text>
                <Text size="12px" weight={400} margin="5px 0px">
                  참여자 총 플로깅 거리 : {challenge.totalDistance} Km
                </Text>
                <Text size="12px" weight={400}>
                  참여자 총 플로깅 시간 : {challenge.totalTime} 시간
                </Text>
              </Box>
              <Text size="12px" weight={500} alignSelf="end">
                참여인원 {challenge.participantsCnt}명
              </Text>
            </Box>
          </Box>
        </div>
      </div>
      {/* arr.includes(valuetoFind) */}
      {/* 내 랭크*/}
      <Box direction="column" pad="0px 8%" width="100%" margin="20px 0px">
        <Text size="16px" weight={400}>
          내 랭킹
        </Text>
        <Box width="100%" align="center">
          <ChallengeRankCard></ChallengeRankCard>
        </Box>
      </Box>

      {/* 내 랭크*/}
      <Box direction="column" pad="0px 8%" width="100%" margin="30px 0px">
        <Text size="16px" weight={400}>
          참여자 기여도 Ranking
        </Text>
        <ChallengeRankCardList></ChallengeRankCardList>
        {challenge.myChallenge ? <Button bigpinkround="true" style={{ margin: "10px 0px" }} onClick={giveUpChallenge}>
          챌린지 포기하기
        </Button> : <Button biggreenround="true" style={{ margin: "10px 0px" }} onClick={joinChallenge}>
          챌린지 참여하기
        </Button>}
      </Box>
    </motion.div>
  );
};
