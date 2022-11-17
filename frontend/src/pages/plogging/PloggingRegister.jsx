import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { container, timeToString } from "../../utils/util";
import { Avatar, Box } from "grommet";
import BackBtn from "../../assets/images/backButton.png";
import PlusBtn from "../../assets/images/plus.png";
import ColorPickerBtn from "../../assets/images/colorPicker.png";
import { ReactComponent as PloggingLogo } from "../../assets/icons/logo.svg";
// import PloggingTitle from "../../assets/images/ploggingTitle.png";
// import PloggingTitleBlack from "../../assets/images/ploggingTitleBlack.png";
import { StyledText } from "../../components/Common";
import CloseBtn from "../../assets/images/close.png";
import CourseBtn from "../../assets/images/course.png";
import WeatherBtn from "../../assets/images/weather.png";
import CheckBtn from "../../assets/images/check.png";
import {
  ContentSelectBottomSheet,
  DataButton,
} from "../../components/plogging/ContentSelectBottomSheet";
import {
  BootstrapButton,
  ContentChooseButton,
} from "../../components/common/Buttons";
import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";
import { Map, Polyline } from "react-kakao-maps-sdk";
import { ChromePicker, SketchPicker } from "react-color";
import { handleColor } from "../../utils/changeColor";
import { postPloggingPicture } from "../../apis/ploggingApi";

export const PloggingRegister = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const mapLineRef = useRef();
  const [contentColor, setContentColor] = useState("white");
  const [imageClicked, setIamgeClicked] = useState(false);
  const { ploggingType, ploggingData, address, pathData, ploggingId } =
    location.state;
  // ploggingType: "",
  //     ploggingData: {
  //       latlng: mapData.latlng,
  //       kcal: data.kcal,
  //       time: time,
  //       totalDistance: data.totalDistance,
  //     },
  const [data, setData] = useState(ploggingData);
  const [open, setOpen] = useState(false);
  const [format, setFormat] = useState([]);
  const [image, setImage] = useState(null);
  const [prev, setPrev] = useState(null);
  const imageRef = useRef();

  // 사진 추가
  const handleImageUpload = (e) => {
    const fileArr = e.target.files;
    console.log(fileArr);
    let fileURL = "";
    if (fileArr.length !== 0) {
      // console.log(fileArr[0]);
      setImage(fileArr[0]);
      let reader = new FileReader();
      reader.onload = () => {
        fileURL = reader.result;
        setPrev(fileURL);
        // console.log(fileURL);
      };
      reader.readAsDataURL(fileArr[0]);
    }
  };
  const handleChange = (color) => {
    // console.log(color);
    // const changedColor = handleColor(color.rgb);
    // const lineMap = mapLineRef.current;
    // lineMap.style = changedColor;
    setContentColor(color.hex);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRegister = () => {
    const ima = imageRef.current;
    domtoimage.toBlob(ima).then((blob) => {
      // saveAs(blob, "card.png");
      console.log(blob);
      const formData = new FormData();
      var file = new File([blob], "plogging.png");
      formData.append("image", blob);
      console.log(file);
      // saveAs(file, "card.png");
      registerPic(formData);
    });
  };

  const registerPic = (formData) => {
    postPloggingPicture(
      ploggingId,
      formData,
      (response) => {
        console.log(response);
        navigate("/");
      },
      (fail) => {
        console.log(fail);
      }
    );
  };

  let vh = 0;

  useEffect(() => {
    vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }, []);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={container}
      style={{
        position: "relative",
        textAlign: "center",
        height: "calc(var(--vh, 1vh) * 100)",
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
        <Box width="10%">
          <label htmlFor="image">
            <motion.img
              src={PlusBtn}
              width="21px"
              height="21px"
              whileTap={{ scale: 0.9 }}
            />
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            style={{
              display: "none",
            }}
            onChange={handleImageUpload}
          />
        </Box>
      </Box>
      {/* 사진 박스 */}
      <motion.div
        variants={container}
        animate={{ height: "auto" }}
        style={{
          width: "100%",
          height: "auto",
          // backgroundImage:
          //   prev === null
          //     ? "url('/assets/images/defaultPic.png')"
          //     : `url('${prev}')`,
          // backgroundRepeat: "no-repeat",
          position: "relative",
          zIndex: 1,
        }}
        ref={imageRef}
        onClick={() => {
          if (!imageClicked) setIamgeClicked(true);
          else setIamgeClicked(false);
        }}
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
            zIndex: 1,
          }}
        >
          {format.find((element) => element === 1) !== undefined && (
            // <img
            //   ref={mapLineRef}
            //   src={lineImage}
            //   style={{
            //     position: "absolute",
            //     width: "100%",
            //     height: "100%",
            //     zIndex: 1,
            //     fill: "cover",
            //   }}
            // />
            <svg
              viewBox="0 0 2060 2880"
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              style={{
                zIndex: 2,
                position: "absolute",
              }}
            >
              <path
                fill={contentColor}
                stroke={contentColor}
                d={pathData}
                strokeWidth="35px"
                strokeLinecap="round"
              />
            </svg>
          )}
          {/* 헤더 */}
          <Box
            width="100%"
            direction="row"
            justify="between"
            pad={{
              left: "25px",
              top: "15px",
              right: "25px",
            }}
          >
            <PloggingLogo fill={contentColor} />
            {/* <img
              src={
                contentColor === "white" ? PloggingTitle : PloggingTitleBlack
              }
            /> */}
            <Box justify="end" height="100%">
              {format.find((element) => element === 2) !== undefined && (
                <StyledText text={address} color={contentColor} weight="bold" />
              )}
            </Box>
          </Box>
          {/* 아래 내용 */}
          {format.find((element) => element === 0) !== undefined && (
            <Box
              direction="row"
              align="center"
              justify="around"
              gap="20vw"
              pad={{
                bottom: "25px",
              }}
            >
              <Box align="end" direction="row">
                <StyledText
                  text={data.totalDistance}
                  weight="bold"
                  size="20px"
                  color={contentColor}
                />
                <StyledText size="10px" text={"km"} color={contentColor} />
              </Box>
              <Box align="end" direction="row">
                <StyledText
                  text={timeToString(data.time)}
                  weight="bold"
                  size="20px"
                  color={contentColor}
                />
                <StyledText size="10px" text={"시간"} color={contentColor} />
              </Box>
              <Box align="end" direction="row">
                <StyledText
                  text={data.kcal}
                  weight="bold"
                  size="20px"
                  color={contentColor}
                />
                <StyledText size="10px" text={"kcal"} color={contentColor} />
              </Box>
            </Box>
          )}
        </Box>
        {imageClicked && (
          <Box
            width="100%"
            height="100%"
            align="center"
            justify="center"
            style={{
              background: "rgba(0, 0, 0, 0.53)",
              position: "absolute",
              top: 0,
              left: 0,
            }}
          ></Box>
        )}
        <img
          src={prev === null ? "/assets/images/defaultPic.png" : prev}
          style={{
            width: "100%",
            height: "100%",
            zIndex: 0.5,
            fill: "cover",
          }}
        />
      </motion.div>
      {/* 데이터 셀렉트 박스 */}
      <Box width="100%" height="43%" align="center" gap="large">
        {/* <label
          htmlFor="image"
          style={{
            display: "flex",
            width: "95%",
          }}
        >
          <motion.div
            whileTap={{ scale: 0.9 }}
            style={{
              textTransform: "none",
              fontSize: 16,
              fontWeight: "bold",
              padding: "6px 12px",
              color: "black",
              width: "90%",
              height: "43px",
              border: "none",
              margin: "10px",
              fontFamily: `shsnMedium, sans-serif`,
              backgroundColor: "white",
            }}
          >
            <Box direction="row" justify="between" width="100%">
              내 사진으로 추가하기
              <img src={PlusBtn} />
            </Box>
          </motion.div>
        </label>
        <input
          id="image"
          type="file"
          accept="image/jpg,image/png,image/jpeg,image/gif"
          style={{
            display: "none",
          }}
          onChange={handleImageUpload}
        /> */}
        <Box height="25%" direction="row" justify="center">
          <DataButton
            index={0}
            format={format}
            setFormat={setFormat}
            active={format.some((v) => v === 0) ? true : false}
            child={
              <Box
                align="end"
                justify="between"
                direction="row"
                width="100%"
                height="100%"
                pad={{
                  bottom: "3px",
                }}
              >
                <StyledText text="km" color="white" />
                <StyledText text="H" color="white" />
                <StyledText text="Kcal" color="white" />
              </Box>
            }
          ></DataButton>
          <DataButton
            index={1}
            format={format}
            setFormat={setFormat}
            active={format.some((v) => v === 1) ? true : false}
            child={<img src={CourseBtn} />}
          ></DataButton>
          <DataButton
            index={2}
            format={format}
            setFormat={setFormat}
            active={format.some((v) => v === 2) ? true : false}
            child={
              <Box
                width="100%"
                height="100%"
                align="start"
                justify="end"
                direction="row"
                pad={{
                  top: "3px",
                  right: "3px",
                }}
              >
                서울, 관악
              </Box>
            }
          ></DataButton>
        </Box>
        <Box width="90%" align="end">
          <motion.button
            style={{
              boxShadow: "none",
              textTransform: "none",
              fontSize: 12,
              fontWeight: "bold",
              border: "none",
              color: "black",
              fontFamily: `shsnMedium, sans-serif`,
              margin: "10px",
              backgroundColor: "white",
            }}
            onClick={() => {
              setOpen(true);
            }}
          >
            <Box direction="row" justify="center" align="center">
              <Avatar src={ColorPickerBtn} size="35px" />
              색상 변경
            </Box>
          </motion.button>
        </Box>
        {open && (
          <motion.div
            style={{
              position: "absolute",
              zIndex: 3,
            }}
          >
            <motion.div
              style={{
                position: "fixed",
                top: "50%",
                left: "20%",
              }}
            >
              <button onClick={handleClose}>닫기</button>
              <ChromePicker color={contentColor} onChange={handleChange} />
            </motion.div>
          </motion.div>
        )}
        {/* <ContentChooseButton
          onClick={() => {
            setOpen(true);
          }}
          whileTap={{ scale: 0.9 }}
        >
          <Box direction="row" justify="between">
            컨텐츠 추가하기
            <img src={PlusBtn} />
          </Box>
        </ContentChooseButton> */}
        <BootstrapButton
          style={{
            width: "75%",
            height: "50px",
          }}
          whileTap={{ scale: 0.9 }}
          onClick={handleRegister}
        >
          {"확인"}
        </BootstrapButton>
      </Box>
      {/* <ContentSelectBottomSheet
        open={open}
        onDismiss={() => {
          setOpen(false);
        }}
        format={format}
        setFormat={setFormat}
      /> */}
    </motion.div>
  );
};
