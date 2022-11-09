import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { container } from "../../utils/util";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { Box } from "grommet";
import { BootstrapButton } from "../../components/common/Buttons";
import { useNavigate } from "react-router-dom";
import { PloggingTypeBottomSheet } from "../../components/plogging/PloggingTypeBottomSheet";
import { getNearRecentPloggingList } from "../../apis/ploggingApi";
export const PloggingStart = () => {
  //variabales
  const [loc, setLoc] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
  });
  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState();
  const navigate = useNavigate();
  const { kakao } = window;
  const geocoder = new kakao.maps.services.Geocoder();
  // function
  const handleClose = () => {
    setOpen(false);
  };

  const callback = (result, status) => {
    if (status === kakao.maps.services.Status.OK) {
      console.log(result);
      const addName = result[0].address.address_name.split(" ");
      console.log(addName);
      setAddress((prev) => (prev = addName[1] + ", " + addName[0]));
    }
  };

  //hooks
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
        var coord = new kakao.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );
        geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
        getNearRecentPloggingList(
          { lat: position.coords.latitude, lng: position.coords.longitude },
          (response) => {
            console.log(response);
          },
          (fail) => {
            console.log(fail);
          }
        );
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
        position: "relative",
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
        style={{ position: "absolute", top: "5%", zIndex: "3" }}
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
          {address ? address : "어디일까요?"}
        </Box>
        {/* 챌린지 선택 박스 */}
        {/* <Box width="75%" direction="row" justify="end">
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
        </Box> */}
      </Box>
      {/* 플로깅 시작 버튼 */}
      <Box
        width="100%"
        align="center"
        style={{ position: "absolute", bottom: "7%", zIndex: "3" }}
      >
        <BootstrapButton
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            // setOpen(true);
            navigate("/plogging", {
              state: {
                ploggingType: "single",
                roomId: null,
              },
            });
            // navigate("/plogging", {
            //   state: {
            //     ploggingType: "crew",
            //     roomId: "029eb15a-078e-4e32-8e22-68c080e44d65",
            //   },
            // });
          }}
        >
          Plogging!
        </BootstrapButton>
      </Box>
      <PloggingTypeBottomSheet open={open} onDismiss={handleClose} />
    </motion.div>
  );
};
