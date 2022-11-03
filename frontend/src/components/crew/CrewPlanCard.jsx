
import { Box, Text } from "grommet";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { StyledProfile } from "../common/ProfileImg";

export const CrewPlanCard = (data) => {
    console.log(data.bgimage);
    const navigate = useNavigate();
    const goChallengeDetail = () => {
        navigate(`/challenge/detail/${data.challengeId}`);
    }
    return (
        <Box background={{ image: `url(${data.bgimage})`, opacity: "strong" }} height="100px" width="100%" margin='10px 0px' round="small" elevation="medium" onClick={goChallengeDetail}>
            <Box justify="around" pad="14px 18px" height="100px">
                <Box direction='row' justify="between">
                    <Text size="12px" weight="500" color="black">
                        2022.11.18
                    </Text>
                    <Text size="12px" weight="400" color="black">
                        역삼역 3번 출구
                    </Text>
                </Box>
                <Box direction='row' justify="between" align="center">
                    <Text size="15px" weight="500" color="black">
                        주말 플로깅 GO?
                    </Text>
                    <Box direction="row" align="center">
                        <StyledProfile height='25px' width='25px' src='https://picsum.photos/100/100?random=48' />
                        <Text size="12px" weight='400' color="black">
                            댕댕
                        </Text>
                    </Box>
                </Box>
            </Box>
        </Box >
    );
}
