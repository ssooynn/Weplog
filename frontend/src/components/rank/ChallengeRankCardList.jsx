import { Box } from 'grommet'
import React from 'react'
import { ChallengeRankCard } from './ChallengeRankCard'
import { ChallengeRankTop3 } from './ChallengeRankTop3'
import downArrowIcon from '../../assets/icons/downArrowIcon.svg'

export const ChallengeRankCardList = () => {
    return (
        <Box width="100%" align='center'>
            <ChallengeRankTop3></ChallengeRankTop3>
            <ChallengeRankCard white='true'></ChallengeRankCard>
            <ChallengeRankCard></ChallengeRankCard>
            <ChallengeRankCard></ChallengeRankCard>
            <ChallengeRankCard></ChallengeRankCard>
            <ChallengeRankCard></ChallengeRankCard>
            <img src={downArrowIcon} alt="더보기" style={{ margin: "10px 0px" }} />
        </Box>
    )
}
