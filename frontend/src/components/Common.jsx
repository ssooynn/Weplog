import React, { useEffect, useState } from "react";
import styled from "styled-components";
// import Logo from "../assets/images/logo.png";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { ReactComponent as CourseIcon } from "../assets/icons/course.svg";
// // import ActiveCourseIcon from "../assets/icons/course_active.svg";
// import { ReactComponent as HomeIcon } from "../assets/icons/home.svg";
// import ActiveHomeIcon from "../assets/images/home_active.png";
// import { ReactComponent as RankIcon } from "../assets/icons/rank.svg";
// import ActiveRankIcon from "../assets/images/rank_active.png";
// import { ReactComponent as MypageIcon } from "../assets/icons/mypage.svg";
// import ActiveMypageIcon from "../assets/images/mypage_active.png";
// import { PrivateTerms } from "./PrivateTerms";
// import { ServiceTerms } from "./ServiceTerms";
// import Stars from "../assets/images/stars.png";
// import StarsBlank from "../assets/images/stars_blank.png";
import { Box } from "grommet";
import { Map, Polyline } from "react-kakao-maps-sdk";
import { motion } from "framer-motion";
// // 공통 컴포넌트들을 정의하는 클래스
// // ex) 버튼, 레이아웃, 틀
import CloseButton from "../assets/images/close.png";
//텍스트 폼
const TextForm = styled.div`
  color: ${(props) => props.color || "black"};
  font-size: ${(props) => props.size || "14px"};
  font-weight: ${(props) => props.weight || "normal"};
  align-items: end;
  display: flex;
  text-decoration: none;
  font-family: "shsnMedium", sans-serif;
`;

//텍스트 사이즈, 컬러, 웨이트, 글자를 설정할 수 있는 컴포넌트
export function StyledText({ size, color, weight, text, style }) {
  return (
    <TextForm size={size} color={color} weight={weight} style={style}>
      {text}
    </TextForm>
  );
}

const HeaderDiv = styled.div`
  margin: 5px;
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const BackButton = styled(motion.button)`
  background: none;
  font-size: 12px;
  font-family: Noto Sans KR, sans-serif;
  border: 0px;
  width: 10vw;
  display: flex;
  align-items: center;
`;

export const HeaderBox = ({ goBack, title }) => {
  return (
    <HeaderDiv>
      <div style={{ width: "10vw" }}></div>
      <StyledText
        size="20px"
        weight="bold"
        text={title}
        style={{
          display: "flex",
          alignItems: "center",
        }}
      />
      <BackButton whileTap={{ scale: 0.9 }} onClick={goBack}>
        <img src={CloseButton} />
      </BackButton>
    </HeaderDiv>
  );
};

// export const StarBox = ({ score, starView }) => {
//   return (
//     <Box direction="row" align="center" gap="small" width="60%">
//       {score >= 0 && <StyledText text={score} weight="bold" size="19px" />}
//       <Box style={{ position: "relative" }} justify="center">
//         <div
//           // align="center"
//           style={{
//             width: starView,
//             height: "16px",
//             overflow: "hidden",
//           }}
//         >
//           <img
//             className="pointOfStar"
//             alt="별"
//             src={Stars}
//             style={{
//               height: "16px",
//               width: "80px",
//             }}
//           />
//         </div>
//         <img
//           className="backgrdoundStar"
//           alt="별"
//           src={StarsBlank}
//           style={{
//             position: "absolute",
//             width: "80px",
//             height: "16px",
//           }}
//         />
//       </Box>
//     </Box>
//   );
// };

// export const CourseMap = ({
//   course,
//   width,
//   height,
//   marker,
//   marker1,
//   infoMarkers,
// }) => {
//   return (
//     <Map
//       center={course[0]}
//       isPanto={true}
//       style={{ borderRadius: "25px", width: width, height: height }}
//     >
//       {course && (
//         <Polyline
//           path={[course ? course : []]}
//           strokeWeight={5} // 선의 두께 입니다
//           strokeColor={"#030ff1"} // 선의 색깔입니다
//           strokeOpacity={0.7} // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
//           strokeStyle={"solid"} // 선의 스타일입니다
//         />
//       )}
//       {marker1}
//       {marker}
//       {infoMarkers}
//     </Map>
//   );
// };
