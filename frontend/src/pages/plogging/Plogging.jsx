import React, { useCallback, useContext, useEffect, useState } from "react";
import useInterval from "../../hooks/UseInterval";
import { useGeolocated } from "react-geolocated";
import {
  useLocation,
  useNavigate,
  UNSAFE_NavigationContext as NavigationContext,
} from "react-router-dom";
import { motion } from "framer-motion";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { container, timeToString } from "../../utils/util";
import { Box } from "grommet";
import { StyledText } from "../../components/Common";

const DataBox = ({ label, data }) => {
  return (
    <Box align="center" justify="center">
      {/* 데이터 */}
      <StyledText text={data} size="24px" weight="bold" />
      {/* 라벨 */}
      <StyledText text={label} size="14px" color="#898989" />
    </Box>
  );
};

export const Plogging = () => {
  const [ready, setReady] = useState(false);
  const [tic, setTic] = useState(1);
  const [time, setTime] = useState(0);
  const [mapData, setMapData] = useState({
    latlng: [],
    center: { lng: 127.002158, lat: 37.512847 },
  });

  const [data, setData] = useState({
    kcal: 0,
    totalDistance: 0,
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
  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
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
  }

  // 각도를 라디안으로 변환
  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

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

  // 3초 후 시작
  useInterval(
    () => {
      if (tic === 3) setReady(true);
      setTic((rec) => rec + 1);
      console.log("ready,,,");
    },
    ready ? null : 1000
  );

  //1초마다 시간 갱신
  useInterval(() => {
    setTime(time + 1);
  }, 1000);

  useInterval(() => {
    if (ready && isGeolocationAvailable && isGeolocationEnabled) {
      console.log("location : ", coords);

      const gps = {
        lat: coords.latitude,
        lng: coords.longitude,
      };

      console.log("gps : ", gps);
      // 이전이랑 위치가 같을 때
      if (
        mapData.latlng.length > 0 &&
        mapData.latlng.at(-1).lat === gps.lat &&
        mapData.latlng.at(-1).lng === gps.lng
      ) {
      } else {
        if (time >= 1) {
          setMapData((prev) => {
            return {
              center: gps,
              latlng: [...prev.latlng, gps],
            };
          });
          // 위치가 1개 초과로 저장되었을 때 거리 계산
          if (mapData.latlng.length > 1) {
            console.log("data : ", data);

            let dis = getDistanceFromLatLonInKm(
              mapData.latlng.at(-1).lat,
              mapData.latlng.at(-1).lng,
              gps.lat,
              gps.lng
            );
            console.log("dis: ", dis);
            if (dis > 0) {
              setData((prev) => ({
                kcal: 0,
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
          kcal: 0,
          totalDistance: prev.totalDistance,
        };
      });
    }
  }, null);

  // 거리, 데이터 핸들 useEffect
  useEffect(() => {
    window.addEventListener("beforeunload", preventClose);
    return () => {
      window.removeEventListener("beforeunload", preventClose);
    };
  });
  useBlocker(handleBlockedNavigation, when);
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
      <Box width="100%" height="70%">
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
        </Map>
      </Box>
      {/* 하단 정보 박스 */}
      <Box width="100%">
        {/* 거리, 시간, 칼로리 */}
        <Box
          direction="row"
          width="100%"
          justify="center"
          gap="55px"
          margin={{
            top: "25px",
          }}
        >
          <DataBox label="킬로미터" data={data.totalDistance} />
          <DataBox label="시간" data={timeToString(time)} />
          <DataBox label="칼로리" data={data.kcal} />
        </Box>
      </Box>
    </motion.div>
  );
};
