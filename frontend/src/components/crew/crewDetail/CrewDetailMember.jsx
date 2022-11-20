import { Box, Text } from "grommet";
import React, { useEffect } from "react";
import { ChallengeRankCard } from "../../rank/ChallengeRankCard";
import { ChallengeRankCardList } from "../../rank/ChallengeRankCardList";
import { CrewMemberProfile } from "../CrewMemberProfile";
import rankIcon from "../../../assets/icons/rankIcon.svg";
import applyIcon from "../../../assets/icons/applyIcon.svg";
import { CrewApplyCard } from "../CrewApplyCard";
import { getCrewRankingList, getCrewWaitingList } from "../../../apis/crewApi";
import { useState } from "react";

const CrewDetailMember = ({ crewData, getCrew }) => {
  const [rankType, setRankType] = useState("DISTANCE");
  const [allRankingList, setAllRankingList] = useState({});
  const [rankList, setRankList] = useState([]);
  const [myRank, setMyRank] = useState("");
  const [myRankValue, setMyRankValue] = useState("");
  const [myProfile, setMyProfile] = useState("");
  const [myNickname, setMyNickname] = useState("");
  const memberList = crewData.memberList;
  const [waitingList, setWaitingList] = useState([]);

  const getWaitingList = () => {
    getCrewWaitingList(crewData.crewId, (res) => {
      setWaitingList(res.data);
      console.log(res);
    }, (err) => {
      console.log(err);
    })

  }

  const getRankingList = () => {
    getCrewRankingList(crewData.crewId, (res) => {
      console.log(res.data);
      setAllRankingList(res.data);
    }, (err) => {
      console.log(err);
    })
  }
  useEffect(() => {
    if (crewData.isCrewMaster) {
      getWaitingList();
    }
    getRankingList();
  }, [])
  useEffect(() => {
    console.log(rankType);
    console.log(allRankingList.distanceRanking)
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
  }, [rankType, allRankingList])
  return (
    <div>
      {/* 멤버 가로프로필 */}
      <CrewMemberProfile memberList={memberList}></CrewMemberProfile>

      {/* 가입 신청 (방장만 볼 수 있음) */}
      {crewData.isCrewMaster && <Box direction="column" width="100%" margin="10px 0px">
        <Box direction="row" align="center">
          <img src={applyIcon} width="30px" height="30px" alt="캘린더" />
          <Text size="18px" weight={500} margin={{ left: "7px" }}>
            가입신청
          </Text>
        </Box>
        {waitingList !== undefined && waitingList.length > 0 && waitingList.map((waitingMember, idx) =>
          <CrewApplyCard key={idx} member={waitingMember} getCrew={getCrew} getWaitingList={getWaitingList} />)}
        {(waitingList == undefined || waitingList.length <= 0) && <Text size="14px" weight={500} margin={{ top: "20px" }} alignSelf="center">
          가입신청 내역이 없습니다.
        </Text>}
      </Box>}


      {/* Ranking */}
      <Box>

        {/* 내 랭크 */}
        <Box direction="column" width="100%" margin="20px 0px">
          <Box direction="row" justify="between" width="100%">

            <Box direction="row" align="center">
              <img src={rankIcon} width="30px" height="30px" alt="캘린더" />
              <Text size="18px" weight={500} margin={{ left: "7px" }}>
                Ranking
              </Text>

            </Box>
            <Box direction="row" justify="end" align="center">
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
          </Box>
          <Box direction="column" width="100%" margin="15px 0px">
            {rankList !== undefined && rankList.length > 3 && <Text size="15px" weight={500}>
              내 랭킹
            </Text>}

            <Box width="100%" align="center">
              {rankList !== undefined && rankList.length > 3 && <ChallengeRankCard my={true} rank={myRank} profileImgUrl={myProfile} nickname={myNickname} value={myRankValue}></ChallengeRankCard>}
            </Box>
          </Box>
          {<ChallengeRankCardList rankType={rankType} list={rankList} setMyRank={setMyRank} setMyNickname={setMyNickname} setMyProfile={setMyProfile} setMyRankValue={setMyRankValue} />}
        </Box>
      </Box>
    </div>
  );
};
export default React.memo(CrewDetailMember);
