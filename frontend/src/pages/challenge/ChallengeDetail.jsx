import { motion } from 'framer-motion';
import { Box, Text } from 'grommet';
import React from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components';
import shareIcon from '../../assets/icons/shareIcon.svg';
import Button from '../../components/Button';
import { ChallengeRankCard } from '../../components/rank/ChallengeRankCard';
import { ChallengeRankCardList } from '../../components/rank/ChallengeRankCardList';
import { ChallengeRankTop3 } from '../../components/rank/ChallengeRankTop3';

const ProgressBar = styled.progress`
  appearance: none;
  height: 8px;
  width:85%;

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

  const sharePage = () => {
    window.navigator.share({
      title: `Beedly`,
      text: `히히`,
      url: window.location.href,
    });
  };
  return (
    <motion.div>
      <div style={{ position: "relative" }}>
        {/* 챌린지 bgImage */}
        <Box background={{ image: `url(https://picsum.photos/400/300)` }} width="100%" height="280px"></Box>
        {/* 챌린지 설명 box */}
        <div style={{ width: "100%", height: "120px" }}>
          <Box style={{ position: "absolute", top: "110px", left: "10%", margin: "auto" }} background={{ color: "white" }} width="90%" height="250px" elevation="medium" pad="30px" justify='between'>
            <Box direction='row' justify='between' align='center'>
              <Text size="20px" weight="500">오늘도 지구와 함께</Text>
              <img src={shareIcon} alt="공유" width="22px" height="22px" onClick={sharePage}></img>
            </Box>
            <Box>
              <Text size="12px" weight="400">Goal - 10Km 플로깅</Text>
              <Text size="12px" weight="400">기한 - 2022.12.25일 12시까지</Text>
            </Box>
            <Box>
              <Text size="14px" weight="500">현재 달성율</Text>
              <Box direction="row" justify="between" align="center" width="260px" margin="5px 0px">
                <ProgressBar id="progress" value="75" min="0" max="100"></ProgressBar>
                <Text size="12px" weight="500">
                  75%
                </Text>
              </Box>
            </Box>
            <Box direction='row' justify='between' align='end'>
              <Box>
                <Text size="12px" weight="400" margin="5px 0px">참여자 총 플로깅 횟수 : 13회</Text>
                <Text size="12px" weight="400">참여자 총 플로깅 거리 : 4.5Km</Text>
              </Box>
              <Text size="12px" weight="500" alignSelf='end'>참여인원 15명</Text>
            </Box>
          </Box>
        </div>
      </div>
      {/* arr.includes(valuetoFind) */}
      {/* 내 랭크*/}
      <Box direction='column' pad="0px 8%" width="100%" margin="20px 0px">
        <Text size="16px" weight="400">내 랭킹</Text>
        <Box width="100%" align='center'>
          <ChallengeRankCard></ChallengeRankCard>
        </Box>
      </Box>

      {/* 내 랭크*/}
      <Box direction='column' pad="0px 8%" width="100%" margin="30px 0px">
        <Text size="16px" weight="400">참여자 기여도 Ranking</Text>
        <ChallengeRankCardList></ChallengeRankCardList>
        <Button biggreenround style={{ margin: "10px 0px" }}>챌린지 참여하기</Button>
      </Box>
    </motion.div>
  )
}
