import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { container } from "../../utils/util";
import { Map, MapMarker, Polyline } from "react-kakao-maps-sdk";
import { Box, Spinner } from "grommet";
import { BootstrapButton } from "../../components/common/Buttons";
import { useNavigate } from "react-router-dom";
import { PloggingTypeBottomSheet } from "../../components/plogging/PloggingTypeBottomSheet";
import { getNearRecentPloggingList } from "../../apis/ploggingApi";
import { getExistCrewPlogging } from "../../apis/crewApi";
import { useSelector } from "react-redux";

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
  const [loading, setLoading] = useState(true);
  const geocoder = new kakao.maps.services.Geocoder();
  const [ploggingCrews, setPloggingCrews] = useState([]);
  const [recentLog, setRecentLog] = useState([]);
  const User = useSelector((state) => state.user.user);
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

  const handlePloggingStart = () => {
    // () => {
    //   setOpen(true);

    //   // navigate("/plogging", {
    //   //   state: {
    //   //     ploggingType: "crew",
    //   //     roomId: "ef35d9c9-1e7e-4d02-a33d-5ba272b7ea2e",
    //   //   },
    //   // });
    // }

    if (ploggingCrews.length > 0) {
      // 크루 플로깅 선택
      setOpen(true);
    } else {
      navigate("/plogging", {
        state: {
          ploggingType: "single",
          roomId: null,
          crewId: null,
        },
      });
    }
  };

  let vh = 0;

  useEffect(() => {
    vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }, []);
  //hooks
  useEffect(() => {
    if (loading) {
      if (User === null || User === undefined) {
        setLoading(false);
        window.location.href = "/login";
      } else {
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
                setRecentLog(response.data);
                getExistCrewPlogging(
                  (response) => {
                    console.log(response);
                    setPloggingCrews(response.data);
                    setLoading(false);
                  },
                  (fail) => {
                    console.log(fail);
                  }
                );
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
      }
    }
    return () => {
      setLoading(false);
    };
  }, []);
  if (loading) return <Spinner />;
  else
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={container}
        style={{
          position: "relative",
          width: "100%",
          textAlign: "center",
          height: "calc(var(--vh, 1vh) * 100 - 50px)",
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
          {recentLog.length > 0 &&
            recentLog.map((log, index) => {
              return (
                <Polyline
                  key={index}
                  path={[log]}
                  strokeWeight={5} // 선의 두께 입니다
                  strokeColor={"#030ff1"} // 선의 색깔입니다
                  strokeOpacity={0.7} // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
                  strokeStyle={"solid"} // 선의 스타일입니다
                />
              );
            })}
        </Map>
        {/* 주소, 챌린지 선택 박스 */}
        <Box
          width="100%"
          align="center"
          style={{ position: "absolute", top: "0", zIndex: "3" }}
          gap="medium"
        >
          {/* 주소박스 */}
          <Box
            width="100%"
            height="46px"
            align="center"
            justify="center"
            style={{
              color: "white",
              fontWeight: "bold",
              background: "rgba(0, 0, 0, 0.4)",
              boxShadow: "8px 8px 8px -8px rgb(0 0 0 / 0.2)",
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
          style={{ position: "absolute", bottom: "9%", zIndex: "3" }}
        >
          <BootstrapButton
            whileTap={{ scale: 0.9 }}
            onClick={handlePloggingStart}
          >
            Plogging!
          </BootstrapButton>
        </Box>
        <PloggingTypeBottomSheet
          open={open}
          onDismiss={handleClose}
          crews={ploggingCrews}
        />
      </motion.div>
    );
};
