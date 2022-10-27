import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { container } from "../../utils/util";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { Box } from "grommet";
import { BootstrapButton } from "../../components/common/Buttons";
import { useNavigate } from "react-router-dom";
export const PloggingStart = () => {
  const [loc, setLoc] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
  });

  const navigate = useNavigate();
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        setLoc((prev) => ({
          ...prev,
          center: {
            lat: position.coords.latitude, // 위도
            lng: position.coords.longitude, // 경도
          },
        }));
      },
      (err) => {
        setLoc((prev) => ({
          ...prev,
          errMsg: err.message,
        }));
      }
    );
  }, []);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={container}
      style={{
        width: "100%",
        textAlign: "center",
        height: "calc(94vh - 50px)",
      }}
    >
      {/* 지도 */}
      <Map
        center={loc.center}
        isPanto={true}
        style={{ width: "100%", height: "100%" }}
      >
        <MapMarker
          position={loc.center}
          image={{
            src: `/assets/images/start.png`,
            size: {
              width: 29,
              height: 41,
            }, // 마커이미지의 크기입니다
          }}
        ></MapMarker>
      </Map>
      {/* 주소, 챌린지 선택 박스 */}
      <Box
        width="100%"
        align="center"
        style={{ position: "absolute", top: "8%", zIndex: "15" }}
        gap="medium"
      >
        {/* 주소박스 */}
        <Box
          width="75%"
          height="46px"
          align="center"
          justify="center"
          style={{
            color: "white",
            borderRadius: "10px",
            fontWeight: "bold",
            background: "#57BA83",
          }}
        >
          경기도 용인시 기흥구 신갈동
        </Box>
        {/* 챌린지 선택 박스 */}
        <Box width="75%" direction="row" justify="end">
          <Box
            width="60%"
            height="34px"
            align="start"
            justify="center"
            style={{
              borderRadius: "10px",
              background: "rgba(255, 255, 255, 0.9)",
            }}
          >
            챌린지 도전 중
          </Box>
        </Box>
      </Box>
      {/* 플로깅 시작 버튼 */}
      <Box
        width="100%"
        align="center"
        style={{ position: "absolute", bottom: "7%", zIndex: "15" }}
      >
        <BootstrapButton
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            navigate("/plogging");
          }}
        >
          Plogging!
        </BootstrapButton>
      </Box>
    </motion.div>
  );
};
