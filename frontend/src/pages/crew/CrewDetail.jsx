import { Box, Text } from 'grommet'
import React from 'react'
import styled from 'styled-components';
import shareIcon from '../../assets/icons/shareIcon.svg';


const StyledProfile = styled.img`
    width: 35px;
    height: 35px;
    border-radius: 50%;
    position: absolute;
    left: ${(props) => props.left || '20px'};
    bottom:-18px;
`

const ProfileList = (data) => {
    return (
        <div style={{ position: 'relative' }}>
            <StyledProfile src='https://picsum.photos/100/100?random=42' left='-90px' />
            <StyledProfile src='https://picsum.photos/100/100?random=43' left='-70px' />
            <StyledProfile src='https://picsum.photos/100/100?random=44' left='-50px' />
            <StyledProfile src='https://picsum.photos/100/100?random=45' left='-30px' />
        </div>
    )
}

export const CrewDetail = () => {
    return (
        <div style={{ position: 'relative', width: '100%' }}>
            <img src='https://picsum.photos/400/250?random=46' width='100%' height='250px' alt='크루배경' style={{ position: 'absolute' }} />
            <Box style={{ position: 'absolute', minHeight: '150px', top: '200px' }} width='100%' background={{ color: 'white' }} round='10px' pad='35px 30px'>
                <Box direction='row' justify='between' align='center'>
                    <Text size='20px' weight='500'>싸피 7기 최강 Beedly</Text>
                    <img src={shareIcon} width='20px' height='20px' alt='공유' />
                </Box>
                <Text size='12px' weight='500' margin='10px 0px 30px 0px'>크루에 대한 설명입니다.</Text>
                <Box direction='row' justify='between' align='center'>
                    <Box direction='column'>
                        <Text size='12px' weight='500'>총 플로깅 횟수 : 13회</Text>
                        <Text size='12px' weight='500'>총 플로깅 거리 : 4.5Km</Text>
                    </Box>
                    <ProfileList></ProfileList>
                </Box>
            </Box>
        </div >
    )
}
