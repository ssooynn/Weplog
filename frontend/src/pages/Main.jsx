import { motion } from "framer-motion";
import { container } from "../utils/util";
import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, Link, useNavigate } from "react-router-dom";
import styled, { keyframes, css } from "styled-components";
import { Box, Text } from "grommet";
import { MainMYContents } from "../components/main/MainMYContents";
import UpArrowIcon from "../assets/icons/upArrowIcon.svg";
import { BottomSheet } from 'react-spring-bottom-sheet'
import 'react-spring-bottom-sheet/dist/style.css'

const MainCategoryContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1vh 0 1vh 0;
  width: 100%;
  height: 5vh;
  z-index: 1;
`;

const MainMyCategory = styled.div`
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

const MainExploreCategory = styled.div
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

const PopUpButton = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  height: 80px;
  z-index: 1;
`


const PopUpButtonArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 2vh;
  z-index: 1;
  animation: motion 0.5s linear 0s infinite alternate;
  margin-top: 0;
  @keyframes motion {
    0% {margin-top: 0px;}
    100% {margin-top: 10px;}
  }
`;




export const Main = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false)
  
  return (
    <div
      style={{
        width: "100%",
        justify: "center",
        background:
          "linear-gradient(307.96deg, rgba(87, 186, 131, 0.296), rgba(29, 38, 255, 0.088))",
        textAlign: "center",
        height: "94vh",
        display: "flex",
        justifyContent: "space-between",
        position: "relative"
      }}
    >
      <Box height='100%' width='100%' justify='between' style={{position:'absolute'}}>

      <MainCategoryContainer>
        <MainMyCategory onClick={() => navigate("/main")}>
          MY
        </MainMyCategory>
        <MainExploreCategory onClick={() => navigate("/mainexplore")}>
          탐험하기
        </MainExploreCategory>
      </MainCategoryContainer>
      <PopUpButton onClick={() => setOpen(true)}>
        <div style={{fontSize: "17px", fontWeight: "500", color: "#B2B2B2"}}>
          모아보기
        </div>
        <PopUpButtonArea>
          <img width="25px" height="25px" src={UpArrowIcon}/>
        </PopUpButtonArea>
      </PopUpButton>
      </Box>
      <BottomSheet open={open}
        onDismiss={() => setOpen(false)}
        snapPoints={({ maxHeight }) => 0.93 * maxHeight}>Hi
      </BottomSheet>
      <MainMYContents style={{position: "absolute"}}/>
   
    </div>
  );
};
