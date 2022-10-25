import React, { useState } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { container, timeToString } from "../../utils/util";
import { Map, Polyline } from "react-kakao-maps-sdk";
import { Box } from "grommet";
import { DataBox } from "./Plogging";
import Charact from "../../assets/images/char.gif";
import { BootstrapButton, WhiteButton } from "../../components/common/Buttons";
export const PloggingEnd = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { ploggingType, ploggingData } = location.state;
  const [data, setData] = useState(ploggingData);
  const [register, setRegister] = useState(false);
  // ploggingType: "",
  //     ploggingData: {
  //       latlng: mapData.latlng,
  //       kcal: data.kcal,
  //       time: time,
  //       totalDistance: data.totalDistance,
  //     },
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={container}
      style={{
        position: "relative",
        textAlign: "center",
        height: "calc(94vh - 50px)",
      }}
    >
      <Box width="100%" height="65%">
        <Map
          center={ploggingData.latlng[parseInt(ploggingData.latlng.length / 2)]}
          isPanto={true}
          style={{ borderRadius: "25px", width: "100%", height: "100%" }}
        >
          {ploggingData.latlng && (
            <Polyline
              path={[ploggingData.latlng]}
              strokeWeight={5} // 선의 두께 입니다
              strokeColor={"#030ff1"} // 선의 색깔입니다
              strokeOpacity={0.7} // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
              strokeStyle={"solid"} // 선의 스타일입니다
            />
          )}
        </Map>
      </Box>
      {/* 데이터 박스 */}

      <Box
        width="100%"
        height={register ? "50%" : "35%"}
        align="center"
        justify="center"
        background="#fff"
        style={{
          position: "absolute",
          bottom: 0,
          zIndex: "12",
        }}
      >
        <img
          src={Charact}
          style={{
            width: "200px",
            fill: "cover",
            position: "absolute",
            right: 0,
            top: "-150px",
            zIndex: "15",
          }}
        />
        <Box direction="row" width="100%" justify="center" gap="55px">
          <DataBox label="킬로미터" data={ploggingData.totalDistance} />
          <DataBox label="시간" data={timeToString(ploggingData.time)} />
          <DataBox label="칼로리" data={ploggingData.kcal} />
        </Box>
        <Box width="100%" align="center">
          <BootstrapButton
            style={{
              width: "75%",
              height: "50px",
            }}
            whileTap={{ scale: 1.2 }}
            onClick={() => {
              setRegister(true);
            }}
          >
            {!register ? "Plog 등록하기" : "플로깅 완료!"}
          </BootstrapButton>
          {!register && (
            <WhiteButton
              style={{
                width: "75%",
                height: "50px",
              }}
              whileTap={{ scale: 1.2 }}
              onClick={() => {
                navigate("/");
              }}
            >
              메인으로
            </WhiteButton>
          )}
        </Box>
      </Box>
    </motion.div>
  );
};
