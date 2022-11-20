import { motion } from "framer-motion";
import { container } from "../utils/util";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Box, Text } from "grommet";
import { MainMYContents } from "../components/main/MainMYContents";
import UpArrowIcon from "../assets/icons/upArrowIcon.svg";
import BackArrowIcon from "../assets/icons/backArrowIcon.svg";
import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";
import {
  changePetLevelApi,
  getAllMyPet,
  getMyPetDetail,
} from "../apis/memberPetApi";
import Switch from "react-ios-switch";

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
  margin-bottom: 45px;
  position: fixed;
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
`;

const PlomonTableArea = styled.div`
  width: 96%;
  display: flex;
  flex-wrap: wrap;
  padding-top: 4%;
  padding-left: 4%;
`;

const SmallPlomon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 4vw;
  padding-right: 4vw;
  padding-bottom: 4vw;
`;

const PlomonName = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #535353;
  padding-top: 2vw;
`;

const PlomonState = styled.div`
  background-color: ${(props) => (props.lev === 1 ? "#A6A6A6" : "#57BA83")};
  color: white;
  font-size: 10px;
  font-weight: 500;
  margin-top: 2vw;
  padding: 0 8px 1px 8px;
  border-radius: 15px;
`;

const PlomonDetailName = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #535353;
  padding-top: 5vw;
`;

const PlomonDetailState = styled.div`
  background-color: ${(props) => (props.lev === 1 ? "#A6A6A6" : "#57BA83")};
  color: white;
  font-size: 14px;
  font-weight: 500;
  margin: 1vh 0 2vh 0;
  padding: 0 12px 2px 12px;
  border-radius: 20px;
`;

const PlomonDetailText = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #535353;
  margin-right: 10px;
`;

const ProgressBar = styled.progress`
  appearance: none;
  height: 4px;
  width: 56vw;
  margin-top: 1px;
  ::-webkit-progress-bar {
    border-radius: 5px;
    background: #c1c1c1;
  }

  ::-webkit-progress-value {
    border-radius: 5px;
    background: ${(props) => (props.isMax ? "#FFBB54" : "#57ba83")};
  }
`;

const label = { inputProps: { "aria-label": "Switch demo" } };

export const Main = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [plomonOpen, setPlomonOpen] = useState(false);
  const [isPlomonClicked, setIsPlomonClicked] = useState(false);
  const [allMyPet, setAllMyPet] = useState([]);
  const [targetPlomon, setTargetPlomon] = useState({});
  const [loading, setLoading] = useState(false);

  const goPlomon3D = (petId) => {
    navigate("/main/plomon3d", { state: { gottenPetId: petId } });
  };

  useEffect(() => { }, [plomonOpen, isPlomonClicked]);

  useEffect(() => {
    getAllMyPet(
      (res) => {
        console.log(res.data);
        setAllMyPet(res.data);
        setLoading(!loading);
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  const changeImgLevel = () => {
    changePetLevelApi(
      targetPlomon.memberPetId,
      (res) => {
        console.log(res);
        getMyPetDetail(
          targetPlomon.petId,
          (res) => {
            console.log(res.data);
            setTargetPlomon(res.data);
          },
          (err) => {
            console.log(err);
          }
        );
      },
      (err) => {
        console.log(err);
      }
    );
  };
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
          <div
            style={{ fontSize: "17px", fontWeight: "500", color: "#B2B2B2" }}
          >
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
          <img
            style={{ width: "30px", height: "30px", paddingRight: "20px" }}
            src={BackArrowIcon}
          />
          모아보기
        </PlomonTableTitle>
        <PlomonTableArea>
          {allMyPet !== undefined &&
            allMyPet.length > 0 &&
            allMyPet.map((pet, idx) => (
              <SmallPlomon
                key={idx}
                onClick={() => {
                  setTargetPlomon(pet);
                  setPlomonOpen(true);
                  setOpen(false);
                  setIsPlomonClicked(false);
                }}
              >
                <img
                  style={{ width: "28vw", height: "24vw", objectFit: "cover" }}
                  src={pet.file_url}
                />
                <PlomonName>{pet.name}</PlomonName>
                <PlomonState lev={pet.level}>
                  {pet.level === 1 ? "Baby" : "Adult"}
                </PlomonState>
              </SmallPlomon>
            ))}
        </PlomonTableArea>
      </BottomSheet>

      {/* 플로몬 디테일 */}
      <BottomSheet
        open={plomonOpen}
        onDismiss={() => setPlomonOpen(false)}
        snapPoints={({ maxHeight }) => 0.93 * maxHeight}
      >
        <PlomonTableTitle
          onClick={() =>
            isPlomonClicked === false
              ? (setPlomonOpen(false), setOpen(true))
              : setPlomonOpen(false)
          }
        >
          <img
            style={{ width: "30px", height: "30px", paddingRight: "20px" }}
            src={BackArrowIcon}
          />
          {targetPlomon.name}
        </PlomonTableTitle>
        <PlomonTableArea>
          <SmallPlomon>
            <img
              style={{ width: "92vw", height: "50vw", objectFit: "cover" }}
              src={targetPlomon.file_url}
              onClick={() => goPlomon3D(targetPlomon.petId)}
            />
            <PlomonDetailName>{targetPlomon.name}</PlomonDetailName>
            <PlomonDetailState lev={targetPlomon.level}>
              {targetPlomon.level === 1 ? "Baby" : "Adult"}
            </PlomonDetailState>
            <Box
              margin="2vh 0"
              direction="row"
              justify="between"
              align="center"
              width="90%"
            >
              <PlomonDetailText>경험치</PlomonDetailText>
              <ProgressBar
                id="progress"
                value={new Number(parseInt(targetPlomon.current_exp) / 300)}
                isMax={parseInt(targetPlomon.current_exp) / 300 === 100
                  ? true
                  : false}
                min="0"
                max="100"
              ></ProgressBar>
              <Text size="12px" weight={400}>
                {parseInt(targetPlomon.current_exp) / 300 === 100
                  ? "MAX"
                  : String(Math.floor((targetPlomon.current_exp) / 300)) + "%"}
              </Text>
            </Box>
            <Box
              margin="2vh 0"
              direction="row"
              justify="between"
              align="center"
              width="90%"
            >
              <PlomonDetailText>변신</PlomonDetailText>
              <div style={{ margin: "1px 52vw 0 0" }}>
                {/* 만약 baby라면 스위치 없어야함  */}
                {targetPlomon.level === 2 ? (
                  <Switch
                    value={targetPlomon.imageLevel === 2 || ''}
                    checked={targetPlomon.imageLevel === 2 || false}
                    onChange={changeImgLevel}
                    onColor="#57BA83"
                    offColor="#D9D9D9"
                  />
                ) : (
                  <Switch disabled value={targetPlomon.imageLevel === 2 || ''} checked={false} handleColor="#9E9E9E" offColor="#868686" />
                )}
              </div>
            </Box>
          </SmallPlomon>
        </PlomonTableArea>
      </BottomSheet>

      <MainMYContents
        style={{ position: "absolute" }}
        setPlomonOpen={setPlomonOpen}
        setIsPlomonClicked={setIsPlomonClicked}
        setTargetPlomon={setTargetPlomon}
        loading={loading}
      />
    </div>
  );
};
