import { Box, Text } from "grommet";
import React, { useEffect, useState } from "react";
import userProfile from "../assets/images/UserProfile.png";
import gallery from "../assets/images/gallery.png";
import { StyledProfile } from "../components/common/ProfileImg";
import { StyledInput } from "../components/common/TextInput";
import Button from "../components/Button";

export const Signup = () => {
  const [profile, setProfile] = useState("");
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [nickname, setNickName] = useState("");
  const [weight, setWeight] = useState("");
  //쇼핑몰 이용약관
  const [check1, setCheck1] = useState(false);
  //개인정보처리방침
  const [check2, setCheck2] = useState(false);
  //개인정보처리의 위탁
  const [check3, setCheck3] = useState(false);
  const [checkAll, setCheckAll] = useState(false);

  function Check1Change() {
    setCheck1(!check1);
  }
  function Check2Change() {
    setCheck2(!check2);
  }
  function Check3Change() {
    setCheck3(!check3);
  }
  //모두 동의
  function CheckAllChange() {
    setCheck1(!checkAll);
    setCheck2(!checkAll);
    setCheck3(!checkAll);
    setCheckAll(!checkAll);
  }

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

  useEffect(() => {
    if (check1 && check2 && check3) {
      setCheckAll(true);
    } else {
      setCheckAll(false);
    }
  }, [check1, check2, check3]);

  return (
    <Box direction="column" height="100vh" justify="between">
      {/* 제목 Header */}
      <Box pad="18px" width="100%" height="60px" justify="center" align="center" border={{ color: "#EAEAEA", size: "2px", styled: "solid", side: "bottom" }}>
        <Text size="16px" weight="500">
          {" "}
          회원가입
        </Text>
      </Box>
      {/* 회원가입에 필요한 입력값 */}
      <Box direction="column" height="93%" pad="30px 45px">
        {/* 프로필 이미지 */}
        <Box justify="center" align="center">
          <StyledProfile src={profile === "" ? userProfile : profile} />
          <div
            style={{
              position: "absolute",
              width: "30px",
              height: "30px",
              paddingLeft: "90px",
              paddingTop: "90px",
            }}
          >
            <label htmlFor="image">
              <img src={gallery} alt="프로필 편집" />
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
          <Text color="#7E7E7E" weight="400" alignSelf="start" size="16px">
            이름
          </Text>
          <StyledInput
            placeholder="이름을 입력하세요."
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              console.log(name);
            }}
          />
        </Box>
        {/* 닉네임 */}
        <Box margin="20px 0px 0px 0px">
          <Text color="#7E7E7E" weight="400" alignSelf="start" size="16px">
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
            <Text color="#7E7E7E" weight="400" alignSelf="start" size="16px">
              몸무게
            </Text>
            <Text color="#7E7E7E" weight="400" alignSelf="center" size="8px">
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
            />
            <Text color="#7E7E7E" weight="400" alignSelf="center" size="16px">
              Kg
            </Text>
          </Box>
        </Box>
        {/* 약관 */}
        <Box margin="20px 0px 20px 0px">
          <Text color="#7E7E7E" weight="400" alignSelf="start" size="16px">
            약관 동의
          </Text>
          <Box alignSelf="center" width="100%" height="170px" border={{ color: "#D9D9D9", size: "1px", style: "solid", side: "all" }} margin={{ top: "10px" }} pad="medium">
            <Box direction="row" align="center" margin="5px">
              <input type="checkbox" name="Term" value="이용약관" checked={checkAll} style={{ alignSelf: "end" }} onChange={(e) => CheckAllChange()} />
              <label for="이용약관">
                <Text size="14px" weight="400" margin={{ left: "10px" }}>
                  모두 동의
                </Text>
              </label>
            </Box>
            <hr style={{ border: "1px solid #EAEAEA", width: "98%" }} />
            <Box direction="row" align="center" margin="5px">
              <input type="checkbox" name="Term" value="쇼핑몰 이용약관" checked={check1} style={{ alignSelf: "end" }} onChange={(e) => Check1Change()} />
              <label for="이용약관">
                <Text color="#7E7E7E" size="12px" weight="400" margin={{ left: "10px" }}>
                  쇼핑몰 이용약관
                </Text>
              </label>
            </Box>
            <Box direction="row" align="center" margin="5px">
              <input type="checkbox" name="Term" value="개인정보처리방침" checked={check2} style={{ alignSelf: "end" }} onChange={(e) => Check2Change()} />
              <label for="이용약관">
                <Text color="#7E7E7E" size="12px" weight="400" margin={{ left: "10px" }}>
                  개인정보처리방침
                </Text>
              </label>
            </Box>
            <Box direction="row" align="center" margin="5px">
              <input type="checkbox" name="Term" value="개인정보 처리의 위탁" checked={check3} style={{ alignSelf: "end" }} onChange={(e) => Check3Change()} />
              <label for="이용약관">
                <Text color="#7E7E7E" size="12px" weight="400" margin={{ left: "10px" }}>
                  개인정보 처리의 위탁
                </Text>
              </label>
            </Box>
          </Box>
        </Box>
        <Button biggreen style={{ alignSelf: "center" }}>
          회원가입
        </Button>
      </Box>
    </Box>
  );
};
