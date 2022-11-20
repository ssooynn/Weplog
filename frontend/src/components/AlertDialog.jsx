import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "./Button";
// import { Avatar, Button as GBtn, Spinner } from "grommet";
// import { Button as MBtn, ThemeProvider } from "@mui/material";
import { Box, Image, Text } from "grommet";
import styled from "styled-components";
import { Paper } from "@mui/material";
// import styled from "styled-components";
// import { CourseMap, StarBox, StyledText } from "./Common";
import TrashBtn from "../assets/images/trash.png";
import DishBtn from "../assets/images/dish.png";
import GarbageBtn from "../assets/images/garbage.png";
import DesBtn from "../assets/images/destination.png";
import { motion } from "framer-motion";
import { saveAs } from "file-saver";
import { ReactComponent as DownIcon } from "../assets/icons/download.svg";
import { useRef } from "react";
import domtoimage from "dom-to-image";
import { useSelector } from "react-redux";
import $ from "jquery";
window.jQuery = $;
window.$ = $;
// import SoloBtn from "../assets/images/solo.png";
// import GroupBtn from "../assets/images/group.png";
// import { StyledHorizonTable } from "./HorizontalScrollBox";
// import { useNavigate } from "react-router-dom";
// import { ChooseSoloGroupBar, HeaderBox } from "./ChooseRideTypeBar";
// import { BootstrapButton, ExitButton, WhiteButton } from "./Buttons";
// import { Map, MapMarker, Polyline, useMap } from "react-kakao-maps-sdk";
// import { categorys, markerCategorys, weathers } from "../utils/util";
// import { NearInfoDialog } from "./NearInfoDialog";
// import { theme } from "../pages/CourseList";
// import { useEffect } from "react";
// import { getWeather } from "../utils/api/weatherApi";
// import { ResponsiveLine } from "@nivo/line";
// import { motion } from "framer-motion";
// import { getReivewDetail } from "../utils/api/reviewApi";
const ArticleBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 80vw;
  border-radius: 15px;
`;

const ArticleBoxImg = styled.img`
  width: 100%;
  border-radius: 15px 15px 0 0;
`;

const ArticleBoxProfileArea = styled.div`
  padding: 3% 8%;
  display: flex;
  flex-direction: row;
  height: 8vh;
`;

const ArticleBoxProfileImgArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ArticleBoxProfileImg = styled.img`
  width: 6vh;
  height: 6vh;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid #e7e7e7;
`;

const ArticleBoxProfileTextArea = styled.div`
  padding-left: 1vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ArticleBoxProfileName = styled.div`
  font-size: 15px;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

const ArticleBoxProfileTime = styled.div`
  font-size: 13px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

function getPrettyPostingTime(PostingTime) {
  if (PostingTime) {
    let today = new Date();
    let nowYear = Number(today.getFullYear());
    let nowMonth = Number(today.getMonth()) + 1;
    let nowDay = Number(today.getDate());
    let nowHour = Number(today.getHours());
    let nowMin = Number(today.getMinutes());

    let postingYear = Number(PostingTime.slice(0, 4));
    let postingMonth = Number(PostingTime.slice(5, 7));
    let postingDay = Number(PostingTime.slice(8, 10));
    let postingHour = Number(PostingTime.slice(11, 13));
    let postingMin = Number(PostingTime.slice(14, 16));

    if (nowYear === postingYear && nowMonth === postingMonth) {
      if (nowDay === postingDay) {
        if (nowHour === postingHour) {
          return String(nowMin - postingMin) + "분전";
        } else {
          return String(nowHour - postingHour) + "시간전";
        }
      } else {
        return String(nowDay - postingDay) + "일전";
      }
    } else {
      return (
        String(postingYear) +
        "년 " +
        String(postingMonth) +
        "월 " +
        String(postingDay) +
        "일"
      );
    }
  } else {
    return "";
  }
}

export const AlertDialog = ({
  open,
  handleClose,
  handleAction,
  title,
  desc,
  cancel,
  accept,
  register,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle
        id="alert-dialog-title"
        style={{
          fontFamily: "gwmd",
        }}
      >
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          id="alert-dialog-description"
          style={{
            fontFamily: "gwmd",
          }}
        >
          {desc}
        </DialogContentText>
      </DialogContent>
      <Box
        direction="row"
        justify="center"
        style={{
          fontFamily: "gwmd",
        }}
      >
        {accept !== undefined &&
          (register ? (
            <Button
              whileTap={{ scale: 0.9 }}
              smallgreen="true"
              onClick={handleAction}
              autoFocus
            >
              {accept}
            </Button>
          ) : (
            <Button
              whileTap={{ scale: 0.9 }}
              smallpink="true"
              onClick={handleAction}
              autoFocus
            >
              {accept}
            </Button>
          ))}
      </Box>
    </Dialog>
  );
};

export const DetailDialog = ({ open, handleClose, plogData }) => {
  console.log(plogData);
  const ref = useRef(null);
  async function url2blob(url) {
    try {
      const data = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      const blob = await data.blob();
      saveAs(
        blob,
        `weplog_${plogData.nickname}_${plogData.createdDate.split("T")[0]}.png`
      );
      console.log("Success.");
    } catch (err) {
      console.error(err.name, err.message);
    }
  }
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        style: { borderRadius: 15 },
      }}
      style={{
        backgroundColor: "none",
      }}
    >
      <Box
        direction="row"
        justify="center"
        round="15px"
        style={{
          fontFamily: "gwmd",
        }}
      >
        <ArticleBox>
          <ArticleBoxImg src={plogData.imageUrl} />
          <ArticleBoxProfileArea>
            <ArticleBoxProfileImgArea>
              <ArticleBoxProfileImg src={plogData.profileImageUrl} />
            </ArticleBoxProfileImgArea>
            <ArticleBoxProfileTextArea>
              <ArticleBoxProfileName>{plogData.nickname}</ArticleBoxProfileName>
              <ArticleBoxProfileTime>
                {getPrettyPostingTime(plogData.createdDate)}
              </ArticleBoxProfileTime>
            </ArticleBoxProfileTextArea>
            <motion.button
              style={{ marginLeft: "40px", background: "none", border: "none" }}
              onClick={() => {
                // url2blob(plogData.imageUrl);
                saveAs(
                  plogData.imageUrl,
                  `weplog_${plogData.nickname}_${
                    plogData.createdDate.split("T")[0]
                  }.png`
                );
                // try {
                //   const data = await fetch(url);
                //   const blob = await data.blob();
                //   saveAs(
                //     blob,
                //     `weplog_${plogData.nickname}_${
                //       plogData.createdDate.split("T")[0]
                //     }.png`
                //   );
                //   console.log("Success.");
                // } catch (err) {
                //   console.error(err.name, err.message);
                // }

                // $.get(`blob:${plogData.imageUrl}`).then(function (data) {
                //   var blob = new Blob([data], { type: "image/png" });
                //   saveAs(
                //     blob,
                //     `weplog_${plogData.nickname}_${
                //       plogData.createdDate.split("T")[0]
                //     }.png`
                //   );
                // });
              }}
            >
              <DownIcon />
            </motion.button>
          </ArticleBoxProfileArea>
        </ArticleBox>
      </Box>
    </Dialog>
  );
};

export const MarkerDialog = ({ open, handleClose, handleMarker }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle
        id="alert-dialog-title"
        style={{
          fontFamily: "gwmd",
        }}
      >
        마커 선택
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          id="alert-dialog-description"
          style={{
            fontFamily: "gwmd",
          }}
        >
          마커를 선택하세요
        </DialogContentText>
        <Box
          direction="row"
          align="center"
          justify="center"
          height="150px"
          gap="medium"
        >
          <Box direction="column" align="center" justify="center">
            <Image
              fit="cover"
              src={TrashBtn}
              onClick={() => {
                handleMarker("ONE");
              }}
              style={{ width: "66px", height: "66px" }}
            />
            <Text size="12px" weight={600}>
              쓰레기통
            </Text>
          </Box>
          <Box direction="column" align="center" justify="center">
            <Image
              fit="cover"
              src={DishBtn}
              onClick={() => {
                handleMarker("TWO");
              }}
              style={{ width: "66px", height: "66px" }}
            />
            <Text size="12px" weight={600}>
              맛집
            </Text>
          </Box>
          <Box direction="column" align="center" justify="center">
            <Image
              fit="cover"
              src={DesBtn}
              onClick={() => {
                handleMarker("THREE");
              }}
              style={{ width: "66px", height: "66px" }}
            />
            <Text size="12px" weight={600}>
              목적지
            </Text>
          </Box>
          <Box direction="column" align="center" justify="center">
            <Image
              fit="cover"
              src={GarbageBtn}
              onClick={() => {
                handleMarker("FOUR");
              }}
              style={{ width: "66px", height: "66px" }}
            />
            <Text size="12px" weight={600}>
              쓰레기
            </Text>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

// export const RideDialog = ({ open, handleClose, title }) => {
//   const navigate = useNavigate();
//   return (
//     <Dialog
//       open={open}
//       onClose={handleClose}
//       aria-labelledby="alert-dialog-title"
//       aria-describedby="alert-dialog-description"
//     >
//       <Box direction="row" justify="center" width="100%" pad="15px" gap="small">
//         <GBtn
//           color="#64CCBE"
//           onClick={() => {
//             navigate("/ride", {
//               state: {
//                 courseName: title,
//                 rideType: "solo",
//                 courseType: "course",
//               },
//             });
//           }}
//           children={
//             <Box
//               width="145px"
//               height="140px"
//               align="center"
//               justify="between"
//               background="#64CCBE"
//               style={{ borderRadius: "8px" }}
//               pad="small"
//             >
//               <img src={SoloBtn} width="100px" />
//               <StyledText
//                 text="혼자 타기"
//                 color="white"
//                 weight="bold"
//                 size="18px"
//               />
//             </Box>
//           }
//         />
//         <GBtn
//           onClick={() => {
//             navigate("/ride", {
//               state: {
//                 courseName: title,
//                 rideType: "group",
//                 courseType: "course",
//               },
//             });
//           }}
//           children={
//             <Box
//               width="145px"
//               align="center"
//               height="140px"
//               justify="between"
//               background="#64CCBE"
//               style={{ borderRadius: "8px" }}
//               pad="small"
//             >
//               <img src={GroupBtn} width="100px" />
//               <StyledText
//                 text="같이 타기"
//                 color="white"
//                 weight="bold"
//                 size="18px"
//               />
//             </Box>
//           }
//         />
//       </Box>
//     </Dialog>
//   );
// };

// const BottomBtn = styled.div`
//   position: absolute;
//   width: 100%;
//   z-index: 5;
//   bottom: 0;
//   display: flex;
//   justify-content: space-around;
// `;

// const TopBanner = styled.div`
//   position: absolute;
//   width: 100%;
//   z-index: 5;
//   top: 0;
//   display: flex;
//   margin-top: 15px;
// `;

// export const MapDialog = ({
//   type,
//   open,
//   handleClose,
//   handleAction,
//   title,
//   map,
//   cancel,
//   accept,
//   bottom,
//   course,
//   nearInfos,
//   weather,
// }) => {
//   const [op, setOp] = useState(false);
//   const [opWeather, setOpWeather] = useState(false);
//   const [selected, setSelected] = useState(0);
//   const EventMarkerContainer = ({ position, content, info }) => {
//     const map = useMap();
//     const [isVisible, setIsVisible] = useState(false);

//     return (
//       <>
//         <MapMarker
//           position={position} // 마커를 표시할 위치
//           // @ts-ignore
//           image={{
//             src: `/icons/marker${markerCategorys.findIndex(
//               (i) => i.name === info.nearinfoCategory
//             )}.svg`,
//             size: {
//               width: 29,
//               height: 41,
//             }, // 마커이미지의 크기입니다
//           }}
//           onClick={(marker) => {
//             map.panTo(marker.getPosition());
//             setTimeout(function () {
//               setIsVisible(true);
//             }, 200);
//           }}
//         ></MapMarker>
//         {isVisible && (
//           <NearInfoDialog
//             handleClose={() => {
//               setIsVisible(false);
//             }}
//             info={info}
//             open={isVisible}
//           />
//         )}
//       </>
//     );
//   };
//   return (
//     <Dialog fullScreen open={open} onClose={handleClose}>
//       <Box width="100vw" height="100vh" align="center">
//         {map ? (
//           map
//         ) : (
//           <Map
//             center={course.coordinates[0]}
//             isPanto={true}
//             style={{ width: "100%", height: "100%" }}
//           >
//             {course.coordinates && (
//               <Polyline
//                 path={[course.coordinates ? course.coordinates : []]}
//                 strokeWeight={5} // 선의 두께 입니다
//                 strokeColor={"#030ff1"} // 선의 색깔입니다
//                 strokeOpacity={0.7} // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
//                 strokeStyle={"solid"} // 선의 스타일입니다
//               />
//             )}
//             <MapMarker
//               position={
//                 course.coordinates
//                   ? course.coordinates[0]
//                   : { lng: 127.002158, lat: 37.512847 }
//               }
//               image={{
//                 src: `/images/start.png`,
//                 size: {
//                   width: 29,
//                   height: 41,
//                 }, // 마커이미지의 크기입니다
//               }}
//             ></MapMarker>
//             {course.coordinates &&
//             course.coordinates[0].lat ===
//               course.coordinates[course.coordinates.length - 1].lat &&
//             course.coordinates[0].lng ===
//               course.coordinates[course.coordinates.length - 1].lng ? (
//               <MapMarker
//                 position={course.coordinates[0]}
//                 image={{
//                   src: `/images/start.png`,
//                   size: {
//                     width: 29,
//                     height: 41,
//                   }, // 마커이미지의 크기입니다
//                 }}
//               ></MapMarker>
//             ) : (
//               <MapMarker
//                 position={
//                   course.coordinates
//                     ? course.coordinates[course.coordinates.length - 1]
//                     : []
//                 }
//                 image={{
//                   src: `/images/end.png`,
//                   size: {
//                     width: 29,
//                     height: 41,
//                   }, // 마커이미지의 크기입니다
//                 }}
//               ></MapMarker>
//             )}
//             {nearInfos &&
//               nearInfos.data
//                 .filter((near) => {
//                   if (selected === 0) {
//                     return near;
//                   } else if (
//                     near.key.includes(markerCategorys[selected].name)
//                   ) {
//                     return near;
//                   }
//                 })
//                 .map((near, idxCat) => {
//                   if (near.arr.length > 0)
//                     return near.arr.map((info, idx) =>
//                       idx % 2 === 0 ? (
//                         <EventMarkerContainer
//                           position={{
//                             lat: info.nearinfoLat,
//                             lng: info.nearinfoLng,
//                           }}
//                           key={idx}
//                           info={info}
//                         ></EventMarkerContainer>
//                       ) : null
//                     );
//                 })}
//           </Map>
//         )}

//         {/* 상단 바 */}
//         <Box
//           align="center"
//           style={{
//             position: "absolute",
//             width: "100%",
//             zIndex: "5",
//             top: "0",
//             display: "flex",
//             marginTop: "15px",
//           }}
//         >
//           <Box width="100%" align="center">
//             {/* 코스 이름 */}
//             <Box
//               round={{ size: "small" }}
//               width="90%"
//               height="43px"
//               background={"#64CCBE"}
//               align="center"
//               justify="around"
//               direction="row"
//             >
//               <Avatar size="34px" />
//               <StyledText
//                 text={title}
//                 color="white"
//                 size="20px"
//                 style={{
//                   overflow: "hidden",
//                   textOverflow: "ellipsis",
//                   whiteSpace: "nowrap",
//                   display: "block",
//                 }}
//               />
//               {weather !== undefined && (
//                 <motion.img
//                   height="34px"
//                   width="34px"
//                   src={WeatherBtn}
//                   onClick={() => {
//                     setOpWeather(true);
//                   }}
//                   whileTap={{ scale: 0.9 }}
//                 />
//               )}
//             </Box>
//             {type === "detail" && (
//               <Box
//                 direction="row"
//                 justify="start"
//                 overflow="scroll"
//                 margin="medium"
//                 height="85px"
//               >
//                 <StyledHorizonTable>
//                   {markerCategorys.map((cat, idx) => {
//                     return (
//                       <motion.button
//                         key={idx}
//                         onClick={() => {
//                           setSelected(idx);
//                         }}
//                         whileTap={{ scale: 0.9 }}
//                         style={{
//                           boxShadow: "4px 4px 4px -4px rgb(0 0 0 / 0.2)",
//                           display: "inline-block",
//                           fontWeight: "bold",
//                           width: "60px",
//                           height: "60px",
//                           fontFamily: "gwmd",
//                           borderRadius: "10px",
//                           border: "none",
//                           marginRight: "10px",
//                           fontSize: "12px",
//                           color: "black",
//                           background: selected === idx ? cat.main : "#fff",
//                         }}
//                       >
//                         <Box align="center" style={{ fontSize: "12px" }}>
//                           {cat.icon}
//                           {cat.name}
//                         </Box>
//                       </motion.button>
//                     );
//                   })}
//                 </StyledHorizonTable>
//               </Box>
//             )}
//           </Box>
//         </Box>
//         {/* 하단 버튼 */}
//         <BottomBtn>
//           <WhiteButton
//             onClick={handleClose}
//             children={cancel}
//             whileTap={{ scale: 0.9 }}
//           />
//           {/* {accept && type === "detail" ? (
//             <BootstrapButton onClick={handleAction} children={accept} />
//           ) : (
//             <ExitButton onClick={handleAction} children={accept} />
//           )} */}
//         </BottomBtn>
//         {bottom && (
//           <ChooseSoloGroupBar
//             open={op}
//             onDismiss={() => {
//               setOp(false);
//             }}
//             title={course.courseName}
//             coordinates={course.coordinates}
//             checkPoints={course.checkpoints}
//           />
//         )}
//       </Box>
//       {weather !== undefined && (
//         <WeatherDialog
//           open={opWeather}
//           handleClose={() => {
//             setOpWeather(false);
//           }}
//           weather={weather}
//         />
//       )}
//     </Dialog>
//   );
// };

// export const ReviewDialog = ({
//   open,
//   handleClose,
//   title,
//   desc,
//   course,
//   cancel,
//   score,
//   starView,
//   tags,
//   img,
//   reviewId,
// }) => {
//   const [loading, setLoading] = useState(true);
//   const [review, setReview] = useState({});
//   useEffect(() => {
//     if (loading)
//       getReivewDetail(
//         reviewId,
//         (response) => {
//           console.log(response);
//           setReview(response.data);
//           setLoading(false);
//         },
//         (fail) => {
//           console.log(fail);
//           setLoading(false);
//         }
//       );
//     return () => {
//       setLoading(false);
//     };
//   }, []);
//   if (loading) return <Spinner />;
//   else
//     return (
//       <Dialog open={open} onClose={handleClose}>
//         <Box width="85vw" align="center" pad="small">
//           <HeaderBox goBack={handleClose} title={title} />
//           <Box width="90%" justify="around" align="center" gap="medium">
//             {/* 제목 */}
//             {review.coordinates.length > 0 ? (
//               <Map
//                 center={
//                   review.coordinates[parseInt(review.coordinates.length / 2)]
//                 }
//                 isPanto={true}
//                 style={{ width: "75%", height: "20vh" }}
//               >
//                 {review.coordinates.length > 0 && (
//                   <Polyline
//                     path={[review.coordinates]}
//                     strokeWeight={5} // 선의 두께 입니다
//                     strokeColor={"#030ff1"} // 선의 색깔입니다
//                     strokeOpacity={0.7} // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
//                     strokeStyle={"solid"} // 선의 스타일입니다
//                   />
//                 )}
//               </Map>
//             ) : (
//               <StyledText text="기록이 없습니다." />
//             )}
//             {/* 사진 */}
//             {img && (
//               <img
//                 src={img}
//                 width="60%"
//                 style={{
//                   objectFit: "cover",
//                 }}
//               />
//             )}
//             {/* 별점 */}
//             <StarBox
//               score={review.score}
//               starView={parseFloat(review.score).toFixed(1) * 16}
//             />
//             {/* 내용 */}
//             <StyledText text={review.content} />
//             {/* 태그 */}
//             <Box direction="row" overflow="scroll">
//               {/* arrays.map */}
//               {review.tags.map((t, idx) => {
//                 return (
//                   <StyledText text={"#" + t.tagName} key={idx} size="10px" />
//                 );
//               })}
//             </Box>

//             {/* 하단 버튼 */}
//             {/* <ExitButton onClick={handleClose}>{cancel}</ExitButton> */}
//           </Box>
//         </Box>
//       </Dialog>
//     );
// };

// // temperature : 기온
// // rain : 강수확률
// // weather : 날씨 상태
// //   1. 맑은 상태
// //   2. 비가 오는 상태
// //   3. 구름 많은 상태
// //   4. 흐린 상태

// export const WeatherDialog = ({ open, handleClose, weather }) => {
//   const [data, setData] = useState();
//   const [loading, setLoading] = useState(true);
//   useEffect(() => {
//     if (loading) {
//       setData({
//         dt: [
//           {
//             id: "온도",
//             color: "hsl(359, 70%, 50%)",
//             data: weather.weatherListPerHour.map((w, idx) => ({
//               x: idx === 0 ? "현재" : idx + "h",
//               y: w.temperature,
//             })),
//           },
//         ],
//       });
//       setLoading(false);
//     }
//     return () => {
//       setLoading(false);
//     };
//   }, []);
//   if (loading) return <Spinner />;
//   else
//     return (
//       <Dialog open={open} onClose={handleClose}>
//         <Box width="85vw" align="center" pad="small">
//           <Box width="100%" justify="around" align="center">
//             {/* 제목 */}
//             <img
//               src={`/images/w${weather.weatherListPerHour[0].weather}.png`}
//               width="65px"
//               height="65px"
//             />
//             <Box direction="row" align="center" justify="center" gap="medium">
//               <StyledText
//                 text={`${weather.weatherListPerHour[0].temperature}℃`}
//                 size="20px"
//                 weight="bold"
//               />
//               <StyledText
//                 text={`${weathers[weather.weatherListPerHour[0].weather - 1]}`}
//                 size="20px"
//                 weight="bold"
//               />

//               {weather.weatherListPerHour[0].rain != 0 && (
//                 <StyledText
//                   text={`강수 확률 : ${weather.weatherListPerHour[0].rain}%`}
//                   size="20px"
//                   weight="bold"
//                 />
//               )}
//             </Box>
//             <Box width="100%" height="300px">
//               <ResponsiveLine
//                 data={data.dt}
//                 margin={{ top: 30, right: 10, bottom: 50, left: 50 }}
//                 xScale={{ type: "point" }}
//                 yScale={{
//                   type: "linear",
//                   min: "auto",
//                   max: "auto",
//                   stacked: true,
//                   reverse: false,
//                 }}
//                 yFormat=" >-.2f"
//                 axisTop={null}
//                 axisRight={null}
//                 axisBottom={{
//                   orient: "bottom",
//                   tickSize: 5,
//                   tickPadding: 5,
//                   tickRotation: 0,
//                   legend: "기온 현황",
//                   legendOffset: 36,
//                   legendPosition: "middle",
//                 }}
//                 axisLeft={{
//                   orient: "left",
//                   tickSize: 5,
//                   tickPadding: 5,
//                   tickRotation: 0,
//                   legend: "온도 (℃)",
//                   legendOffset: -40,
//                   legendPosition: "middle",
//                 }}
//                 pointSize={10}
//                 pointColor={{ theme: "background" }}
//                 pointBorderWidth={2}
//                 pointBorderColor={{ from: "serieColor" }}
//                 pointLabelYOffset={-12}
//                 useMesh={true}
//                 legends={[
//                   {
//                     anchor: "bottom-right",
//                     direction: "column",
//                     justify: false,
//                     translateX: 100,
//                     translateY: 0,
//                     itemsSpacing: 0,
//                     itemDirection: "left-to-right",
//                     itemWidth: 80,
//                     itemHeight: 20,
//                     itemOpacity: 0.75,
//                     symbolSize: 12,
//                     symbolShape: "circle",
//                     symbolBorderColor: "rgba(0, 0, 0, .5)",
//                     effects: [
//                       {
//                         on: "hover",
//                         style: {
//                           itemBackground: "rgba(0, 0, 0, .03)",
//                           itemOpacity: 1,
//                         },
//                       },
//                     ],
//                   },
//                 ]}
//               />
//             </Box>
//           </Box>
//         </Box>
//       </Dialog>
//     );
// };
