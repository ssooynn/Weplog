import { Box, Text } from "grommet";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ProgressBar = styled.progress`
  appearance: none;
  height: 3px;

  ::-webkit-progress-bar {
    border-radius: 5px;
    background: #c1c1c1;
  }

  ::-webkit-progress-value {
    border-radius: 5px;
    background: #57ba83;
  }
`;

const WhiteBg = styled.div`
  background-color: rgba(255, 255, 255, 0.5);
  width: 100%;
  height: 100%;
  border-radius: inherit;
`;

export const ChallengeCard = ({ challenge }) => {
  const navigate = useNavigate();
  const goChallengeDetail = () => {
    navigate(`/challenge/detail/${challenge.challengeId}`);
  };
  const [typeUnit, setTypeUnit] = useState(challenge.type);
  const [goal, setGoal] = useState();
  useEffect(() => {
    if (typeUnit === "DISTANCE") {
      setGoal(Number(challenge.goal) * 0.001);
      setTypeUnit("Km");
    } else if (typeUnit === "TIME") {
      setGoal(Number(challenge.goal) / 3600);
      setTypeUnit("시간");
    } else {
      setGoal(challenge.goal);
      setTypeUnit("회");
    }
  }, [challenge]);
  if (challenge)
    return (
      <Box
        background={{ image: `url(${challenge.imageUrl})`, opacity: "strong" }}
        height="100px"
        width="100%"
        margin="10px 0px"
        round="small"
        elevation="medium"
        onClick={goChallengeDetail}
      >
        <WhiteBg>
          <Box justify="between" pad="14px 18px" height="100px">
            <Text size="14px" weight={500} color="black">
              {challenge.title}
            </Text>
            <Text size="10px" weight={400}>
              Goal - {goal} {typeUnit} 플로깅
            </Text>
            <Text size="10px" weight={400}>
              기한 - {challenge.endDate}까지
            </Text>
            <Box direction="row" width="100%" justify="between">
              <Box
                direction="row"
                justify="between"
                align="center"
                width="190px"
              >
                <ProgressBar
                  id="progress"
                  value={challenge.progressRate}
                  min="0"
                  max="100"
                ></ProgressBar>
                <Text size="10px" weight={400}>
                  {parseFloat(challenge.progressRate).toFixed(2)}%
                </Text>
              </Box>
              <Box>
                <Text size="10px" weight={500}>
                  참여인원 {challenge.participantsCnt}명
                </Text>
              </Box>
            </Box>
          </Box>
        </WhiteBg>
      </Box>
    );
};

export const ChallengeCardList = ({ ChallengeList }) => {
  return (
    <Box width="100%">
      {ChallengeList !== undefined && ChallengeList.length > 0 ? (
        ChallengeList.map((challenge, idx) => (
          <div key={idx}>
            {" "}
            <ChallengeCard challenge={challenge} />
          </div>
        ))
      ) : (
        <div>챌린지가 없습니다.</div>
      )}
    </Box>
  );
};
