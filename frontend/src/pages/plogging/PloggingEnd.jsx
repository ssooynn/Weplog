import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import {
  calcMapLevel,
  container,
  getDistanceFromLatLonInKm,
  timeToString,
} from "../../utils/util";
import { Map, Polyline } from "react-kakao-maps-sdk";
import { Box, Spinner } from "grommet";
import { DataBox } from "./Plogging";
import Charact from "../../assets/images/char.gif";
import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";
import { BootstrapButton, WhiteButton } from "../../components/common/Buttons";
import { StyledText } from "../../components/Common";
export const PloggingEnd = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { ploggingType, ploggingData } = location.state;
  const [data, setData] = useState(ploggingData);
  const [lineImage, setLineImage] = useState(null);
  const [register, setRegister] = useState(false);
  const [mapLevel, setMapLevel] = useState(3);
  const [mapCenter, setMapCenter] = useState();
  const [loading, setLoading] = useState(true);
  const lineRef = useRef();
  // ploggingType: "",
  //     ploggingData: {
  //       latlng: mapData.latlng,
  //       kcal: data.kcal,
  //       time: time,
  //       totalDistance: data.totalDistance,
  //       maxLng: 0,
  //       minLng: 0,
  //       maxLat: 0,
  //       minLat: 0,
  //     },

  useEffect(() => {
    if (loading) {
      let maxLat = ploggingData.maxLat;
      let maxLng = ploggingData.maxLng;
      let minLat = ploggingData.minLat;
      let minLng = ploggingData.minLng;
      let latDistance = getDistanceFromLatLonInKm(
        maxLat.lat,
        maxLat.lng,
        minLat.lat,
        minLat.lng
      );

      let lngDistance = getDistanceFromLatLonInKm(
        maxLng.lat,
        maxLng.lng,
        minLng.lat,
        minLng.lng
      );
      let maxDistance = Math.max(latDistance, lngDistance);
      let center = {
        lat: parseFloat((maxLat.lat + minLat.lat) / 2.0).toFixed(8),
        lng: parseFloat((maxLng.lng + minLng.lng) / 2.0).toFixed(8),
      };
      console.log(center);
      setMapCenter(center);
      setLoading(false);
      setMapLevel(calcMapLevel(maxDistance));
    }
    return () => {
      setLoading(false);
    };
  }, []);

  const handlePageChange = () => {
    const line = lineRef.current;
    line.style.background = "none";
    const filter = (line) => {
      if (line.style) {
        line.style.background = "none";
        if (line.style.stroke) {
          line.style.stroke = "rgb(255, 255, 255)";
        }
        if (line.style.color) {
          line.style.color = "rgb(255, 255, 255)";
        }
        if (line.style.height === "6px") {
          line.style = {};
        }
        if (line.style.fontFamily) {
          line.style.fontSize = 0;
        }
      }
      return line.tagName !== "IMG" && line.tagName !== "SVG";
    };
    // domtoimage.toBlob(line, { filter: filter }).then((blob) => {
    //   console.log(blob);
    //   setLineImage(blob);
    //   saveAs(blob, "card.png");
    //   // navigate("/plogging/register", {
    //   //   state: {
    //   //     ploggingType: ploggingType,
    //   //     ploggingData: ploggingData,
    //   //     lineImage: lineImage,
    //   //   },
    //   // });
    // });

    domtoimage.toSvg(line, { filter: filter }).then(function (dataUrl) {
      /* do something */
      // console.log(dataUrl);
      setLineImage(dataUrl);
      navigate("/plogging/register", {
        state: {
          ploggingType: ploggingType,
          ploggingData: ploggingData,
          lineImage: dataUrl,
        },
      });
    });
  };
  if (loading) return <Spinner />;
  else
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
        <Box width="100%" height="7%" align="center" justify="center">
          <StyledText
            text="지구가 더 깨끗해졌어요!"
            size="18px"
            weight="bold"
            style={{
              fontFamily: `"shsnBold", sans-serif`,
            }}
          />
        </Box>
        <Box width="100%" height="63%" ref={lineRef}>
          <Map
            level={mapLevel}
            center={mapCenter}
            isPanto={true}
            style={{ width: "100%", height: "100%" }}
          >
            {ploggingData.latlng && (
              <Polyline
                path={[ploggingData.latlng]}
                strokeWeight={5} // 선의 두께 입니다
                strokeColor={"#030ff1"} // 선의 색깔입니다
                strokeOpacity={0.7} // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
                strokeStyle={"solid"} // 선의 스타일입니다
                zIndex={100}
              />
            )}
            {ploggingData.latlng && (
              <Polyline
                path={[ploggingData.latlng]}
                strokeWeight={5} // 선의 두께 입니다
                strokeColor={"#ffffff"} // 선의 색깔입니다
                strokeOpacity={0.7} // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
                strokeStyle={"solid"} // 선의 스타일입니다
                zIndex={1}
              />
            )}
          </Map>
        </Box>
        {/* 데이터 박스 */}
        <motion.div
          transition={{ duration: 0.25 }}
          // animate={{ height: register ? "50%" : "35%" }}
          style={{
            background: "white",
            width: "100%",
            height: "30%",
            position: "relative",
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
          <Box width="100%" height="100%" align="center" justify="around">
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
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  handlePageChange();
                }}
              >
                {!register ? "다음" : "플로깅 완료!"}
              </BootstrapButton>

              {/* <WhiteButton
              style={{
                width: "75%",
                height: "50px",
              }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                navigate("/");
              }}
            >
              {!register ? "메인으로" : "돌아가기"}
            </WhiteButton> */}
            </Box>
          </Box>
        </motion.div>
      </motion.div>
    );
};
