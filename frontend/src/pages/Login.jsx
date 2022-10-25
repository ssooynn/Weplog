import { Box, Text } from "grommet";
import React from "react";
import styled from "styled-components";
import googleLogin from "../assets/icons/googleLoginBtn.png";
import kakaoLogin from "../assets/icons/kakaoLoginBtn.png";
import { useNavigate } from 'react-router-dom';

import logo from "../assets/images/logo.png";

//투명도 있는 그라데이션
const GradientBlack = styled.div`
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6594), rgba(0, 0, 0, 1));
  width: 100%;
  height: 100%;
`;

export const Login = () => {
  //bgImg 랜덤으로 설정
  const bgImgNum = Math.floor(Math.random() * 6) + 1;
  const Navigate = useNavigate();
  //회원가입 페이지 요청
  const GoSignup = () => {
    Navigate("/signup");
  }
  return (
    <Box height="100vh" background={{ image: `url(/assets/images/login/Login${bgImgNum}.jpg)` }}>
      <GradientBlack>
        <Box direction="column" justify="around" align="center" width="100%" height="100%">
          <img src={logo} alt="로고" width="120px"/>
          <Box direction="column" height="150px" justify="between" align="center">
            <img src={kakaoLogin} alt="카카오로 로그인" width="300px" />
            <img src={googleLogin} alt="구글로 로그인" width="300px" />
            <Box direction="row" margin={{top:"15px"}}>
              <Text color="white" size="small" weight="lighter" onClick={(e)=>GoSignup()} margin={{right:"5px",}}>회원가입</Text>
              <Text color="white" size="small" weight="lighter">|</Text>
              <Text color="white" size="small" weight="lighter" margin={{left:"5px",right:"5px"}}>아이디찾기</Text>
              <Text color="white" size="small" weight="lighter">/</Text>
              <Text color="white" size="small" weight="lighter" margin={{left:"5px",}}>비밀번호 찾기</Text>
            </Box>
          </Box>
        </Box>
      </GradientBlack>
    </Box>
  );
};
