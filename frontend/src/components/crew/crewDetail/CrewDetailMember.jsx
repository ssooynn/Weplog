import { Box, Text } from 'grommet'
import React from 'react'
import { ChallengeRankCard } from '../../rank/ChallengeRankCard'
import { ChallengeRankCardList } from '../../rank/ChallengeRankCardList'
import { CrewMemberProfile } from '../CrewMemberProfile'
import rankIcon from '../../../assets/icons/rankIcon.svg';
import applyIcon from '../../../assets/icons/applyIcon.svg';
import { CrewApplyCard } from '../CrewApplyCard'


export const CrewDetailMember = () => {
    return (
        <div>
            {/* 멤버 가로프로필 */}
            <CrewMemberProfile></CrewMemberProfile>

            {/* 가입 신청 */}
            <Box direction="column" width="100%" margin="10px 0px">
                <Box direction='row' align='center'>
                    <img src={applyIcon} width='30px' height='30px' alt='캘린더' />
                    <Text size="18px" weight="500" margin={{ left: '7px' }}>
                        가입신청
                    </Text>
                </Box>
                <CrewApplyCard></CrewApplyCard>
                <CrewApplyCard></CrewApplyCard>
                <CrewApplyCard></CrewApplyCard>

            </Box>


            {/* Ranking */}
            <Box>
                <Box direction="column" width="100%" margin="15px 0px">
                    <Text size="15px" weight="500">
                        내 랭킹
                    </Text>
                    <Box width="100%" align="center">
                        <ChallengeRankCard></ChallengeRankCard>
                    </Box>
                </Box>

                {/* 내 랭크*/}
                <Box direction="column" width="100%" margin="30px 0px">
                    <Box direction='row' align='center'>
                        <img src={rankIcon} width='30px' height='30px' alt='캘린더' />
                        <Text size="18px" weight="500" margin={{ left: '7px' }}>
                            Ranking
                        </Text>
                    </Box>
                    <ChallengeRankCardList></ChallengeRankCardList>
                </Box>
            </Box>
        </div>
    )
}
