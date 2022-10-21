import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import { motion } from "framer-motion";
// Header
const Header = styled.div`
  background-color: white;
  width: 100%;
  height: 6vh;
  justify-content: center;
  align-items: center;
`;

export const LogoHeader = () => {
  const navigate = useNavigate();
  return (
    <Header>
      <motion.img
        style={{
          margin: "8px 10px",
          alignContent: "center",
        }}
        whileTap={{ scale: 1.2 }}
        alt="logo"
        src={Logo}
        onClick={() => navigate("/")}
      />
    </Header>
  );
};
