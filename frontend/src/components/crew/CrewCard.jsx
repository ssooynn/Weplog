import { Box, Text } from 'grommet'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const StyledProfile = styled.img`
    width: 25px;
    height: 25px;
    border-radius: 50%;
    position: absolute;
    left: ${(props) => props.left || '20px'};
    bottom:-11px;
`

const ProfileList = (data) => {
    return (
        <div style={{ position: 'relative' }}>
            <StyledProfile src='https://picsum.photos/100/100?random=42' left='0px' />
            <StyledProfile src='https://picsum.photos/100/100?random=43' left='15px' />
            <StyledProfile src='https://picsum.photos/100/100?random=44' left='30px' />
            <StyledProfile src='https://picsum.photos/100/100?random=45' left='45px' />
        </div>
    )
}

export const CrewCard = (data) => {
    const navigate = useNavigate();
    const goPage = (clanId) => {

    }
    return (
        <Box background={{ image: `url(https://picsum.photos/200/120?random=41)`, opacity: "0.1" }} round='small' elevation='small' pad='18px 12px' justify='column' width='180px' height='120px' margin='10px 4px'
            onClick={(e) => { goPage(data.clanId) }}>
            <Box direction='column' width='100%' height='70px'>
                <Text size='14x' weight='500' >싸피 최강 비들리</Text>
                <Text size='12px'>클랜에 관한 설명</Text>
            </Box>
            <Box direction='row' justify='between' align='center'>
                <ProfileList />
                <Text size='12px' weight='500'>18 / 30</Text>
            </Box>
        </Box>
    )
}
