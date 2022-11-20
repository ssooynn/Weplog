import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Box, Text } from "grommet";
import { ChallengeRankCard } from "../../components/rank/ChallengeRankCard";
import { ChallengeRankCardList } from "../../components/rank/ChallengeRankCardList";
import rankIcon from "../../assets/icons/rankIcon.svg";
import { useNavigate } from "react-router-dom";
import { rankApi } from "../../apis/rankingApi";
import { useSelector } from "react-redux";

export const Rank = () => {
  const navigate = useNavigate();
  const [rankType, setRankType] = useState("");
  const [allRankingList, setAllRankingList] = useState({});
  const [rankList, setRankList] = useState([]);
  const [myRank, setMyRank] = useState("");
  const [myRankValue, setMyRankValue] = useState("");
  const [myProfile, setMyProfile] = useState("");
  const [myNickname, setMyNickname] = useState("");
  useEffect(() => {
    rankApi(
      (res) => {
        console.log(res);
        setAllRankingList(res.data);
        setRankType("DISTANCE");
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);
  useEffect(() => {
    switch (rankType) {
      case "DISTANCE":
        setRankList(allRankingList.distanceRanking);
        break;

      case "TIME":
        setRankList(allRankingList.timeRanking);
        break;

      case "PLOGGING_CNT":
        setRankList(allRankingList.cntRanking);
        break;

      default:
        break;
    }
  }, [rankType]);
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
        <Box direction="row" align="center" width="100%">
          <img src={rankIcon} width="45px" height="45px" />
          <Text size="20px" weight={500} margin={{ left: "10px" }}>
            Plogger Ranking
          </Text>
        </Box>
        {/* <Text size="10px" weight={400} color="#7E7E7E" alignSelf="end">
          *매주 일요일 자정 기준
        </Text> */}
      </Box>
      <Box pad="10px 30px" direction="row" justify="end" align="center">
        <Text
          size="14px"
          weight={500}
          style={{
            color: `${rankType === "DISTANCE" ? "#00853B" : "#7E7E7E"}`,
          }}
          margin={{ left: "10px" }}
          onClick={(e) => setRankType("DISTANCE")}
        >
          거리
        </Text>
        <Text
          size="14px"
          weight={500}
          style={{
            color: `${rankType === "TIME" ? "#00853B" : "#7E7E7E"}`,
          }}
          margin={{ left: "10px" }}
          onClick={(e) => setRankType("TIME")}
        >
          시간
        </Text>
        <Text
          size="14px"
          weight={500}
          style={{
            color: `${rankType === "PLOGGING_CNT" ? "#00853B" : "#7E7E7E"}`,
          }}
          margin={{ left: "10px" }}
          onClick={(e) => setRankType("PLOGGING_CNT")}
        >
          횟수
        </Text>
      </Box>

      <Box>
        <Box direction="column" pad="0px 8%" width="100%" margin="00px 0px">
          <Text size="16px" weight={400}>
            내 랭킹
          </Text>
          <Box width="100%" align="center">
            <ChallengeRankCard
              my={true}
              rank={myRank}
              profileImgUrl={myProfile}
              nickname={myNickname}
              value={myRankValue}
            ></ChallengeRankCard>
          </Box>
        </Box>
        {/* 내 랭크*/}
        <Box direction="column" pad="50px 8%" width="100%" margin="30px 0px">
          <Text size="16px" weight={400}>
            참여자 기여도 Ranking
          </Text>
          {rankList !== undefined && rankList.length > 0 && (
            <ChallengeRankCardList
              rankType={rankType}
              list={rankList}
              setMyRank={setMyRank}
              setMyNickname={setMyNickname}
              setMyProfile={setMyProfile}
              setMyRankValue={setMyRankValue}
            />
          )}
        </Box>
      </Box>
    </motion.div>
  );
};
