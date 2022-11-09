import React from "react";
import { motion } from "framer-motion";
import { Box, Text } from "grommet";
import { ChallengeRankCard } from "../../components/rank/ChallengeRankCard";
import { ChallengeRankCardList } from "../../components/rank/ChallengeRankCardList";
import rankIcon from "../../assets/icons/rankIcon.svg";
import { useNavigate } from "react-router-dom";

export const Rank = () => {
  const navigate = useNavigate();
  return (
    <motion.div
      style={{
        background:
          "linear-gradient(307.96deg, rgba(87, 186, 131, 0.296), rgba(29, 38, 255, 0.088))",
        minHeight: "95vh",
      }}
    >
      <Box
        pad="40px 30px 20px 30px"
        direction="row"
        justify="between"
        align="center"
      >
        <Box direction="row" align="center">
          <img src={rankIcon} width="45px" height="45px" />
          <Text size="20px" weight={500} margin={{ left: "10px" }}>
            Plogger Ranking
          </Text>
        </Box>
        <Text size="10px" weight={400} color="#7E7E7E" alignSelf="end">
          *매주 일요일 자정 기준
        </Text>
      </Box>
      <Box pad="10px 30px" direction="row" justify="end" align="center">
        <Text
          size="14px"
          weight={500}
          color="#7E7E7E"
          margin={{ left: "10px" }}
        >
          일주일 거리
        </Text>
        <Text
          size="14px"
          weight={500}
          color="#00853B"
          margin={{ left: "10px" }}
        >
          일주일 시간
        </Text>
      </Box>

      <Box>
        <Box direction="column" pad="0px 8%" width="100%" margin="00px 0px">
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
        </Box>
      </Box>
    </motion.div>
  );
};
