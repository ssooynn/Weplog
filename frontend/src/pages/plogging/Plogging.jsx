import React, { useCallback, useContext, useEffect, useState } from "react";
import useInterval from "../../hooks/UseInterval";
import { useGeolocated } from "react-geolocated";
import {
  useLocation,
  useNavigate,
  UNSAFE_NavigationContext as NavigationContext,
  Navigate,
} from "react-router-dom";
import { motion } from "framer-motion";
import { Map, MapMarker, Polyline } from "react-kakao-maps-sdk";
import {
  calcCalories,
  calcDistance,
  container,
  timeToString,
} from "../../utils/util";
import { Avatar, Box } from "grommet";
import { StyledText } from "../../components/Common";
import StopBtn from "../../assets/images/stop.png";
import PauseBtn from "../../assets/images/pause.png";
import PlayBtn from "../../assets/images/play.png";
import { PloggingButton } from "../../components/common/Buttons";
import { AlertDialog } from "../../components/AlertDialog";
export const DataBox = ({ label, data }) => {
  return (
    <Box align="center" justify="center">
      {/* 데이터 */}
      <StyledText text={data} size="24px" weight="bold" />
      {/* 라벨 */}
      <StyledText text={label} size="14px" color="#898989" />
    </Box>
  );
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export const Plogging = () => {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [tic, setTic] = useState(3);
  const [time, setTime] = useState(0);
  const [mapData, setMapData] = useState({
    latlng: [],
    center: { lng: 127.002158, lat: 37.512847 },
  });

  const [data, setData] = useState({
    kcal: 0,
    totalDistance: 0,
  });
  const [walking, setWalking] = useState(true);
  const [user, setUser] = useState({
    info: {
      weight: 60,
    },
  });
  const locations = useLocation();
  const [open, setOpen] = useState(false);
  const [when, setWhen] = useState(true);
  const [lastLocation, setLastLocation] = useState(null);
  const [confirmedNavigation, setConfirmedNavigation] = useState(false);
  // const [confirmedNavigation, setConfirmedNavigation] = useState(false);
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 500,
      },
      watchPosition: true,
    });

  const preventClose = (e) => {
    e.preventDefault();
    e.returnValue = "";
  };

  // 두 좌표간 거리 계산
  const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    d = Math.round(d * 1000);
    return d;
  };

  // 각도를 라디안으로 변환
  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  // 시간에 따른 칼로리 구함.
  const handleCalories = () => {
    // kcal = MET * (3.5 * kg * min) * 5 / 1000
    return calcCalories(user.info.weight, time);
  };

  const handleDistance = () => {
    return calcDistance(data.totalDistance);
  };

  // 뒤로가기 방지
  function useBlocker(blocker, when = true) {
    const { navigator } = useContext(NavigationContext);

    useEffect(() => {
      if (!when) {
        return;
      }
      const unblock = navigator.block((tx) => {
        const autoUnblockingTx = {
          ...tx,
          retry() {
            // Automatically unblock the transition so it can play all the way
            // through before retrying it. T O D O: Figure out how to re-enable
            // this block if the transition is cancelled for some reason.
            unblock();
            tx.retry();
          },
        };

        blocker(autoUnblockingTx);
      });

      // eslint-disable-next-line consistent-return
      return unblock;
    }, [navigator, blocker]);
  }

  // 이동 방지
  const handleBlockedNavigation = useCallback(
    (tx) => {
      if (!confirmedNavigation && tx.location.pathname !== locations.pathname) {
        confirmNavigation();
        setOpen(true);
        setLastLocation(tx);
        return false;
      }
      return true;
    },
    [confirmedNavigation, locations.pathname]
  );

  // 방지 해제
  const confirmNavigation = useCallback(() => {
    setOpen(false);
    setWhen(false);
    setConfirmedNavigation(true);
  }, []);

  // 나가기 방지 다시 적용
  const unconfirmNavigation = useCallback(() => {
    setOpen(false);
    setWhen(true);
    setConfirmedNavigation(false);
  }, []);

  const handlePloggingFinish = () => {
    navigate("/plogging/end", {
      state: {
        ploggingType: "",
        ploggingData: {
          latlng: mapData.latlng,
          kcal: data.kcal,
          time: time,
          totalDistance: data.totalDistance,
        },
      },
    });
  };

  // 3초 후 시작
  useInterval(
    () => {
      if (tic === 1) setReady(true);
      setTic((rec) => rec - 1);
      console.log("ready,,,");
    },
    ready ? null : 1000
  );

  //1초마다 시간 갱신
  useInterval(
    () => {
      setTime(time + 1);
      // setData((prev) => ({
      //   kcal: handleCalories(),
      //   totalDistance: prev.totalDistance,
      // }));
    },
    ready && walking ? 1000 : null
  );

  // 실시간 위치를 찍어주는 함수
  useInterval(
    () => {
      if (walking && ready && isGeolocationAvailable && isGeolocationEnabled) {
        // console.log("location : ", coords);

        const gps = {
          lat: coords.latitude,
          lng: coords.longitude,
        };

        // console.log("gps : ", gps);
        // 이전이랑 위치가 같을 때
        if (
          mapData.latlng.length > 0 &&
          mapData.latlng.at(-1).lat === gps.lat &&
          mapData.latlng.at(-1).lng === gps.lng
        ) {
        } else {
          setMapData((prev) => {
            return {
              center: gps,
              latlng: [...prev.latlng, gps],
            };
          });
          if (time >= 1) {
            // 위치가 1개 초과로 저장되었을 때 거리 계산
            if (mapData.latlng.length > 1) {
              // console.log("data : ", data);

              let dis = getDistanceFromLatLonInKm(
                mapData.latlng.at(-1).lat,
                mapData.latlng.at(-1).lng,
                gps.lat,
                gps.lng
              );
              // console.log("dis: ", dis);
              if (dis > 0) {
                setData((prev) => ({
                  kcal: handleCalories(time),
                  totalDistance: prev.totalDistance + dis,
                }));
              }
              // idle = 1;
            }
          }
        }

        // setI((prev) => {
        //   return prev + 0.001;
        // });
        // 웹소켓 발행
        // if (client != null && rideType === "group") {
        //   publishLocation(gps.lat, gps.lng);
        // }
      } else {
        // idle = idle + 1;
        setData((prev) => {
          return {
            kcal: prev.kcal,
            totalDistance: prev.totalDistance,
          };
        });
      }
    },
    ready ? 1000 : null
  );

  // 거리, 데이터 핸들 useEffect
  useEffect(() => {
    window.addEventListener("beforeunload", preventClose);
    return () => {
      window.removeEventListener("beforeunload", preventClose);
    };
  });
  useBlocker(handleBlockedNavigation, when);

  if (!ready)
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={container}
        style={{
          width: "100%",
          textAlign: "center",
          height: "100vh",
          background: "#57BA83",
          color: "white",
          fontSize: "56px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <motion.div
          style={{
            width: "100%",
            textAlign: "center",
            align: "center",
          }}
          variants={item}
          transition={{
            ease: "easeInOut",
            duration: 0.9, // 애니메이션이 총 걸리는 시간
            repeat: 3, // 3번 반복
            // repeat: Infinity,
            delay: 0.1,
            repeatType: "loop", //   "loop" | "reverse" | "mirror";
          }}
        >
          {tic}
        </motion.div>
      </motion.div>
    );
  else
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={container}
        style={{
          width: "100%",
          textAlign: "center",
          height: "100vh",
        }}
      >
        {/* 지도 박스 */}
        <Box width="100%" height="80%">
          {/* 지도 */}
          <Map
            center={mapData.center}
            isPanto={true}
            style={{ width: "100%", height: "100%" }}
          >
            <MapMarker
              position={mapData.center}
              image={{
                src: `/assets/images/start.png`,
                size: {
                  width: 29,
                  height: 41,
                }, // 마커이미지의 크기입니다
              }}
            ></MapMarker>
            {mapData.latlng && (
              <Polyline
                path={[mapData.latlng]}
                strokeWeight={5} // 선의 두께 입니다
                strokeColor={"#030ff1"} // 선의 색깔입니다
                strokeOpacity={0.7} // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
                strokeStyle={"solid"} // 선의 스타일입니다
              />
            )}
          </Map>
        </Box>
        {/* 하단 정보 박스 */}
        <Box
          width="100%"
          height="30%"
          align="center"
          justify="center"
          gap="40px"
          background="#fff"
          round={{ size: "large", corner: "top" }}
          style={{
            position: "absolute",
            bottom: 0,
            zIndex: "15",
            boxShadow: "0 4px 4px 10px rgb(172 172 172 / 0.3)",
          }}
        >
          {/* 거리, 시간, 칼로리 */}
          <Box direction="row" width="100%" justify="center" gap="55px">
            <DataBox label="킬로미터" data={handleDistance()} />
            <DataBox label="시간" data={timeToString(time)} />
            <DataBox label="칼로리" data={data.kcal} />
          </Box>
          {/* 정지, 일시정지 버튼 */}
          <Box width="100%" direction="row" justify="center" gap="25px">
            <PloggingButton
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                confirmNavigation();
                setOpen(true);
              }}
            >
              <Avatar
                background="#000000"
                size="73px"
                style={{
                  boxShadow: "4px 4px 4px -4px rgb(0 0 0 / 0.2)",
                }}
              >
                <img src={StopBtn} />
              </Avatar>
            </PloggingButton>
            <PloggingButton
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                if (walking === true) setWalking(false);
                else setWalking(true);
              }}
            >
              <Avatar
                background={walking ? "#FFD100" : "#57BA83"}
                size="73px"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  boxShadow: "4px 4px 4px -4px rgb(0 0 0 / 0.2)",
                }}
              >
                <img src={walking ? PauseBtn : PlayBtn} />
              </Avatar>
            </PloggingButton>
          </Box>
        </Box>
        <AlertDialog
          open={open}
          handleClose={() => {
            unconfirmNavigation();
            setOpen(false);
          }}
          handleAction={() => {
            handlePloggingFinish();
          }}
          title="플로깅 종료"
          desc="플로깅을 종료하시겠습니까?"
          cancel="취소"
          accept="종료"
        />
      </motion.div>
    );
};
