import { Box, Text } from 'grommet'
import React, { useState } from 'react'
import { ChallengeRankCard } from './ChallengeRankCard'
import { ChallengeRankTop3 } from './ChallengeRankTop3'
import downArrowIcon from '../../assets/icons/downArrowIcon.svg'
import { useEffect } from 'react'

export const ChallengeRankCardList = (data) => {
    console.log(data);
    const memberId = localStorage.getItem("memberId");
    const rankingList = data.list;
    const [top3RankingList, setTop3RankingList] = useState([]);
    const [otherRankingList, setOtherRankingList] = useState([]);
    useEffect(() => {
        if (rankingList === undefined || rankingList.length < 3) {
            console.log(rankingList);
            setTop3RankingList([]);
            setOtherRankingList([]);
        } else if (rankingList.length === 3) {
            setTop3RankingList(rankingList);
            setOtherRankingList([]);
        } else if (rankingList.length > 4) {
            setTop3RankingList(rankingList.slice(0, 4));
            setOtherRankingList(rankingList.slice(4));
        }
    }, [rankingList])
    const rankType = data.rankType;

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
            {top3RankingList.length < 3 ? <Text size="14px" weight={500} margin={{ top: "20px" }} alignSelf="center">
                인원이 너무 적습니다.
            </Text> : <ChallengeRankTop3 type="user" top3={top3RankingList} rankType={rankType}></ChallengeRankTop3>}

            {otherRankingList.length > 0 && otherRankingList.map((user, index) => {
                if (user.memberId === memberId) {
                    data.setMyRank(user.ranking);
                    data.setMyNickname(user.nickname);
                    data.setMyProfile(user.profileImageUrl);
                    data.setMyRankValue(valueName(user))
                }
                return < ChallengeRankCard key={index} rank={user.ranking} profileImgUrl={user.profileImageUrl} nickname={user.nickname} value={valueName(user)} my={user.memberId === memberId} />
            })
            }
            {/* <img src={downArrowIcon} alt="더보기" style={{ margin: "10px 0px" }} /> */}
        </Box>
    )
}
