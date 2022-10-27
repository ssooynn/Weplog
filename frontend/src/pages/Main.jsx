import { motion } from "framer-motion";
import { container } from "../utils/util";
import React, { useState } from "react";
import styled from "styled-components";

interface SelectedProps {
  isSelected: boolean;
}

const MainCategoryContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3vh 0 0 0;
`;

const MainCategory =
  styled.div <
  SelectedProps >
  `
  font-size: 18px;
  font-weight: bold;
  color: #57ba83;
  padding: 0 2vh 0 2vh;
  &:after {
    content: "";
    display: block;
    width: 18px;
    border-bottom: ${(isSelected) => (isSelected ? "0px solid #57ba83" : "")};
    margin: auto;
  }
`;

export const Main = () => {
  const [isSelected, setIsSelected] = useState(false);
  const onPress = () => setIsSelected(!isSelected);

  return (
    <motion.div
      style={{
        width: "100%",
        justify: "center",
        background:
          "linear-gradient(307.96deg, rgba(87, 186, 131, 0.296) 21.66%, rgba(29, 38, 255, 0.088) 99.27%)",
        textAlign: "center",
        height: "calc(94vh - 10px)",
      }}
      initial="hidden"
      animate="visible"
      variants={container}
    >
      <MainCategoryContainer>
        <MainCategory isSelected={isSelected} onPress={onPress}>
          MY
        </MainCategory>
        <MainCategory isSelected={isSelected} onPress={onPress}>
          탐험하기
        </MainCategory>
      </MainCategoryContainer>
    </motion.div>
  );
};
