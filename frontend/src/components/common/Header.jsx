import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import { motion } from "framer-motion";
import { Box } from "grommet";
import userIcon from "../../assets/icons/userIcon.svg"
import { myPageInfoApi, myPageProfileApi } from "../../apis/mypageApi";

// Header
const Header = styled.div`
  width: 100%;
  height: 60px;
  justify-content: center;
  align-items: center;
`;

const ProfileImg = styled.img`
  width: 30px;
  height: 30px;
  border-radius:50%;
`

export const LogoHeader = () => {
  const [profile, setProfile] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    myPageProfileApi((res) => {
      setProfile(res.data.profileImageUrl);
    }, (err) => {
      console.log(err);
    })
  }, [])
  return (
    <Header>
      <Box pad="18px 24px" direction="row" justify="between" align="center">
        <motion.img
          style={{
            alignContent: "center",
            width: "27%",
          }}
          whileTap={{ scale: 0.9 }}
          alt="logo"
          src={Logo}
          onClick={() => navigate("/")}
        />
        <motion.img
          style={{
            width: '30px',
            height: '30px',
            borderRadius: '50%'
          }}
          whileTap={{ scale: 0.9 }}
          alt="mypage"
          onClick={() => navigate("/mypage")}
          src={`${profile}`}
        />
      </Box>
    </Header>
  );
};
