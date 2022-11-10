import React, { useEffect, useState } from "react";
import { CrewCard } from "../../components/crew/CrewCard";
import crewBanner from "../../assets/images/crewBanner.jpg";
import { motion } from "framer-motion";
import { Box, Spinner, Text } from "grommet";
import { CrewScollableCardList } from "../../components/crew/CrewScollableCardList";
import { ChallengeRankTop3 } from "../../components/rank/ChallengeRankTop3";
import {
  getMyCrewList,
  getMyNearCrewList,
  getTop3CrewList,
} from "../../apis/crewApi";

export const Crew = () => {
  const [top3Distance, setTop3Distance] = useState([]);
  const [top3Time, setTop3Time] = useState([]);
  const [myCrews, setMyCrews] = useState([]);
  const [near, setNear] = useState([]);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState("DIS");

  const handleType = (type) => {
    setType(type);
  };

  useEffect(() => {
    if (loading) {
      getTop3CrewList(
        (response) => {
          console.log(response);
          setTop3Distance((prev) => (prev = response.data.top3Distance));
          setTop3Time((prev) => (prev = response.data.top3Time));
        },
        (fail) => {
          console.log(fail);
        }
      );
      getMyCrewList((response) => {
        console.log(response);
        setMyCrews((prev) => (prev = response.data));
        setLoading(false);
      });
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position);
          getMyNearCrewList(
            { lat: position.coords.latitude, lng: position.coords.longitude },
            (response) => {
              console.log(response);
              setNear((prev) => (prev = response.data));
            }
          );
        },
        (err) => {}
      );
    }
    setLoading(false);
    return () => {
      setLoading(false);
    };
  }, []);
  if (loading) return <Spinner />;
  else
    return (
      <motion.div>
        <div style={{ position: "relative", width: "100%", height: "260px" }}>
          <img
            src={crewBanner}
            height="260px"
            width="100%"
            style={{ position: "absolute", objectFit: "cover" }}
          ></img>
          <Box
            background={{ color: "rgba(0,0,0,0.2)" }}
            style={{ position: "absolute" }}
            width="100%"
            height="100%"
          ></Box>
          <Text
            size="26px"
            weight={500}
            color="white"
            style={{ position: "absolute", top: "160px", left: "20px" }}
          >
            친구들과 함께하는
          </Text>
          <Box
            direction="row"
            style={{ position: "absolute", top: "200px", left: "20px" }}
            align="center"
          >
            <Text size="26px" weight={500} color="white">
              지구 지키기
            </Text>
            <Text size="32px" weight={600} color="white" margin="0px 10px">
              Crew
            </Text>
          </Box>
        </div>
        {/* 내 크루 */}
        <Box pad="medium" width="100%">
          <Text size="18px" weight={500} margin="20px 10px 0px 10px">
            내 크루
          </Text>
          {myCrews && <CrewScollableCardList crews={myCrews} />}
        </Box>

        {/* 지금 내 위치가 주 활동 지역인 근처 크루 */}
        <Box pad="medium" width="100%">
          <Text size="18px" weight={500} margin="20px 10px 0px 10px">
            지금 내 근처 크루
          </Text>
          {near && <CrewScollableCardList crews={near}></CrewScollableCardList>}
        </Box>

        {/* Top3 */}
        <Box pad="medium" width="100%">
          <Box direction="row" justify="between" align="center">
            <Text size="18px" weight={500} margin="20px 10px 30px 10px">
              크루 Top3
            </Text>
            <Box direction="row" justify="between" width="90px">
              <Text
                weight={400}
                size="12px"
                color={type === "TIME" ? "#57BA83" : "#AEAEAE"}
                onClick={() => handleType("TIME")}
              >
                총 횟수
              </Text>
              <Text weight={400} size="12px" color="#AEAEAE">
                |
              </Text>
              <Text
                weight={400}
                size="12px"
                color={type === "DIS" ? "#57BA83" : "#AEAEAE"}
                onClick={() => handleType("DIS")}
              >
                총 거리
              </Text>
            </Box>
          </Box>
          {type === "TIME" && <ChallengeRankTop3 top3Crews={top3Time} />}
          {type === "DIS" && <ChallengeRankTop3 top3Crews={top3Distance} />}
        </Box>
      </motion.div>
    );
};
