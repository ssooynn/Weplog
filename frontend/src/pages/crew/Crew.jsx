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
  getAllCrewList,
} from "../../apis/crewApi";
import { Fab } from "@mui/material";
import { BootstrapButton } from "../../components/common/Buttons";
import { useNavigate } from "react-router-dom";
import { ReactComponent as PlusIcon } from "../../assets/icons/plus.svg";

export const Crew = () => {
  const [top3Distance, setTop3Distance] = useState([]);
  const [top3Time, setTop3Time] = useState([]);
  const [myCrews, setMyCrews] = useState([]);
  const [near, setNear] = useState([]);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState("DIS");
  const [crewList, setCrewList] = useState([]);
  const navigate = useNavigate();
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
      getAllCrewList(
        (res) => {
          console.log(res);
          setCrewList(res.data);
        },
        (err) => {
          console.log(err);
        }
      );
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
        (err) => { }
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
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            navigate("/crew/register");
          }}
          style={{
            boxShadow: "8px 8px 8px -8px rgb(0 0 0 / 0.2)",
            textTransform: "none",
            fontSize: 32,
            fontWeight: "bold",
            color: "white",
            border: "none",
            fontFamily: `shsnMedium, sans-serif`,
            padding: 0,
            margin: 0,
            backgroundColor: "#57BA83",
            position: "fixed",
            bottom: "9%",
            right: "3%",
            zIndex: "3",
            width: "60px",
            height: "60px",
            borderRadius: "30px",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <PlusIcon />
        </motion.button>
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
                총 시간
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
          {type === "TIME" && (
            <ChallengeRankTop3 type={"crew"} top3={top3Time} rankType="TIME" />
          )}
          {type === "DIS" && (
            <ChallengeRankTop3 type={"crew"} top3={top3Distance} rankType="DISTANCE" />
          )}
        </Box>

        <Box pad="medium" width="100%" margin={{ bottom: "30px" }}>
          <Text size="18px" weight={500} margin="20px 10px 0px 10px">
            모든 크루 List
          </Text>
          <Box
            direction="row"
            wrap={true}
            justify="start"
            margin={{ left: "4px" }}
          >
            {crewList.map((crew, index) => (
              <Box direction="row" justify="between" key={index} width="50%">
                <CrewCard crew={crew}></CrewCard>
              </Box>
            ))}
          </Box>
        </Box>
      </motion.div>
    );
};
