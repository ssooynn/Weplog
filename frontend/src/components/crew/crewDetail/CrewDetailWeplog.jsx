import React from 'react'
import { motion } from "framer-motion";
import { Box, Text } from 'grommet';
import planIcon from '../../../assets/icons/planIcon.png';
import { CrewCalender } from '../CrewCalender';
import { CrewPlanCard } from '../CrewPlanCard';
import { useNavigate } from "react-router-dom";
import { PloggingButtonCrew } from "../../common/Buttons.jsx"

export const CrewDetailWeplog = () => {
    const navigate = useNavigate();
    return (
        <motion.div>
            <Box>
                <Box direction='row' align='center' height='auto'>
                    <img src={planIcon} width='25px' height='25px' alt='캘린더' />
                    <Text size='18px' weight='500' margin={{ left: '7px' }}>Weplog</Text>
                </Box>

                {/* 캘린더 */}
                <CrewCalender></CrewCalender>

                <Box direction='row' align='center' height='auto' justify='between'>
                    <Text size='15px' weight='500' margin={{ left: '7px', bottom: '10px' }}>Plogging Plan</Text>
                    <Text size='12px' color='#00853b' weight='500' margin={{ left: '7px', bottom: '10px' }}>플로깅 일정 등록하기</Text>

                </Box>

                <CrewPlanCard />
                <CrewPlanCard />
                <CrewPlanCard />
                <Box
                    width="100%"
                    align="center"
                >
                    <PloggingButtonCrew
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                            navigate("/plogging");
                        }}
                    >
                        Plogging!
                    </PloggingButtonCrew>
                </Box>
            </Box>
        </motion.div>
    )
}
