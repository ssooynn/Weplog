import { Box, Text } from "grommet";
import React from "react";
import bgGradient from "../../assets/images/bgGradient.png";
import searchIcon from "../../assets/icons/searchIcon.svg";
import { ChallengeCard } from "../../components/challenge/ChallengeCard";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import Banner from "../../assets/images/Login1.jpg";
import Button from "../../components/Button";

export const ChallengeList = () => {
  const navigate = useNavigate();
  const goChallengeRegister = () => {
    navigate("/challenge/register");
  }
  return (
    <motion.div>

      <Box direction="column">
        <Box background={{ image: `url(${bgGradient})` }} direction="column" height="460px" pad="18px 24px" align="center" justify="start">
          <Box direction="row" justify="between" align="center">
            <motion.img
              style={{
                alignContent: "center",
                width: "27%",
              }}
              whileTap={{ scale: 1.2 }}
              alt="logo"
              src={Logo}
              onClick={() => navigate("/")}
            />
            <img src={searchIcon} style={{ alignSelf: "center" }} alt="챌린지 검색" />
          </Box>
          <Text alignSelf="start" weight="500" size="16px" margin={{ top: "20px" }}>
            내 챌린지
          </Text>
          <ChallengeCard challengeId="2" />
          <Text alignSelf="start" weight="600" size="18px" margin={{ top: "10px" }}>
            Weplog의
          </Text>
          <Text alignSelf="start" weight="600" size="18px">
            주인공이 되어주세요!
          </Text>
          <Text alignSelf="start" weight="400" size="13px" color="#8A8181" margin={{ top: "5px" }}>
            이달의 Weploger를 찾습니다
          </Text>
          <Box alignSelf="start" border={{ color: "#3d3d3d", style: "solid", side: "all" }} round="medium" width="70px" justify="center" align="center" height="25px" style={{ marginTop: "105px" }}>
            <Text weight="400" size="12px" color="#3d3d3d">
              1 / 2
            </Text>
          </Box>
        </Box>
        <img
          src={Banner}
          alt="Banner사진"
          style={{
            borderRadius: "50%",
            position: "absolute",
            width: "180px",
            height: "180px",
            marginLeft: "45%",
            marginTop: "300px",
            objectFit: "cover",
            boxShadow: "4px 4px 4px rgba(0,0,0,0.3)"
          }}
        ></img>
        <Box pad="large" direction="column" align="center" justify="start">
          <Button biggreenround="true" onClick={goChallengeRegister}>새로운 챌린지 만들기</Button>
          <Text alignSelf="start" weight="500" size="16px" margin={{ top: "20px" }}>
            오늘의 추천 챌린지
          </Text>
          <ChallengeCard bgimage="https://picsum.photos/200/300" />
          <Box direction="row" justify="between" width="100%">
            <Text weight="500" size="16px" margin={{ top: "20px" }}>
              Challenge Top 3
            </Text>
            <Box direction="row" justify="between" width="90px" alignSelf="end">

              <Text weight="400" size="12px" margin={{ top: "20px" }} color="#57BA83">
                총 횟수
              </Text>
              <Text weight="400" size="12px" margin={{ top: "20px" }} color="#AEAEAE">
                |
              </Text>
              <Text weight="400" size="12px" margin={{ top: "20px" }} color="#AEAEAE">
                총 거리
              </Text>
            </Box>
          </Box>
          <ChallengeCard bgimage="https://picsum.photos/200/300" />
          <ChallengeCard bgimage="https://picsum.photos/200/300" />
          <ChallengeCard bgimage="https://picsum.photos/200/300" />


        </Box>

      </Box>
    </motion.div>
  );
};
