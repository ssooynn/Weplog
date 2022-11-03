import React from "react";
import { CrewCard } from "../../components/crew/CrewCard";
import crewBanner from "../../assets/images/crewBanner.jpg";
import { motion } from "framer-motion";
import { Box, Text } from "grommet";
import { CrewScollableCardList } from "../../components/crew/CrewScollableCardList";
import { ChallengeRankTop3 } from "../../components/rank/ChallengeRankTop3";


export const Crew = () => {
  return (
    <motion.div>
      <div style={{ position: 'relative', width: '100%', height: '260px' }}>
        <img src={crewBanner} height='260px' width='100%' style={{ position: 'absolute', objectFit: 'cover' }}></img>
        <Box background={{ color: 'rgba(0,0,0,0.2)' }} style={{ position: 'absolute' }} width='100%' height='100%'></Box>
        <Text size='26px' weight='500' color='white' style={{ position: 'absolute', top: '160px', left: '20px' }}>친구들과 함께하는</Text>
        <Box direction="row" style={{ position: 'absolute', top: '200px', left: '20px' }} align='center'>
          <Text size='26px' weight='500' color='white'>지구 지키기</Text>
          <Text size='32px' weight='600' color='white' margin='0px 10px'>Crew</Text>
        </Box>
      </div>
      {/* 내 크루 */}
      <Box pad='medium' width='100%'>
        <Text size='18px' weight='500' margin='20px 10px 0px 10px'>내 크루</Text>
        <CrewScollableCardList></CrewScollableCardList>
      </Box>

      {/* 지금 내 위치가 주 활동 지역인 근처 크루 */}
      <Box pad='medium' width='100%'>
        <Text size='18px' weight='500' margin='20px 10px 0px 10px'>지금 내 근처 크루</Text>
        <CrewScollableCardList></CrewScollableCardList>
      </Box>

      {/* Top3 */}
      <Box pad='medium' width='100%'>
        <Box direction='row' justify="between" align="center">
          <Text size='18px' weight='500' margin='20px 10px 30px 10px'>크루 Top3</Text>
          <Box direction="row" justify="between" width="90px">
            <Text weight="400" size="12px" color="#57BA83">
              총 횟수
            </Text>
            <Text weight="400" size="12px" color="#AEAEAE">
              |
            </Text>
            <Text weight="400" size="12px" color="#AEAEAE">
              총 거리
            </Text>
          </Box>
        </Box>
        <ChallengeRankTop3 />
      </Box>
    </motion.div>
  )
};
