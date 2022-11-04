import { Box, Text } from 'grommet'
import React from 'react'
import styled from 'styled-components';
import shareIcon from '../../assets/icons/shareIcon.svg';
import { CrewDetailWeplog } from '../../components/crew/crewDetail/CrewDetailWeplog.jsx';
import { CrewDetailMember } from '../../components/crew/crewDetail/CrewDetailMember.jsx';
import { CrewDetailOurFeed } from '../../components/crew/crewDetail/CrewDetailOurFeed.jsx';
import { CrewDetailTalk } from '../../components/crew/crewDetail/CrewDetailTalk.jsx';
import { useParams } from 'react-router-dom';
import { useState } from 'react';


const StyledProfile = styled.img`
    width: 28px;
    height: 28px;
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
    const { clanId } = useParams();
    const [clicked, setClicked] = useState(0);
    const clickedStyle = { color: '#00853B', textDecoration: 'underline', textUnderlinePosition: 'under', textDecorationThickness: "2px" };

    const sharePage = () => {
        window.navigator.share({
            title: `Beedly`,
            text: `히히`,
            url: window.location.href,
        });
    };
    return (
        <div style={{ width: '100%' }}>
            <Box style={{ position: 'relative', width: '100%' }} height='250px'>
                <img src='https://picsum.photos/400/250?random=46' width='100%' height='250px' alt='크루배경' style={{ position: 'absolute', objectFit: 'cover' }} />
                <Box style={{ position: 'absolute', bottom: '0px' }} width='100%' background={{ color: 'white' }} round='10px 10px 0px 0px' height='20px'></Box>
            </Box>
            <Box background={{ color: 'white' }} pad='15px 30px 35px 30px'>
                <Box direction='row' justify='between' align='center'>
                    <Text size='20px' weight='500'>싸피 7기 최강 Beedly</Text>
                    <img src={shareIcon} width='20px' height='20px' alt='공유' onClick={sharePage} />
                </Box>
                <Text size='12px' weight='500' margin='10px 0px 30px 0px'>크루에 대한 설명입니다.</Text>
                <Box direction='row' justify='between' align='center'>
                    <Box direction='column'>
                        <Text size='12px' weight='500'>총 플로깅 횟수 : 13회</Text>
                        <Text size='12px' weight='500'>총 플로깅 거리 : 4.5Km</Text>
                    </Box>
                    <ProfileList></ProfileList>
                </Box>
                <Box direction='row' margin='20px 0px' justify='between' width='250px'>
                    <Text size='14px' weight='500' color='#AEAEAE' style={clicked === 0 ? clickedStyle : {}} onClick={() => setClicked(0)}>Weplog </Text>
                    <Text size='14px' weight='400' color='#AEAEAE' style={clicked === 1 ? clickedStyle : {}} onClick={() => setClicked(1)}>TALK</Text>
                    <Text size='14px' weight='400' color='#AEAEAE' style={clicked === 2 ? clickedStyle : {}} onClick={() => setClicked(2)}>Our Feed</Text>
                    <Text size='14px' weight='400' color='#AEAEAE' style={clicked === 3 ? clickedStyle : {}} onClick={() => setClicked(3)}>Member</Text>
                </Box>
                <Box direction='column'>
                    {clicked === 0 && <CrewDetailWeplog />}
                    {clicked === 1 && <CrewDetailTalk />}
                    {clicked === 2 && <CrewDetailOurFeed />}
                    {clicked === 3 && <CrewDetailMember />}
                </Box>
            </Box>
        </div >
    )
}
