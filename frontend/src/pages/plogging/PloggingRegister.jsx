import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { container } from "../../utils/util";
import { Box } from "grommet";
import BackBtn from "../../assets/images/backButton.png";
import PlusBtn from "../../assets/images/plus.png";
import DefalutPic from "../../assets/images/defaultPic.png";
import PloggingTitle from "../../assets/images/ploggingTitle.png";
import { StyledText } from "../../components/Common";
import { ContentSelectBottomSheet } from "../../components/plogging/ContentSelectBottomSheet";
import {
  BootstrapButton,
  ContentChooseButton,
} from "../../components/common/Buttons";
import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";
import { Map, Polyline } from "react-kakao-maps-sdk";
export const PloggingRegister = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { ploggingType, ploggingData, lineImage } = location.state;
  // ploggingType: "",
  //     ploggingData: {
  //       latlng: mapData.latlng,
  //       kcal: data.kcal,
  //       time: time,
  //       totalDistance: data.totalDistance,
  //     },
  const [data, setData] = useState(ploggingData);
  const [open, setOpen] = useState(false);
  const [format, setFormat] = useState(null);
  const imageRef = useRef();
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={container}
      style={{
        position: "relative",
        textAlign: "center",
        height: "100vh",
      }}
    >
      {/* 헤더 */}
      <Box
        width="100%"
        height="7%"
        direction="row"
        justify="around"
        align="center"
      >
        {/* 뒤로가기 버튼 */}
        <Box width="10%">
          <img
            src={BackBtn}
            onClick={() => {
              navigate(-1);
            }}
            style={{
              width: "14px",
              fill: "cover",
            }}
          />
        </Box>
        {/* 포스터 꾸미기 */}
        <Box width="60%" align="center">
          <StyledText text="포스터 꾸미기" weight="bold" size="18px" />
        </Box>
        {/* 빈칸 */}
        <Box width="10%"></Box>
      </Box>
      {/* 사진 박스 */}
      <Box
        width="100%"
        height="43%"
        style={{
          position: "relative",
        }}
        ref={imageRef}
      >
        <Box
          width="100%"
          height="100%"
          align="center"
          justify="between"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: "150",
          }}
        >
          {format === 1 && (
            <img
              src={lineImage}
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                zIndex: 150,
                fill: "cover",
              }}
            />
          )}
          {/* 헤더 */}
          <Box
            width="100%"
            direction="row"
            pad={{
              left: "25px",
              top: "15px",
            }}
          >
            <img src={PloggingTitle} />
          </Box>
          {/* 아래 내용 */}
          {format === 0 && (
            <Box
              direction="row"
              align="center"
              justify="around"
              gap="125px"
              pad={{
                bottom: "25px",
              }}
            >
              <Box align="end" direction="row">
                <StyledText
                  text={data.totalDistance}
                  weight="bold"
                  size="20px"
                  color="white"
                />
                <StyledText size="10px" text={"km"} color="white" />
              </Box>
              <Box align="end" direction="row">
                <StyledText
                  text={data.totalDistance}
                  weight="bold"
                  size="20px"
                  color="white"
                />
                <StyledText size="10px" text={"시간"} color="white" />
              </Box>
              <Box align="end" direction="row">
                <StyledText
                  text={data.totalDistance}
                  weight="bold"
                  size="20px"
                  color="white"
                />
                <StyledText size="10px" text={"kcal"} color="white" />
              </Box>
            </Box>
          )}
        </Box>
        <img
          src={DefalutPic}
          style={{
            width: "100%",
            height: "100%",
            zIndex: 100,
            fill: "cover",
          }}
        />
      </Box>
      {/* 데이터 셀렉트 박스 */}
      <Box width="100%" height="50%" align="center">
        <ContentChooseButton whileTap={{ scale: 0.9 }}>
          <Box direction="row" justify="between">
            내 사진으로 추가하기
            <img src={PlusBtn} />
          </Box>
        </ContentChooseButton>
        <ContentChooseButton
          onClick={() => {
            setOpen(true);
          }}
          whileTap={{ scale: 0.9 }}
        >
          <Box direction="row" justify="between">
            컨텐츠 추가하기
            <img src={PlusBtn} />
          </Box>
        </ContentChooseButton>
        <BootstrapButton
          style={{
            width: "75%",
            height: "50px",
          }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            const ima = imageRef.current;
            domtoimage.toBlob(ima).then((blob) => {
              saveAs(blob, "card.png");
            });
          }}
        >
          {"확인"}
        </BootstrapButton>
      </Box>
      <ContentSelectBottomSheet
        open={open}
        onDismiss={() => {
          setOpen(false);
        }}
        setFormat={setFormat}
      />
    </motion.div>
  );
};
