import { Box } from "grommet";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import googleLogin from "../assets/icons/googleLoginBtn.png";
import kakaoLogin from "../assets/icons/kakaoLoginBtn.png";

import logo from "../assets/images/logo.png";

const GradientBlack = styled.div`
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6594), rgba(0, 0, 0, 1));
  width: 100%;
  height: 100%;
`;

export const Login = () => {
  const [bgImgNum, setBgImgNum] = useState();
  useEffect(() => {
    //1부터 6사이 숫자 랜덤으로 선정
    let num = Math.floor(Math.random() * 6) + 1;
    setBgImgNum(num);
  }, []);
  return (
    <Box width="100%" height="100vh" background={{ image: `url(/assets/images/login/Login${bgImgNum}.jpg)` }}>
      <GradientBlack>
        <Box direction="column" justify="around" align="center" width="100%" height="100%">
          <img src={logo} alt="로고" />
          <Box direction="column" height="100px" justify="between" align="center">
            <img src={kakaoLogin} alt="카카오로 로그인" width="300px" />
            <img src={googleLogin} alt="구글로 로그인" width="300px" />
          </Box>
        </Box>
      </GradientBlack>
    </Box>
  );
};
