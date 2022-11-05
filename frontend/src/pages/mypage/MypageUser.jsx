import { Box, Text } from "grommet";
import React, { useEffect, useState } from "react";
import userProfile from "../../assets/images/UserProfile.png";
import gallery from "../../assets/images/gallery.png";
import { StyledProfile } from "../../components/common/ProfileImg";
import { StyledInput } from "../../components/common/TextInput";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import leftArrowIcon from "../../assets/icons/leftArrowIcon.svg";

export const MypageUser = () => {
  const [profile, setProfile] = useState("");
  const [image, setImage] = useState("");
  const [name, setName] = useState("뉴진차");
  const [nickname, setNickName] = useState("뉴진스");
  const [weight, setWeight] = useState("55");

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

  const CheckNickname = (e) => {
    console.log("nickname중복체크");
  };

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
          회원정보
        </Text>
        <Box width="30px"></Box>
      </Box>
      {/* 회원가입에 필요한 입력값 */}
      <Box direction="column" min-height="93%" pad="30px 45px">
        {/* 프로필 이미지 */}
        <Box justify="center" align="center">
          <StyledProfile src={profile === "" ? userProfile : profile} />
          <div
            style={{
              position: "absolute",
              width: "20px",
              height: "20px",
              paddingLeft: "70px",
              paddingTop: "70px",
            }}
          >
            <label htmlFor="image">
              <img src={gallery} width="30px" height="30px" alt="프로필 편집" />
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
          </div>
        </Box>
        {/* 이름 */}
        <Box margin="40px 0px 0px 0px">
          <Text color="#7E7E7E" weight={400} alignSelf="start" size="14px">
            이름
          </Text>
          <StyledInput
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              console.log(name);
            }}
            width="50%"
          />
        </Box>
        {/* 닉네임 */}
        <Box margin="20px 0px 0px 0px">
          <Text color="#7E7E7E" weight={400} alignSelf="start" size="14px">
            닉네임
          </Text>
          <Box direction="row" justify="between">
            <StyledInput
              placeholder="닉네임을 입력하세요."
              value={nickname}
              onChange={(e) => {
                setNickName(e.target.value);
                console.log(nickname);
              }}
              width="50%"
            />
            <Button
              nicknamecheck
              onClick={(e) => {
                CheckNickname();
              }}
            >
              중복 체크
            </Button>
          </Box>
        </Box>
        {/* 몸무게 */}
        <Box margin="20px 0px 0px 0px">
          <Box direction="row" justify="between">
            <Text color="#7E7E7E" weight={400} alignSelf="start" size="14px">
              몸무게
            </Text>
            <Text color="#7E7E7E" weight={400} alignSelf="center" size="8px">
              * 플로깅 시 칼로리 계산에 이용됩니다.
            </Text>
          </Box>
          <Box direction="row">
            <StyledInput
              placeholder="몸무게를 입력하세요."
              value={weight}
              onChange={(e) => {
                setWeight(e.target.value);
                console.log(weight);
              }}
              width="50%"
            />
            <Text color="#7E7E7E" weight={400} alignSelf="center" size="14px">
              Kg
            </Text>
          </Box>
        </Box>

        <Button biggreen style={{ alignSelf: "center" }}>
          회원가입
        </Button>
      </Box>
    </Box>
  );
};
