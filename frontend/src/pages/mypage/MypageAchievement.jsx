import { Box, Text } from "grommet";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { myAchievementApi } from "../../apis/achievementApi";
import leftArrowIcon from "../../assets/icons/leftArrowIcon.svg";

export const MypageAchievement = () => {
  const [achievementList, setAchievementList] = useState([]);
  useEffect(() => {
    myAchievementApi(
      (res) => {
        setAchievementList(res.data);
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  const navigate = useNavigate();

  return (
    <Box
      direction="column"
      height="auto"
      justify="start"
      style={{ minHeight: "700px" }}
    >
      {/* 제목 Header */}
      <Box
        direction="row"
        pad="18px"
        width="100%"
        height="60px"
        justify="between"
        align="center"
        border={{
          color: "#EAEAEA",
          size: "2px",
          styled: "solid",
          side: "bottom",
        }}
      >
        <img
          src={leftArrowIcon}
          width="30px"
          height="30px"
          onClick={(e) => navigate(-1)}
        />
        <Text size="16px" weight={500} style={{ alignSelf: "end" }}>
          {" "}
          내 도전 과제
        </Text>
        <Box width="30px"></Box>
      </Box>
      <Box direction="column" width="100%">
        {achievementList !== undefined &&
          achievementList.length > 0 &&
          achievementList.map((achievement, idx) => (
            <Box
              key={idx}
              pad="10px 18px"
              direction="row"
              justify="between"
              align="center"
              width="100%"
              height="80px"
              border={{
                color: "#f0f0f0",
                size: "2px",
                style: "solid",
                side: "bottom",
              }}
            >
              <Box
                direction="column"
                width="25%"
                justify="center"
                align="center"
                margin="5px 0px"
              >
                <img
                  src={achievement.imageUrl}
                  width="40px"
                  height="40px"
                  onClick={(e) => navigate(-1)}
                />
                <Text
                  size="12px"
                  color={achievement.completeFlag ? "black" : "#AEAEAE"}
                >
                  {achievement.level}
                </Text>
              </Box>
              <Box
                direction="column"
                width="70%"
                justify="evenly"
                align="start"
                height="100%"
              >
                <Text
                  size="16px"
                  color={achievement.completeFlag ? "black" : "#AEAEAE"}
                >
                  그룹플로거
                </Text>
                <Text
                  size="12px"
                  color={achievement.completeFlag ? "black" : "#AEAEAE"}
                >
                  {achievement.name}
                </Text>
              </Box>
            </Box>
          ))}
      </Box>
    </Box>
  );
};
