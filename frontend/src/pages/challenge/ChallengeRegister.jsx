import { motion } from "framer-motion";
import { Box, Grid, Text } from "grommet";
import React, { useState } from "react";
import plus from "../../assets/icons/plusIcon.svg";
import gallery from "../../assets/icons/galleryIcon.svg";
import { StyledInput } from "../../components/common/TextInput";
import Button from "../../components/Button";

export const ChallengeRegister = () => {
  const [profile, setProfile] = useState("");
  const [image, setImage] = useState("");
  const WantUpdateProfile = (e) => {
    let file = e.target.files[0];
    let fileURL;
    let reader = new FileReader();
    reader.onload = () => {
      fileURL = reader.result;
      setProfile(fileURL);
    };
    reader.readAsDataURL(file);
    setImage(file);
  };

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [goal, setGoal] = useState("");
  const [endDate, setEndDate] = useState("");

  const changeType = (str) => {
    console.log(str);
    setType(str);
  };
  return (
    <motion.div style={{ minHeight: "88vh" }}>
      {/* 커버 사진 설정 */}
      <Box justify="center" align="center">
        {profile === "" ? (
          <label htmlFor="image" style={{ width: "100%" }}>
            <Box
              height="250px"
              width="100%"
              background={{ color: "rgb(206,206,206)" }}
              justify="center"
              align="center"
            >
              <Text size="14px" weight={500} color="#565656" margin="10px">
                커버 사진 등록하기
              </Text>
              <img src={plus} width="20px" height="20px" alt="프로필 편집" />
              <input
                id="image"
                type="file"
                accept="image/jpg,image/png,image/jpeg,image/gif"
                onChange={(e) => WantUpdateProfile(e)}
                style={{
                  display: "none",
                }}
              />
            </Box>
          </label>
        ) : (
          <Box height="280px" width="100%" justify="center" align="center">
            <img
              src={profile}
              height="250px"
              width="100%"
              alt="커버 사진"
              style={{ objectFit: "cover" }}
            />
            <label htmlFor="image" style={{ alignSelf: "start" }}>
              <Text size="14px" weight={500} color="#565656" margin="10px">
                커버 사진 수정하기
              </Text>
              <img src={gallery} width="15px" height="15px" alt="프로필 편집" />
            </label>
            <input
              id="image"
              type="file"
              accept="image/jpg,image/png,image/jpeg,image/gif"
              onChange={(e) => WantUpdateProfile(e)}
              style={{
                display: "none",
              }}
            />
          </Box>
        )}
        {/* 데이터 입력 */}
        <Box
          direction="column"
          pad="30px 24px"
          width="100%"
          justify="around"
          align="center"
          height={{ min: "450px" }}
        >
          <Grid
            width="90%"
            rows={["60px", "60px", "60px", "60px"]}
            columns={["1/3", "2/3"]}
            gap="0"
            areas={[
              { name: "name", start: [0, 0], end: [0, 0] },
              { name: "namedata", start: [1, 0], end: [1, 0] },
              { name: "type", start: [0, 1], end: [0, 1] },
              { name: "typedata", start: [1, 1], end: [1, 1] },
              { name: "goal", start: [0, 2], end: [0, 2] },
              { name: "goaldata", start: [1, 2], end: [1, 2] },
              { name: "endDate", start: [0, 3], end: [0, 3] },
              { name: "endDateData", start: [1, 3], end: [1, 3] },
            ]}
          >
            <Box gridArea="name" justify="center" align="start">
              <Text weight={500} size="16px">
                챌린지 이름
              </Text>
            </Box>
            <Box gridArea="namedata" justify="center" align="start">
              <StyledInput
                placeholder="챌린지 이름을 입력하세요."
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                padding="0px"
                margin="0px"
                style={{ fontSize: "16px" }}
              />
            </Box>
            <Box gridArea="type" justify="center" align="start">
              <Text weight={500} size="16px">
                챌린지 유형
              </Text>
            </Box>
            <Box
              gridArea="typedata"
              justify="between"
              align="center"
              direction="row"
              width="80%"
            >
              <Text
                weight={500}
                size="16px"
                style={{
                  color: `${type === "distance" ? "#00853B" : "#7E7E7E"}`,
                }}
                onClick={(e) => changeType("distance")}
              >
                거리
              </Text>
              <Text
                weight={500}
                size="16px"
                style={{ color: `${type === "count" ? "#00853B" : "#7E7E7E"}` }}
                onClick={(e) => changeType("count")}
              >
                횟수
              </Text>
              <Text
                weight={500}
                size="16px"
                style={{ color: `${type === "time" ? "#00853B" : "#7E7E7E"}` }}
                onClick={(e) => changeType("time")}
              >
                시간
              </Text>
            </Box>
            <Box gridArea="goal" justify="center" align="start">
              <Text weight={500} size="16px">
                목표
              </Text>
            </Box>
            <Box
              gridArea="goaldata"
              justify="start"
              align="center"
              direction="row"
            >
              <StyledInput
                placeholder="0"
                value={name}
                onChange={(e) => {
                  setGoal(e.target.value);
                }}
                width="30px"
                padding="0px"
                margin="0px"
              />

              {(type === "distance" || type === "") && (
                <Text weight={500} size="16px">
                  Km
                </Text>
              )}
              {type === "count" && (
                <Text weight={500} size="16px">
                  회
                </Text>
              )}
              {type === "time" && (
                <Text weight={500} size="16px">
                  시간
                </Text>
              )}
            </Box>
            <Box gridArea="endDate" justify="center" align="start">
              <Text weight={500} size="16px">
                기한
              </Text>
            </Box>
            <Box gridArea="endDateData" justify="center" align="start">
              8
            </Box>
          </Grid>

          <Button biggreenround="true">챌린지 등록</Button>
        </Box>
      </Box>
    </motion.div>
  );
};
