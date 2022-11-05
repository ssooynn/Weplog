import { Box, Text } from "grommet";
import React from "react";
import styled from "styled-components";
import rightArrowIcon from "../../assets/icons/rightArrowIcon.svg";
import ploggingLogIcon from "../../assets/icons/ploggingLogIcon.svg";
import ploggingQuestIcon from "../../assets/icons/ploggingQuestIcon.svg";
import ploggingChallengeIcon from "../../assets/icons/ploggingChallengeIcon.svg";
import ploggingCrewIcon from "../../assets/icons/ploggingChallengeIcon.svg";
import { ChallengeCard } from "../../components/challenge/ChallengeCard";
import { useNavigate } from "react-router-dom";

const ProfileImg = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
`;

const StyledHr = styled.hr`
  background-color: #eaeaea;
  width: 100vw;
  height: 8px;
  border: none;
  margin: 0px;
`;

export const Mypage = () => {
  const navigate = useNavigate();
  const goPage = (url) => {
    navigate(`${url}`);
  };
  return (
    <Box>
      {/* 유저 정보 */}
      <Box
        direction="row"
        pad="30px 30px"
        justify="between"
        align="center"
        width="100%"
      >
        <Box direction="row" width="50%" justify="between" align="center">
          <ProfileImg src="https://picsum.photos/400/300"></ProfileImg>
          <Box direction="row" align="center" justify="between" width="50%">
            <Text size="18px" weight={500}>
              뉴진차
            </Text>
            <Text size="14px" weight="400">
              님
            </Text>
          </Box>
        </Box>
        <img
          src={rightArrowIcon}
          width="30px"
          height="30px"
          onClick={(e) => goPage("/mypage/user")}
        />
      </Box>

      <StyledHr />

      {/* 내 플로깅 기록 */}
      <Box
        direction="column"
        pad="30px 30px"
        justify="center"
        align="center"
        width="100%"
      >
        <Box direction="row" justify="between" align="center" width="100%">
          <Box direction="row" align="center">
            <img src={ploggingLogIcon} width="30px" height="30px" />
            <Text size="16px" weight={500} margin="0px 10px">
              내 플로깅 기록
            </Text>
          </Box>
          <Text size="12px" weight={500} color="#575757">
            플로깅 로그 보기
          </Text>
        </Box>
        <Box
          background={{ color: "#F0F0F0" }}
          direction="row"
          height="85px"
          width="100%"
          margin="medium"
          round="small"
          elevation="medium"
          justify="around"
          align="center"
        >
          <Box direction="column" align="center">
            <Text size="12px" margin="1px 0px" weight={500} color="#575757">
              총 횟수
            </Text>
            <Text size="14px" margin="1px 0px" weight={500} color="#00853B">
              13회
            </Text>
          </Box>
          <Box direction="column" align="center">
            <Text size="12px" margin="1px 0px" weight={500} color="#575757">
              총 거리
            </Text>
            <Text size="14px" margin="1px 0px" weight={500} color="#00853B">
              14.3Km
            </Text>
          </Box>
          <Box direction="column" align="center">
            <Text size="12px" margin="1px 0px" weight={500} color="#575757">
              총 시간
            </Text>
            <Text size="14px" margin="1px 0px" weight={500} color="#00853B">
              24:08:12
            </Text>
          </Box>
        </Box>
      </Box>

      {/* 내 도전 과제 */}
      <Box
        direction="column"
        pad="0px 30px 30px 30px"
        justify="center"
        align="center"
        width="100%"
      >
        <Box direction="row" justify="between" align="center" width="100%">
          <Box direction="row" align="center">
            <img src={ploggingQuestIcon} width="30px" height="30px" />
            <Text size="16px" weight={500} margin="0px 10px">
              내 도전 과제
            </Text>
          </Box>
          <Text size="12px" weight={500} color="#575757">
            더 보기
          </Text>
        </Box>
        <Box
          background={{ color: "#F0F0F0" }}
          direction="row"
          height="85px"
          width="100%"
          margin="medium"
          round="small"
          elevation="medium"
          justify="around"
          align="center"
        >
          <Box direction="column" align="center">
            <Text size="12px" margin="1px 0px" weight={500} color="#575757">
              총 과제
            </Text>
            <Text size="14px" margin="1px 0px" weight={500} color="#00853B">
              21개
            </Text>
          </Box>
          <Box direction="column" align="center">
            <Text size="12px" margin="1px 0px" weight={500} color="#575757">
              완료
            </Text>
            <Text size="14px" margin="1px 0px" weight={500} color="#00853B">
              12개
            </Text>
          </Box>
          <Box direction="column" align="center">
            <Text size="12px" margin="1px 0px" weight={500} color="#575757">
              미완료
            </Text>
            <Text size="14px" margin="1px 0px" weight={500} color="#00853B">
              9개
            </Text>
          </Box>
        </Box>
      </Box>

      <StyledHr />

      {/* 내 챌린지 */}
      <Box
        direction="column"
        pad="30px 30px 30px 30px"
        justify="center"
        align="center"
        width="100%"
      >
        <Box direction="row" justify="between" align="center" width="100%">
          <Box direction="row" align="center">
            <img src={ploggingChallengeIcon} width="27px" height="27px" />
            <Text size="16px" weight={500} margin="0px 10px">
              내 챌린지
            </Text>
          </Box>
          <Text size="12px" weight={500} color="#575757">
            챌린지 모두 보기
          </Text>
        </Box>
        <ChallengeCard></ChallengeCard>
      </Box>

      {/* 내 크루 */}
      <Box
        direction="column"
        pad="0px 30px 30px 30px"
        justify="center"
        align="center"
        width="100%"
        margin={{ bottom: "50px" }}
      >
        <Box direction="row" justify="between" align="center" width="100%">
          <Box direction="row" align="center">
            <img src={ploggingChallengeIcon} width="27px" height="27px" />
            <Text size="16px" weight={500} margin="0px 10px">
              내 크루
            </Text>
          </Box>
          <Text size="12px" weight={500} color="#575757">
            크루 모두 보기
          </Text>
        </Box>
        <ChallengeCard></ChallengeCard>
      </Box>
    </Box>
  );
};
