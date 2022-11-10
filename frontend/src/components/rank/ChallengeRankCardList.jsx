import { Box } from 'grommet'
import React from 'react'
import { ChallengeRankCard } from './ChallengeRankCard'
import { ChallengeRankTop3 } from './ChallengeRankTop3'
import downArrowIcon from '../../assets/icons/downArrowIcon.svg'

export const ChallengeRankCardList = (data) => {
    const rankingList = data.list;
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
            <ChallengeRankTop3 type={"user"} top3={top3RankingList} rankType={rankType}></ChallengeRankTop3>
            {otherRankingList.map((user, index) => <ChallengeRankCard key={index} rank={user.ranking} profileImgUrl={user.profileImageUrl} nickname={user.nickname} value={valueName(user)}></ChallengeRankCard>)}
            <img src={downArrowIcon} alt="더보기" style={{ margin: "10px 0px" }} />
        </Box>
    )
}
