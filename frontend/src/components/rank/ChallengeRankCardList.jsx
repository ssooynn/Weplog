import { Box } from 'grommet'
import React from 'react'
import { ChallengeRankCard } from './ChallengeRankCard'
import { ChallengeRankTop3 } from './ChallengeRankTop3'
import downArrowIcon from '../../assets/icons/downArrowIcon.svg'
import { useSelector } from 'react-redux'

export const ChallengeRankCardList = (data) => {
    const memberId = localStorage.getItem("memberId");
    const rankingList = data.list;
    if (data.list === undefined || data.list.length < 3) {
        return <Box>인원이 너무 적습니다.</Box>
    }
    const top3RankingList = data.list.slice(0, 4);
    const otherRankingList = data.list.slice(4);
    const rankType = data.rankType;
    console.log(rankingList);

    const valueName = (user) => {
        switch (rankType) {
            case "DISTANCE":
                return user.totalDistance + " Km";

            case "PLOGGING_CNT":
                return user.totalCnt + " 회";

            case "TIME":
                return user.totalTime;

            default:
                return undefined;
        }
    }
    return (
        <Box width="100%" align='center'>
            <ChallengeRankTop3 type="user" top3={top3RankingList} rankType={rankType}></ChallengeRankTop3>
            {otherRankingList.map((user, index) => {
                if (user.memberId === memberId) {
                    data.setMyRank(user.ranking);
                    data.setMyNickname(user.nickname);
                    data.setMyProfile(user.profileImageUrl);
                    data.setMyRankValue(valueName(user))
                }
                return < ChallengeRankCard key={index} rank={user.ranking} profileImgUrl={user.profileImageUrl} nickname={user.nickname} value={valueName(user)} my={user.memberId === memberId} />
            })
            }
            <img src={downArrowIcon} alt="더보기" style={{ margin: "10px 0px" }} />
        </Box>
    )
}
