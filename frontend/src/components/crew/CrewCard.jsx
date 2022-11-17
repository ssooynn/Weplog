import { Box, Text } from "grommet";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const StyledProfile = styled.img`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  position: absolute;
  left: ${(props) => props.left || "20px"};
  bottom: -11px;
`;

export const ProfileList = ({ members }) => {
  if (members) {
    return (
      <div style={{ position: "relative" }}>
        {members &&
          members.map((member, index) => {
            return (
              <StyledProfile
                key={index}
                src={member.profileImageUrl}
                left={`${parseInt(index * 15)}px`}
              />
            );
          })}
      </div>
    );
  } else
    return (
      <div style={{ position: "relative" }}>
        <StyledProfile
          src="https://picsum.photos/100/100?random=42"
          left="0px"
        />
        <StyledProfile
          src="https://picsum.photos/100/100?random=43"
          left="15px"
        />
        <StyledProfile
          src="https://picsum.photos/100/100?random=44"
          left="30px"
        />
        <StyledProfile
          src="https://picsum.photos/100/100?random=45"
          left="45px"
        />
      </div>
    );
};

export const CrewCard = ({ crew }) => {
  const navigate = useNavigate();
  const goPage = (crewId) => {
    navigate(`/crew/detail/${crewId}`);
  };
  if (crew)
    return (
      <Box
        background={{
          image: `url(${crew.imageUrl})`,
          opacity: "0.2",
        }}
        round="small"
        elevation="small"
        pad="18px 12px"
        width="180px"
        height="120px"
        margin="10px 4px"
        onClick={(e) => {
          goPage(crew.crewId);
        }}
      >
        <Box direction="column" width="100%" height="70px">
          <Text
            size="14x"
            weight={500}
            style={{
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "normal",
              wordBreak: "break-word",
              display: "-webkit-box",
              WebkitLineClamp: "1",
              // 원하는 라인수
              WebkitBoxOrient: "vertical",
            }}
          >
            {crew.name}
          </Text>
          <Text
            size="12px"
            style={{
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "normal",
              wordBreak: "break-word",
              display: "-webkit-box",
              WebkitLineClamp: "2",
              // 원하는 라인수
              WebkitBoxOrient: "vertical",
            }}
          >
            {crew.description}
          </Text>
        </Box>
        <Box direction="row" justify="between" align="center">
          {crew.memberList && <ProfileList members={crew.memberList} />}
          <Text size="12px" weight={500}>
            {`${crew.participantCnt} / ${crew.maxParticipantCnt}`}
          </Text>
        </Box>
      </Box>
    );
  else
    return (
      <Box
        background={{
          image: `url(https://picsum.photos/200/120?random=41)`,
          opacity: "0.4",
        }}
        round="small"
        elevation="small"
        pad="18px 12px"
        width="180px"
        height="120px"
        margin="10px 4px"
        onClick={(e) => {
          goPage(undefined);
        }}
      >
        <Box direction="column" width="100%" height="70px">
          <Text size="14x" weight={500}>
            싸피 최강 비들리
          </Text>
          <Text size="12px">클랜에 관한 설명</Text>
        </Box>
        <Box direction="row" justify="between" align="center">
          <ProfileList />
          <Text size="12px" weight={500}>
            18 / 30
          </Text>
        </Box>
      </Box>
    );
};
