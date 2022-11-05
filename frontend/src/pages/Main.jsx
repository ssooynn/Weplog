import { motion } from "framer-motion";
import { container } from "../utils/util";
import React, { useEffect, useState } from "react";
import {
  Routes,
  Route,
  useLocation,
  Link,
  useNavigate,
} from "react-router-dom";
import styled, { keyframes, css } from "styled-components";
import { Box, Text } from "grommet";
import { MainMYContents } from "../components/main/MainMYContents";
import UpArrowIcon from "../assets/icons/upArrowIcon.svg";
import BackArrowIcon from "../assets/icons/backArrowIcon.svg";
import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";

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
  cursor: pointer;
  &:after {
    content: "";
    display: block;
    width: 18px;
    border-bottom: 2px solid #57ba83;
    margin: auto;
  }
`;

const MainExploreCategory = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: rgba(87, 186, 131, 0.6);
  padding: 0 2vh 0 2vh;
  cursor: pointer;
  &:after {
    content: "";
    display: block;
    width: 0px;
    border-bottom: 2px solid #57ba83;
    margin: auto;
  }
`;

const PopUpButton = styled.div`
  // display: flex;
  // justify-content: center;
  // align-items: center;
  // flex-direction: column;
  height: 80px;
  width: 100vw;
  z-index: 1;
  margin-bottom:45px;
  // position: fixed;
  bottom: 0;
`;

const PopUpButtonArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 2vh;
  z-index: 1;
  animation: motion 0.5s linear 0s infinite alternate;
  @keyframes motion {
    0% {
      margin-top: 0px;
    }
    100% {
      margin-top: 10px;
    }
  }
`;

const PlomonTableTitle = styled.div`
  padding-top: 3%;
  padding-left: 5%;
  height: 30px;
  font-size: 19px;
  font-weight: bold;
  color: #232323;
  display: flex;
  align-items: center;
  
`

const PlomonTableArea = styled.div`
  width: 96%;
  display: flex;
  flex-wrap: wrap;
  padding-top: 4%;
  padding-left: 4%;
`

const SmallPlomon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 4vw;
  padding-right: 4vw;
  padding-bottom: 4vw;
`

const PlomonName = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #535353;
  padding-top: 2vw;
`

const PlomonState = styled.div`
  background-color: #57BA83;
  color: white;
  font-size: 10px;
  font-weight: 500;
  margin-top: 2vw;
  padding: 0 8px 2px 8px;
  border-radius: 15px;
`


export const Main = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        width: "100%",
        justify: "center",
        height: "100vh",
        background:
          "linear-gradient(307.96deg, rgba(87, 186, 131, 0.296), rgba(29, 38, 255, 0.088))",
        textAlign: "center",
        display: "flex",
        justifyContent: "space-between",
        position: "relative",
      }}
    >
      <Box
        height="100%"
        width="100%"
        justify="between"
        style={{ position: "absolute" }}
      >
        <MainCategoryContainer>
          <MainMyCategory onClick={() => navigate("/main")}>MY</MainMyCategory>
          <MainExploreCategory onClick={() => navigate("/mainexplore")}>
            탐험하기
          </MainExploreCategory>
        </MainCategoryContainer>
        <PopUpButton onClick={() => setOpen(true)}>
          <div style={{ fontSize: "17px", fontWeight: "500", color: "#B2B2B2" }}>
            모아보기
          </div>
          <PopUpButtonArea>
            <img width="25px" height="25px" src={UpArrowIcon} />
          </PopUpButtonArea>
        </PopUpButton>
      </Box>
      {/* 모아보기 */}
      <BottomSheet
        open={open}
        onDismiss={() => setOpen(false)}
        snapPoints={({ maxHeight }) => 0.93 * maxHeight}
      >
      <PlomonTableTitle onClick={() => setOpen(false)}>
        <img style={{width:"30px", height:"30px", paddingRight:"20px"}} src={BackArrowIcon} />
        모아보기
      </PlomonTableTitle>
      <PlomonTableArea>
        <SmallPlomon>
          <img style={{width:"28vw", height:"28vw"}} src='https://cdn.wadiz.kr/ft/images/green001/2021/1228/20211228095252100_7.gif'/>
          <PlomonName>해리</PlomonName>
          <PlomonState>Baby</PlomonState>
        </SmallPlomon>
        <SmallPlomon>
          <img style={{width:"28vw", height:"28vw"}} src='https://cdn.wadiz.kr/ft/images/green001/2021/1228/20211228095252100_7.gif'/>
          <PlomonName>해리</PlomonName>
          <PlomonState>Baby</PlomonState>
        </SmallPlomon>
        <SmallPlomon>
          <img style={{width:"28vw", height:"28vw"}} src='https://cdn.wadiz.kr/ft/images/green001/2021/1228/20211228095252100_7.gif'/>
          <PlomonName>해리</PlomonName>
          <PlomonState>Baby</PlomonState>
        </SmallPlomon>
        <SmallPlomon>
          <img style={{width:"28vw", height:"28vw"}} src='https://cdn.wadiz.kr/ft/images/green001/2021/1228/20211228095252100_7.gif'/>
          <PlomonName>해리</PlomonName>
          <PlomonState>Baby</PlomonState>
        </SmallPlomon>
      </PlomonTableArea>
      </BottomSheet>
      <MainMYContents style={{ position: "absolute" }} />
    </div>
  );
};
