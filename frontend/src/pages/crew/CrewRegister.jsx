import { motion } from "framer-motion";
import { Box, Grid, Text } from "grommet";
import React, { useState } from "react";
import plus from "../../assets/icons/plusIcon.svg";
import gallery from "../../assets/icons/galleryIcon.svg";
import { StyledInput } from "../../components/common/TextInput";
import Button from "../../components/Button";
import { createCrew } from "../../apis/crewApi";
import { useNavigate } from "react-router-dom";
export const CrewRegister = () => {
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
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [local, setLocal] = useState("");
  const navigate = useNavigate();

  // Multipart로
  // request {
  // name: string
  // description: string
  // activityArea: string
  // maxParticipantCnt: int
  // lat: double
  // lon: double
  // }

  // image → 1장

  const handleCreateCrew = () => {
    const request = {
      name: name,
      description: desc,
      activityArea: local,
      maxParticipantCnt: amount,
    };

    const formData = new FormData();
    formData.append("image", image);
    const blob = new Blob([JSON.stringify(request)], {
      type: "application/json",
    });
    formData.append("request", blob);
    createCrew(
      formData,
      (response) => {
        console.log(response);
        navigate("/crew/detail/" + response.data.crewId);
      },
      (fail) => {
        console.log(fail);
      }
    );
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
              <img src={plus} width="20px" height="20px" alt="커버 편집" />
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
              <img src={gallery} width="15px" height="15px" alt="커버 편집" />
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
              { name: "desc", start: [0, 1], end: [0, 1] },
              { name: "descData", start: [1, 1], end: [1, 1] },
              { name: "amount", start: [0, 2], end: [0, 2] },
              { name: "amountData", start: [1, 2], end: [1, 2] },
              { name: "local", start: [0, 3], end: [0, 3] },
              { name: "localData", start: [1, 3], end: [1, 3] },
            ]}
          >
            <Box gridArea="name" justify="center" align="start">
              <Text weight={500} size="16px">
                크루 이름
              </Text>
            </Box>
            <Box gridArea="namedata" justify="center" align="start">
              <StyledInput
                placeholder="크루 이름"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                padding="0px"
                margin="0px"
                style={{ fontSize: "16px" }}
              />
            </Box>
            <Box gridArea="desc" justify="center" align="start">
              <Text weight={500} size="16px">
                소개
              </Text>
            </Box>
            <Box
              gridArea="descData"
              justify="between"
              align="center"
              direction="row"
              width="100%"
            >
              <StyledInput
                placeholder="크루에 관한 설명을 해주세요"
                value={desc}
                onChange={(e) => {
                  setDesc(e.target.value);
                }}
                padding="0px"
                margin="0px"
                width="100%"
                style={{ fontSize: "16px" }}
              />
            </Box>
            <Box gridArea="amount" justify="center" align="start">
              <Text weight={500} size="16px">
                최대 인원
              </Text>
            </Box>
            <Box
              gridArea="amountData"
              justify="start"
              align="center"
              direction="row"
              gap="medium"
            >
              <Box
                round="small"
                pad="small"
                background={amount === 10 ? "#57BA83" : "#E8E8E8"}
              >
                <Text
                  weight={500}
                  size="11px"
                  style={{
                    color: `${amount === 10 ? "#000000" : "#575757"}`,
                  }}
                  onClick={(e) => setAmount(10)}
                >
                  10명
                </Text>
              </Box>
              <Box
                round="small"
                pad="small"
                background={amount === 20 ? "#57BA83" : "#E8E8E8"}
              >
                <Text
                  weight={500}
                  size="11px"
                  style={{
                    color: `${amount === 20 ? "#000000" : "#575757"}`,
                  }}
                  onClick={(e) => setAmount(20)}
                >
                  20명
                </Text>
              </Box>
              <Box
                round="small"
                pad="small"
                background={amount === 30 ? "#57BA83" : "#E8E8E8"}
              >
                <Text
                  weight={500}
                  size="11px"
                  style={{
                    color: `${amount === 30 ? "#000000" : "#575757"}`,
                  }}
                  onClick={(e) => setAmount(30)}
                >
                  30명
                </Text>
              </Box>
            </Box>
            <Box gridArea="local" justify="center" align="start">
              <Text weight={500} size="16px">
                주 활동 지역
              </Text>
            </Box>
            <Box gridArea="localData" justify="center" align="start">
              <StyledInput
                placeholder="지역"
                value={local}
                onChange={(e) => {
                  setLocal(e.target.value);
                }}
                padding="0px"
                margin="0px"
                style={{ fontSize: "16px" }}
              />
            </Box>
          </Grid>

          <Button biggreenround="true" onClick={handleCreateCrew}>
            크루 만들기
          </Button>
        </Box>
      </Box>
    </motion.div>
  );
};
