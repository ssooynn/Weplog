import { motion } from "framer-motion";
import { container } from "../utils/util";
import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Box } from "grommet";
import { MainExploreContents } from "../components/main/MainExploreContents";

const MainCategoryContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1vh 0 1vh 0;
  height: 5vh;
`;

const MainMyCategory = styled.div
  `
  font-size: 18px;
  font-weight: bold;
  color: rgba(87, 186, 131, 0.6);
  padding: 0 2vh 0 2vh;
  cursor:pointer;
  &:after {
    content: "";
    display: block;
    width: 0px;
    border-bottom: 2px solid #57ba83;
    margin: auto;
  }
`;

const MainExploreCategory = styled.div
  `
  font-size: 18px;
  font-weight: bold;
  color: #57ba83;
  padding: 0 2vh 0 2vh;
  cursor:pointer;
  &:after {
    content: "";
    display: block;
    width: 18px;
    border-bottom: 2px solid #57ba83;
    margin: auto;
  }
`;


export const MainExplore = () => {
    const navigate = useNavigate();

  return (
    <div
      style={{
        width: "100%",
        justify: "center",
        background:
          "linear-gradient(307.96deg, rgba(87, 186, 131, 0.296), rgba(29, 38, 255, 0.088))",
        textAlign: "center",
        height: "100vh",
      }}
    >
      
      <MainCategoryContainer>
        <MainMyCategory onClick={() => navigate("/main")}>
          MY
        </MainMyCategory>
        <MainExploreCategory onClick={() => navigate("/mainexplore")}>
          탐험하기
        </MainExploreCategory>
      </MainCategoryContainer>
      <MainExploreContents/>
    </div>
  );
};
