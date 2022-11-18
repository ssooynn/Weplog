import { Box, Text } from "grommet";
import React, { useEffect, useState } from "react";
import bgGradient from "../../assets/images/bgGradient.png";
import searchIcon from "../../assets/icons/searchIcon.svg";
import {
  ChallengeCard,
  ChallengeCardList,
} from "../../components/challenge/ChallengeCard";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import Banner from "../../assets/images/Login1.jpg";
import Button from "../../components/Button";
import { challengeListAPi, challengeMyApi } from "../../apis/challengeApi";
import { myPageProfileApi } from "../../apis/mypageApi";
import { challengeIngListAPi } from "../../apis/memberChallengeApi";
import { useSelector } from "react-redux";
import { Loading } from "../../components/common/Loading";

export const ChallengeList = () => {
  //변수
  const navigate = useNavigate();
  const [challengeList, setChallengeList] = useState([]);
  const [myChallengeList, setMyChallengeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState("");
  const user = useSelector((state) => state.user.user);

  //함수
  const goChallengeRegister = () => {
    navigate("/challenge/register");
  };

  //hooks
  useEffect(() => {
    if (loading) {
      challengeListAPi(
        0,
        3,
        "ASC",
        (res) => {
            console.log(res);
          setChallengeList(res.data.content);
        },
        (err) => {
          console.log(err);
        }
      );

      challengeIngListAPi(
        (res) => {
          console.log(res);
          setMyChallengeList(res.data);
        },
        (err) => {
          console.log(err);
        }
      );

      myPageProfileApi(
        (res) => {
          setProfile(res.data.profileImageUrl);
        },
        (err) => {
          console.log(err);
        }
      );

      setLoading(false);
    }
  }, [loading]);
  return (
    <motion.div>
      <Box direction="column" pad={{ bottom: "70px" }}>
        <Box
          background={{ image: `url(${bgGradient})` }}
          direction="column"
          height="auto"
          pad="18px 24px"
          align="center"
          justify="start"
        >
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
            <Box direction="row" align="center">
              {/* <img
                src={searchIcon}
                style={{ alignSelf: "center" }}
                alt="챌린지 검색"
              /> */}
              <motion.img
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  marginLeft: "5px",
                }}
                whileTap={{ scale: 0.9 }}
                alt="mypage"
                onClick={() => navigate("/mypage")}
                src={`${profile}`}
              />
            </Box>
          </Box>
          <Text
            alignSelf="start"
            weight={500}
            size="16px"
            margin={{ top: "20px" }}
          >
            내 챌린지
          </Text>
          {!loading &&
            challengeList !== undefined &&
            challengeList.length > 0 && (
              <ChallengeCardList
                ChallengeList={myChallengeList}
              ></ChallengeCardList>
            )}
          <Box width="100%" pad="15px 0px">
            <Text
              alignSelf="start"
              weight={600}
              size="18px"
              margin={{ top: "10px" }}
            >
              Weplog로
            </Text>
            <Text alignSelf="start" weight={600} size="18px">
              당신과 지구를 더 건강하게
            </Text>
            <Text
              alignSelf="start"
              weight={400}
              size="13px"
              color="#8A8181"
              margin={{ top: "5px" }}
            >
              챌린지를 통해서 새로운 기록에 도전해보세요
            </Text>
            <Box
              alignSelf="start"
              // border={{ color: "#3d3d3d", style: "solid", side: "all" }}
              // round="medium"
              // width="70px"
              // justify="center"
              // align="center"
              // height="25px"
              style={{ marginTop: "140px" }}
            >
              {/* <Text weight={400} size="12px" color="#3d3d3d">
                1 / 2
              </Text> */}
            </Box>
            <img
              src={Banner}
              alt="Banner사진"
              style={{
                borderRadius: "50%",
                position: "absolute",
                width: "180px",
                height: "180px",
                marginLeft: "41%",
                marginTop: "95px",
                objectFit: "cover",
                boxShadow: "4px 4px 4px rgba(0,0,0,0.3)",
              }}
            ></img>
          </Box>
        </Box>
        <Box
          pad={{ left: "large", right: "large", top: "large", bottom: "50px" }}
          direction="column"
          align="center"
          justify="start"
        >
          <Button biggreenround="true" onClick={goChallengeRegister}>
            새로운 챌린지 만들기
          </Button>
          <Text
            alignSelf="start"
            weight={500}
            size="16px"
            margin={{ top: "20px" }}
          >
            최신 챌린지
          </Text>
          {!loading &&
            challengeList !== undefined &&
            challengeList.length > 0 && (
              <ChallengeCardList
                ChallengeList={challengeList}
              ></ChallengeCardList>
            )}
        </Box>
      </Box>
    </motion.div>
  );
};
