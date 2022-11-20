import React, {
  createRef,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import useInterval from "../../hooks/UseInterval";
import { useGeolocated } from "react-geolocated";
import {
  useLocation,
  useNavigate,
  UNSAFE_NavigationContext as NavigationContext,
  Navigate,
} from "react-router-dom";
import { motion } from "framer-motion";
import {
  CustomOverlayMap,
  Map as KakaoMap,
  MapMarker,
  Polyline,
} from "react-kakao-maps-sdk";
import {
  calcCalories,
  calcDistance,
  container,
  convertStringToColor,
  dateToDetailString,
  getDistanceFromLatLonInKm,
  GrommetTheme,
  httpToHttps,
  timeToString,
} from "../../utils/util";
import {
  Box,
  FormField,
  Grommet,
  Image,
  Notification,
  TextInput,
} from "grommet";
import { StyledText } from "../../components/Common";
import StopBtn from "../../assets/images/stop.png";
import PauseBtn from "../../assets/images/pause.png";
import PlayBtn from "../../assets/images/play.png";
import TrashIcon from "../../assets/images/trash.png";
import DishIcon from "../../assets/images/dish.png";
import GarbageIcon from "../../assets/images/garbage.png";
import DesIcon from "../../assets/images/destination.png";

import { PloggingButton } from "../../components/common/Buttons";
import { AlertDialog, MarkerDialog } from "../../components/AlertDialog";
import { ReactComponent as MarkerIcon } from "../../assets/icons/marker.svg";
import Button from "../../components/Button";
import {
  Avatar,
  MainContainer,
  Sidebar,
  ConversationList,
  Conversation,
  ChatContainer,
  ConversationHeader,
  MessageGroup,
  Message,
  MessageList,
  MessageInput,
  TypingIndicator,
  MessageSeparator,
} from "@chatscope/chat-ui-kit-react";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import "./plogging.css";
import userIcon from "../../assets/icons/userIcon.svg";
import SockJS from "sockjs-client";
import * as StompJs from "@stomp/stompjs";
import ChatSound from "../../assets/sounds/chatNoti.mp3";
import MarkerSound from "../../assets/sounds/markerNoti.mp3";

import { exitPlogging, getGarbageList } from "../../apis/ploggingApi";
import { useSelector } from "react-redux";

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
var client = null;

export const Plogging = () => {
  // -------------------변수----------------------------------
  const inputReferance = createRef();
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [tic, setTic] = useState(3);
  const [time, setTime] = useState(0);
  const [plogMembers, setPlogMembers] = useState({ members: [] });
  const [plogMembersId, setPlogMembersId] = useState(new Map());
  const [plogMembersCnt, setPlogMembersCnt] = useState(0);
  const [mapData, setMapData] = useState({
    latlng: [],
    center: { lng: 127.002158, lat: 37.512847 },
    maxLng: { lat: 0, lng: 0 },
    minLng: { lat: 0, lng: 180 },
    maxLat: { lat: 0, lng: 0 },
    minLat: { lat: 90, lng: 0 },
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
  const [markerOpen, setMarkerOpen] = useState(false);
  const [marker, setMarker] = useState();
  const [when, setWhen] = useState(true);
  const [lastLocation, setLastLocation] = useState(null);
  const [confirmedNavigation, setConfirmedNavigation] = useState(false);
  const [markerPosition, setMarkerPosition] = useState();
  const [markerPositions, setMarkerPositions] = useState([]);
  const [crewMarker, setCrewMarker] = useState([]);
  const [visible, setVisible] = useState(false);
  const audioPlayer = useRef(null);
  const markerPlayer = useRef(null);
  const [garbages, setGarbages] = useState([]);
  // const [confirmedNavigation, setConfirmedNavigation] = useState(false);
  const User = useSelector((state) => state.user.user);
  // console.log(User);
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 500,
      },
      watchPosition: true,
    });

  const [messages, setMessages] = useState([]);
  const { ploggingType, roomId, crewId } = locations.state;
  let vh = 0;

  // ------------------함수-----------------------------

  // 소리 재생
  const playAudio = () => {
    audioPlayer.current.pause();
    audioPlayer.current.play();
  };

  // 소리 재생
  const playMarkerAudio = () => {
    markerPlayer.current.pause();
    markerPlayer.current.play();
  };

  // 나가기 방지
  const preventClose = (e) => {
    e.preventDefault();
    e.returnValue = "";
  };

  // 마커 지정 함수
  const setMarkerImage = (pingType) => {
    return pingType === "ONE"
      ? TrashIcon
      : pingType === "TWO"
      ? DishIcon
      : pingType === "THREE"
      ? DesIcon
      : GarbageIcon;
  };

  // 시간에 따른 칼로리 구함.
  const handleCalories = () => {
    // kcal = MET * (3.5 * kg * min) * 5 / 1000
    return calcCalories(User.weight, time);
  };

  const handleDistance = () => {
    return calcDistance(data.totalDistance);
  };

  // 마커 설정
  const handleMarker = (index) => {
    setMarkerPositions((prev) => {
      return [
        ...prev,
        {
          sender: User.nickname,
          lat: markerPosition.lat,
          lng: markerPosition.lng,
          pingType: index,
        },
      ];
    });
    if (crewId != null && client != null) {
      publishMarker({
        sender: User.nickname,
        lat: markerPosition.lat,
        lng: markerPosition.lng,
        pingType: index,
      });
    }
    setMarkerOpen((prev) => (prev = false));
  };

  const handleMapClick = (latLng) => {
    setMarker(undefined);
    setMarkerPosition((prev) => {
      return (prev = {
        lat: latLng.getLat(),
        lng: latLng.getLng(),
      });
    });
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
    disConnect();
    // if (time < 60)
    //   navigate("/plogging/end", {
    //     state: {
    //       ploggingType: ploggingType,
    //       ploggingId: null,
    //       ploggingData: {
    //         latlng: mapData.latlng,
    //         kcal: data.kcal,
    //         time: time,
    //         totalDistance: handleDistance(),
    //         maxLng: mapData.maxLng,
    //         minLng: mapData.minLng,
    //         maxLat: mapData.maxLat,
    //         minLat: mapData.minLat,
    //       },
    //     },
    //   });
    // else
    exitPlogging(
      {
        calorie: data.kcal,
        coordinates: mapData.latlng,
        crewId: crewId,
        distance: data.totalDistance,
        time: time,
      },
      (response) => {
        console.log(response);
        navigate("/plogging/end", {
          state: {
            ploggingType: ploggingType,
            ploggingId: response.data.ploggingId,
            ploggingData: {
              latlng: mapData.latlng,
              kcal: data.kcal,
              time: time,
              totalDistance: handleDistance(),
              maxLng: mapData.maxLng,
              minLng: mapData.minLng,
              maxLat: mapData.maxLat,
              minLat: mapData.minLat,
            },
          },
        });
      },
      (fail) => {
        console.log(fail);
      }
    );
  };

  const handleMessageSend = (text) => {
    if (client != null) {
      publishChatting(text);
    } else {
      setMessages((prev) => [
        ...prev,
        {
          text: text,
          sentTime: new Date(),
          sender: "localSender",
          direction: "outgoing",
          position: "single",
          type: "memo",
        },
      ]);
    }
  };

  // 쓰레기통, 쓰레기많은거, 목적지, 식당
  //웹소켓 위치 발행
  const publishLocation = (lat, lng) => {
    if (client != null) {
      client.publish({
        destination: "/pub/plogging/chat/message",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
          memberId: localStorage.getItem("memberId"),
        },
        body: JSON.stringify({
          type: "POS",
          roomId: roomId,
          lat: lat,
          lng: lng,
        }),
      });
    }
  };
  // ENTER, QUIT, TALK, PING, POS
  //웹소켓 마커 발행
  const publishMarker = (marker) => {
    if (client != null) {
      client.publish({
        destination: "/pub/plogging/chat/message",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
          memberId: localStorage.getItem("memberId"),
        },
        body: JSON.stringify({
          type: "PING",
          roomId: roomId,
          lat: marker.lat,
          lng: marker.lng,
          pingType: marker.pingType,
        }),
      });
    }
  };

  //웹소켓 채팅 발행
  const publishChatting = (text) => {
    if (client != null) {
      client.publish({
        destination: "/pub/plogging/chat/message",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
          memberId: localStorage.getItem("memberId"),
        },
        body: JSON.stringify({
          type: "TALK",
          roomId: roomId,
          message: text,
        }),
      });
    }
  };

  //웹소켓 초기화
  const initSocketClient = () => {
    client = new StompJs.Client({
      // brokerURL: "ws://localhost:8000/member-service/ws-stomp",
      brokerURL: "wss://k7a1061.p.ssafy.io/member-service/ws-stomp",
      connectHeaders: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
        memberId: localStorage.getItem("memberId"),
      },
      webSocketFactory: () => {
        return SockJS("https://k7a1061.p.ssafy.io/member-service/ws-stomp");
        // return SockJS("http://localhost:8000/member-service/ws-stomp");
      },
      debug: (str) => {
        console.log("stomp debug!!!", str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,

      onStompError: (frame) => {
        // Will be invoked in case of error encountered at Broker
        // Bad login/passcode typically will cause an error
        // Complaint brokers will set `message` header with a brief message. Body may contain details.
        // Compliant brokers will terminate the connection after any error
        console.log("Broker reported error: " + frame.headers["message"]);
        console.log("Additional details: " + frame.body);
        client.deactivate();
      },
    });

    // 웹소켓 초기 연결
    client.onConnect = (frame) => {
      console.log("client init !!! ", frame);
      if (client != null)
        client.publish({
          destination: "/pub/plogging/chat/message",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
            memberId: localStorage.getItem("memberId"),
          },
          // body: JSON.stringify({
          //   type: "ENTER",
          //   roomId:roomId,
          // }),
        });
      subscribe();
    };

    client.activate();
  };

  // 웹소켓 구독
  const subscribe = () => {
    if (client != null) {
      console.log("subs!!!!!!!!!");
      client.subscribe(
        "/sub/chat/plogging/" + roomId,
        (response) => {
          console.log(response);
          const data = JSON.parse(response.body);
          // 1. 채팅일 때
          if (data.type === "TALK") {
            playAudio();
            setMessages((prev) => [
              ...prev,
              {
                text: data.message,
                sentTime: data.sendTime,
                sender: data.sender.nickname,
                direction:
                  User.nickname === data.sender.nickname
                    ? "outgoing"
                    : "incoming",
                position: "single",
                type: "message",
                profileImg: data.sender.profileImageUrl,
              },
            ]);
          }
          // 2. 마커 위치일 때
          else if (data.type === "PING") {
            // if (data.sender !== User.nickname) {
            setVisible(true);
            // 마커 리스트 저장
            setCrewMarker((prev) => [
              ...prev,
              {
                sender: data.sender.nickname,
                lat: data.lat,
                lng: data.lng,
                pingType: data.pingType,
              },
            ]);
            playMarkerAudio();
            // }
          }
          // 3. 사용자들 위치일 때
          else if (data.type === "POS") {
            // if (!plogMembersId.has(data.sender.id)) {
            plogMembersId.set(data.sender.id, data);
            // setPlogMembersCnt(plogMembersCnt + 1);
            console.log("ㅇㅇ", plogMembersId);
            console.log("ㅇㅇ", data);
            // }
            // 라이드어스랑 로직 똑같음
            // if (data.sender.nickname === User.nickname) {
            //   plogMembers.members[plogMembersId.get(data.sender.id)] = data;
            //   setPlogMembers({ ...plogMembers });
            // }
          }
          // 4. 사용자 입장했을때/퇴장했을 떄
          else if (data.type === "ENTER" || data.type === "QUIT") {
            if (data.type === "QUIT") {
              plogMembersId.delete(data.sender.id);
            }
            // playAudio();
            setMessages((prev) => [
              ...prev,
              {
                text: data.message,
                sentTime: data.time,
                sender: data.sender.nickname,
                direction: "incoming",
                position: "single",
                type: data.type,
              },
            ]);
          }
          // rideMembers.members[data.memberId] = data;
          // setRideMembers({ ...rideMembers });
        },
        {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
          memberId: localStorage.getItem("memberId"),
        }
      );
    }
  };
  // 웹소켓 연결해제
  const disConnect = async () => {
    if (client != null) {
      if (client.connected) await client.deactivate();
      client = null;
    }
  };

  // ----------------------hooks------------------------

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
      // console.log(mapData);
      // setData((prev) => ({
      //   kcal: handleCalories(),
      //   totalDistance: prev.totalDistance,
      // }));
    },
    ready && walking ? 1000 : null
  );

  //1분마다 쓰레기통 위치 갱신
  useInterval(
    () => {
      getGarbageList(
        mapData.center,
        (response) => {
          // console.log(response);
          setGarbages((prev) => (prev = response.data));
          // console.log(garbages);
        },
        (fail) => {
          console.log(fail);
        }
      );
      // setData((prev) => ({
      //   kcal: handleCalories(),
      //   totalDistance: prev.totalDistance,
      // }));
    },
    ready && walking ? 1000 * 60 : 3000
  );

  useEffect(() => {
    vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }, []);

  // 실시간 위치를 찍어주는 함수
  useInterval(
    () => {
      if (walking && ready && isGeolocationAvailable && isGeolocationEnabled) {
        // console.log("location : ", coords);

        const gps = {
          lat: coords.latitude,
          lng: coords.longitude,
        };
        publishLocation(gps.lat, gps.lng);
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
              maxLng: gps.lng > prev.maxLng.lng ? gps : prev.maxLng,
              minLng: gps.lng < prev.minLng.lng ? gps : prev.minLng,
              maxLat: gps.lat > prev.maxLat.lat ? gps : prev.maxLat,
              minLat: gps.lat < prev.minLat.lat ? gps : prev.minLat,
            };
          });

          if (garbages.length < 1) {
            getGarbageList(
              gps,
              (response) => {
                console.log(response);
                setGarbages((prev) => (prev = response.data));
                console.log(garbages);
              },
              (fail) => {
                console.log(fail);
              }
            );
          }
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
    ready ? 3000 : null
  );

  // 웹소켓 초기화
  useEffect(() => {
    console.log(ploggingType, client);
    if (ploggingType === "crew" && client === null) {
      initSocketClient();
    }

    return () => {
      if (ploggingType === "crew" && client !== null) {
        disConnect();
      }
    };
  }, []);

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
          height: "calc(var(--vh, 1vh) * 100)",
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
          height: "calc(var(--vh, 1vh) * 100)",
        }}
      >
        {/* 지도 박스 */}

        {/* 지도 */}
        <KakaoMap
          center={mapData.center}
          isPanto={true}
          style={{ width: "100%", height: "60%" }}
          onClick={(_t, mouseEvent) => {
            console.log(_t, mouseEvent, markerOpen);

            setMarkerOpen((prev) => (prev = true));
            handleMapClick(mouseEvent.latLng);
          }}
        >
          {plogMembersId.size > 0 &&
            Array.from(plogMembersId.values()).map((member, idx) => {
              // console.log(member);
              return (
                <CustomOverlayMap // 커스텀 오버레이를 표시할 Container
                  // 커스텀 오버레이가 표시될 위치입니다
                  position={{ lat: member.lat, lng: member.lng }}
                  key={idx}
                >
                  {/* 커스텀 오버레이에 표시할 내용입니다 */}
                  <Avatar
                    src={httpToHttps(member.sender.profileImageUrl)}
                    style={{
                      width: "35px",
                      height: "35px",
                      border: `3px inset ${convertStringToColor(
                        member.sender.color
                      )}`,
                    }}
                  />
                </CustomOverlayMap>
              );
            })}

          {crewMarker.length > 0 &&
            crewMarker.map((marker, index) => {
              return (
                <CustomOverlayMap
                  key={index}
                  position={{ lat: marker.lat, lng: marker.lng }}
                >
                  <Box
                    width="45px"
                    height="45px"
                    align="center"
                    background={{ color: "white", opacity: 0.6 }}
                    round="small"
                  >
                    <Image
                      sizes="30px"
                      fit="cover"
                      src={setMarkerImage(marker.pingType)}
                    />
                    <StyledText text={marker.sender} size="9px" weight="bold" />
                  </Box>
                </CustomOverlayMap>
              );
            })}

          {markerPositions.length > 0 &&
            markerPositions.map((marker, index) => {
              return (
                <CustomOverlayMap
                  key={index}
                  position={{ lat: marker.lat, lng: marker.lng }}
                >
                  <Box
                    width="45px"
                    height="45px"
                    align="center"
                    background={{ color: "white", opacity: 0.6 }}
                    round="small"
                  >
                    <Image
                      sizes="30px"
                      fit="cover"
                      src={setMarkerImage(marker.pingType)}
                    />
                    <StyledText text={marker.sender} size="9px" weight="bold" />
                  </Box>
                </CustomOverlayMap>
              );
            })}
          <MapMarker
            position={
              !mapData.latlng.length > 0 ? mapData.center : mapData.latlng[0]
            }
            image={{
              src: `/assets/images/start.png`,
              size: {
                width: 29,
                height: 41,
              }, // 마커이미지의 크기입니다
            }}
          />

          {garbages.length > 0 &&
            garbages.map((gabage, index) => {
              return (
                <MapMarker
                  key={index}
                  position={{ lat: gabage.lat, lng: gabage.lng }}
                  image={{
                    src: `/assets/images/garbage.png`,
                    size: {
                      width: 41,
                      height: 41,
                    },
                  }}
                />
              );
            })}

          {mapData.latlng && (
            <Polyline
              path={[mapData.latlng]}
              strokeWeight={5} // 선의 두께 입니다
              strokeColor={"#030ff1"} // 선의 색깔입니다
              strokeOpacity={0.7} // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
              strokeStyle={"solid"} // 선의 스타일입니다
            />
          )}
        </KakaoMap>

        {/* 종료 버튼 */}
        <Box
          align="end"
          justify="start"
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            zIndex: "15",
          }}
        >
          <Button
            whileTap={{ scale: 0.9 }}
            smallpink="true"
            onClick={() => {
              confirmNavigation();
              setOpen(true);
            }}
          >
            {"플로깅 종료"}
          </Button>
        </Box>
        {/* 하단 정보 박스 */}
        <Box
          width="100%"
          height="45%"
          align="center"
          justify="center"
          gap="25px"
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
          {/* 채팅 */}

          <Box
            width="80%"
            height="60%"
            style={{
              boxShadow: "4px 4px 4px -4px rgb(172 172 172 / 0.3)",
              textAlign: "start",
            }}
          >
            {/* 채팅 구역 */}
            <ChatContainer>
              <MessageList>
                {/* <Message
                  model={{
                    message: "hihi",
                    sentTime: "15 mins ago",
                    sener: "dwdw",
                    direction: "incoming",
                    position: "single",
                  }}
                >
                  <Avatar src={userIcon} name="Joe" />
                  <Message.Footer sender="Emily" sentTime="just now" />
                </Message> */}
                {messages.map((message, index) => {
                  if (message.type === "message")
                    return (
                      <Message
                        key={index}
                        model={{
                          message: message.text,
                          sentTime: message.sentTime,
                          sender: message.sender,
                          direction: message.direction,
                          position: message.position,
                        }}
                      >
                        <Avatar
                          src={httpToHttps(message.profileImg)}
                          name={message.sender}
                        />
                        <Message.Footer
                          sender={message.sender}
                          sentTime={dateToDetailString(message.sentTime)}
                        />
                      </Message>
                    );
                  else if (message.type === "ENTER" || message.type === "QUIT")
                    return (
                      <MessageSeparator key={index} content={message.text} />
                    );
                  else if (message.type === "memo") {
                    return (
                      <Message
                        key={index}
                        model={{
                          message: message.text,
                          sentTime: message.sentTime,
                          sender: message.sender,
                          direction: message.direction,
                          position: message.position,
                        }}
                      >
                        <Avatar
                          src={httpToHttps(User.profileImageUrl)}
                          name={message.sender}
                        />
                        <Message.Footer
                          sender={message.sender}
                          sentTime={dateToDetailString(message.sentTime)}
                        />
                      </Message>
                    );
                  }
                })}
              </MessageList>
              <MessageInput
                placeholder={
                  ploggingType === "crew" ? "여기에 입력하세요" : "메모장"
                }
                attachButton={false}
                onSend={(innerHtml, textContent, innerText, nodes) => {
                  handleMessageSend(textContent);
                }}
                style={{
                  background: "#fff",
                }}
              />
            </ChatContainer>
            {/* 채팅 버튼 */}
            {/* <Box width="70%" height="100%" align="end" justify="end"></Box>
              <motion.button
                style={{
                  boxShadow: "none",
                  textTransform: "none",
                  fontSize: 12,
                  fontWeight: "bold",
                  color: "white",
                  width: "30%",
                  height: "100%",
                  border: "none",
                  fontFamily: `shsnMedium, sans-serif`,
                  backgroundColor: "#57BA83",
                }}
              ></motion.button> */}
          </Box>

          {/* 정지, 일시정지 버튼 */}
          {/* <Box width="100%" direction="row" justify="center" gap="25px">
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
          </Box> */}
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
          desc={
            // time < 60 &&
            // "1분 미만의 기록은 저장되지 않습니다." +
            "플로깅을 종료하시겠습니까?"
          }
          accept="종료"
        />
        <MarkerDialog
          open={markerOpen}
          handleClose={() => {
            setMarkerOpen((prev) => false);
          }}
          handleMarker={handleMarker}
        />
        {visible && (
          <Grommet theme={GrommetTheme}>
            <Notification
              toast={{ position: "center" }}
              title={"새 마커가 등록되었습니다."}
              status={"normal"}
              onClose={() => setVisible(false)}
            />
          </Grommet>
        )}
        <audio ref={audioPlayer} src={ChatSound} />
        <audio ref={markerPlayer} src={MarkerSound} />
      </motion.div>
    );
};
