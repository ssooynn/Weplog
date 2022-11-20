import React, { useEffect, useRef, useState, Suspense } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, useFBX } from "@react-three/drei";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { useLocation, useNavigate } from "react-router-dom";
import {
  calcMapLevel,
  container,
  getDistanceFromLatLonInKm,
  plomonSelector,
  timeToString,
} from "../../utils/util";
import { Map, Polyline } from "react-kakao-maps-sdk";
import { Box, Spinner } from "grommet";
import { DataBox } from "./Plogging";
import Charact from "../../assets/images/char.gif";
import { BootstrapButton, WhiteButton } from "../../components/common/Buttons";
import { StyledText } from "../../components/Common";
import $ from "jquery";
import { Plomon } from "../../components/plomon/Plomon";
import { useSelector } from "react-redux";
window.jQuery = $;
window.$ = $;

// const Plomon = () => {
//   const fbx = useFBX("/dino02.fbx");
//   return <primitive object={fbx} />;
// };

export const PloggingEnd = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { ploggingType, ploggingData, ploggingId } = location.state;
  const [data, setData] = useState(ploggingData);
  const [lineImage, setLineImage] = useState(null);
  const [lineImageBlack, setLineImageBlack] = useState(null);
  const [register, setRegister] = useState(false);
  const [mapLevel, setMapLevel] = useState(3);
  const [mapCenter, setMapCenter] = useState();
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState();
  const lineRef = useRef();
  const [pathData, setPathData] = useState();
  const { kakao } = window;
  const geocoder = new kakao.maps.services.Geocoder();
  const User = useSelector((state) => state.user.user);

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

  const callback = (result, status) => {
    if (status === kakao.maps.services.Status.OK) {
      console.log(result);
      const addName = result[0].address.address_name.split(" ");
      console.log(addName);
      setAddress((prev) => (prev = addName[1] + ", " + addName[0]));
    }
  };

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
        lat: parseFloat((maxLat.lat + minLat.lat) / 2.0).toFixed(7),
        lng: parseFloat((maxLng.lng + minLng.lng) / 2.0).toFixed(7),
      };
      console.log(center);
      setMapCenter(center);
      setLoading(false);
      setMapLevel(calcMapLevel(maxDistance));
      var coord = new kakao.maps.LatLng(data.latlng[0].lat, data.latlng[0].lng);
      geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
    }

    return () => {
      setLoading(false);
    };
  }, []);

  // const filter = (line) => {
  //   // if (line.style) {
  //   //   line.style.background = "none";
  //   //   if (line.style.stroke) {
  //   //     line.style.stroke = "rgb(255, 255, 255)";
  //   //   }
  //   //   if (line.style.color) {
  //   //     line.style.color = "rgb(255, 255, 255)";
  //   //   }
  //   //   if (line.style.height === "6px") {
  //   //     line.style = {};
  //   //   }
  //   //   if (line.style.fontFamily) {
  //   //     line.style.fontSize = 0;
  //   //   }
  //   // }
  //   // console.log(line);
  //   // console.log(line.toString());
  //   if (line.toString() === "[object SVGPathElement]") {
  //     console.log(line);
  //     setPathData((prev) => (prev = line));
  //     return line;
  //   }
  //   return line;
  //   // return line.tagName === "svg" || line.tagName === "path";
  // };

  const handlePageChange = () => {
    // if (ploggingData.time < 60) {
    //   navigate("/");
    // } else {
    const line = $("path[id*='daum-maps-shape']")[0].attributes[2].value;
    console.log(line);

    navigate("/plogging/register", {
      state: {
        ploggingType: ploggingType,
        ploggingData: ploggingData,
        ploggingId: ploggingId,
        address: address,
        pathData: line,
      },
    });
    // }

    // line.style.background = "none";
    // // domtoimage.toBlob(line, { filter: filter }).then((blob) => {
    // //   console.log(blob);
    // //   setLineImage(blob);
    // //   saveAs(blob, "card.png");
    // //   // navigate("/plogging/register", {
    // //   //   state: {
    // //   //     ploggingType: ploggingType,
    // //   //     ploggingData: ploggingData,
    // //   //     lineImage: lineImage,
    // //   //   },
    // //   // });
    // // });

    // const lineBlack = lineRef.current;
    // lineBlack.style.background = "none";
    // const filterBlack = (lineBlack) => {
    //   if (lineBlack.style) {
    //     lineBlack.style.background = "none";
    //     if (lineBlack.style.stroke) {
    //       lineBlack.style.stroke = "rgb(0, 0, 0)";
    //     }
    //     if (lineBlack.style.color) {
    //       lineBlack.style.color = "rgb(0, 0, 0)";
    //     }
    //     if (lineBlack.style.height === "6px") {
    //       lineBlack.style = {};
    //     }
    //     if (lineBlack.style.fontFamily) {
    //       lineBlack.style.fontSize = 0;
    //     }
    //   }
    //   return lineBlack.tagName !== "IMG" && lineBlack.tagName !== "SVG";
    // };

    // domtoimage.toSvg(line, { filter: filter }).then(function (dataUrl) {
    //   /* do something */
    //   // console.log(dataUrl);
    //   setLineImage(dataUrl);
    //   // saveAs(dataUrl, "card.svg");
    //   // console.log(pathData);
    //   navigate("/plogging/register", {
    //     state: {
    //       ploggingType: ploggingType,
    //       ploggingData: ploggingData,
    //       lineImage: lineImage,
    //       address: address,
    //       PathData: pathData,
    //     },
    //   });
    //   // domtoimage
    //   //   .toSvg(lineBlack, { filter: filterBlack })
    //   //   .then(function (dataUrlBlack) {
    //   //     console.log(line.toString());
    //   //     const mapref = ReactDOMServer.renderToString(line);
    //   //     navigate("/plogging/register", {
    //   //       state: {
    //   //         ploggingType: ploggingType,
    //   //         ploggingData: ploggingData,
    //   //         lineImage: dataUrl,
    //   //         lineImageBlack: dataUrlBlack,
    //   //         address: address,
    //   //         MapRef: mapref,
    //   //       },
    //   //     });
    //   //   });
    // });
  };

  let vh = 0;

  useEffect(() => {
    vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
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
          textAlign: "center",
          height: "calc(var(--vh, 1vh) * 100)",
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
        <Box width="100%" height="63%">
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
                ref={lineRef}
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
          {/* <div
            style={{
              width: "50%",
              height: "300px",
              position: "absolute",
              left: "55%",
              top: "30%",
              zIndex: "15",
            }}
          > */}
          {/* <Canvas camera={{ position: [0, 50, 120] }} flat linear>
              {/* <ambientLight intensity={0.4} /> */}
          {/* <spotLight position={[0, 50, 200]} angle={0.15} penumbra={1} /> */}
          {/* <pointLight position={[0, 60, 400]} /> */}
          {/* <pointLight position={[0, 150, 250]} /> 
              <Suspense fallback={null}>
                <Plomon />
                <Environment preset="sunset" />
              </Suspense>
            </Canvas> */}
          <img
            src={`/assets/plomons/${plomonSelector(User.plomon)}.gif`}
            style={{
              width: "210px",
              fill: "cover",
              position: "absolute",
              right: 0,
              top: "-100px",
              zIndex: "15",
            }}
          />
          {/* </div> */}
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
                onClick={handlePageChange}
              >
                {"플로깅 완료!"}
                {/* {ploggingData.time < 60 ? "홈으로" : "플로깅 완료!"} */}
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
