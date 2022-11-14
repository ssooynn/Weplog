import { Box, Text } from "grommet";
import React, { useCallback } from "react";
import styled from "styled-components";
import googleLoginIcon from "../assets/icons/googleLoginBtn.png";
import kakaoLoginIcon from "../assets/icons/kakaoLoginBtn.png";
import logo from "../assets/images/logo.png";
import {
  AUTH_URL_KAKAO,
  AUTH_URL_GOOGLE,
  OAUTH2_REDIRECT_URI,
} from "../apis/api";
import { useEffect } from "react";
//투명도 있는 그라데이션
const GradientBlack = styled.div`
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.6594),
    rgba(0, 0, 0, 1)
  );
  width: 100%;
  height: 100%;
`;

export const Login = () => {
  //변수
  //bgImg 랜덤으로 설정
  const bgImgNum = Math.floor(Math.random() * 6) + 1;

  //함수
  //회원가입 페이지 요청
  const GoSignup = (choice) => {
    if (choice == "google") {
      window.location.href = AUTH_URL_GOOGLE + OAUTH2_REDIRECT_URI;
    } else {
      window.location.href = AUTH_URL_KAKAO + OAUTH2_REDIRECT_URI;
    }
  };

  const googleLogin = () => {
    window.location.href = AUTH_URL_GOOGLE + OAUTH2_REDIRECT_URI;
  };

  const kakaoLogin = () => {
    window.location.href = AUTH_URL_KAKAO + OAUTH2_REDIRECT_URI;
  };

  return (
    <Box
      height="100vh"
      background={{ image: `url(/assets/images/Login/Login${bgImgNum}-progressive.jpeg)` }}
    >
      <GradientBlack>
        <Box
          direction="column"
          justify="around"
          align="center"
          width="100%"
          height="100%"
        >
          <img src={logo} alt="로고" width="120px" />
          <Box
            direction="column"
            height="150px"
            justify="between"
            align="center"
          >
            <img
              src={kakaoLoginIcon}
              alt="카카오로 로그인"
              width="300px"
              onClick={kakaoLogin}
            />
            <img
              src={googleLoginIcon}
              alt="구글로 로그인"
              width="300px"
              onClick={googleLogin}
            />
            <Box direction="row" margin={{ top: "15px" }}>
              <Text
                color="white"
                size="small"
                weight={300}
                onClick={(e) => GoSignup("kakao")}
                margin={{ right: "5px" }}
              >
                카카오로 회원가입
              </Text>
              <Text color="white" size="small" weight={300}>
                |
              </Text>
              <Text
                color="white"
                size="small"
                weight={300}
                margin={{ left: "5px", right: "5px" }}
                onClick={(e) => GoSignup("google")}
              >
                구글로 회원가입
              </Text>
            </Box>
          </Box>
        </Box>
      </GradientBlack>
    </Box>
  );
};
