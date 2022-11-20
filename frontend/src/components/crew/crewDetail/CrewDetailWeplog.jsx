import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Box, Spinner, Text } from "grommet";
import planIcon from "../../../assets/icons/planIcon.png";
import { CrewCalender } from "../CrewCalender";
import { CrewPlanCard } from "../CrewPlanCard";
import { useNavigate } from "react-router-dom";
import { PloggingButtonCrew } from "../../common/Buttons.jsx";
import {
  createCrewJoin,
  createCrewRoom,
  getRoomByCrewId,
} from "../../../apis/crewApi";
import { getCrewSchedule } from "../../../apis/calenderApi";
import { CrewJoinDialog } from "./CrewJoinDialog";
import { getCrewPloggingDate } from "../../../apis/ploggingApi";
import dayjs from "dayjs";

const CrewDetailWeplog = ({ crewId, ploggingDateList, isMyCrew }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [roomId, setRoomId] = useState();
  const [selectedDays, setSelectedDays] = useState([]);
  const [loggedDays, setLoggedDays] = useState([]);
  const [scheduels, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

  const getSchedule = () => {
    const date = new Date();
    getCrewSchedule(
      {
        crewId: crewId,
        date: new Date(+date + 3240 * 10000).toISOString().split("T")[0],
      },
      (response) => {
        console.log(response);
        setSchedules(response.data);
        response.data.forEach((cal) => {
          console.log(cal.scheduleDate.split("T")[0].split("-")[2]);
          setSelectedDays((prev) => [
            ...prev,
            parseInt(cal.scheduleDate.split("T")[0].split("-")[2]),
          ]);
        });
        setLoading(false);
      },
      (fail) => {
        console.log(fail);
      }
    );
    getCrewPloggingDate(
      crewId,
      dayjs().toISOString().split("T")[0],
      (response) => {
        console.log(response);
        setLoggedDays(response.data);
      },
      (fail) => {
        console.log(fail);
      }
    );
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleJoinCrew = (comment) => {
    createCrewJoin(
      crewId,
      { comment: comment },
      (response) => {
        console.log(response);
        // 알러트
        handleClose();
      },
      (fail) => {
        console.log(fail);
      }
    );
  };

  const handlePloggingStart = () => {
    if (isMyCrew) {
      if (roomId === undefined) {
        createCrewRoom(crewId, (response) => {
          setRoomId((prev) => (prev = response.data.roomId));
          navigate("/plogging", {
            state: {
              ploggingType: "crew",
              roomId: response.data.roomId,
              crewId: crewId,
            },
          });
        });
      } else {
        console.log(roomId, crewId);
        navigate("/plogging", {
          state: {
            ploggingType: "crew",
            roomId: roomId,
            crewId: crewId,
          },
        });
      }
    } else {
      handleOpen();
    }
  };

  useEffect(() => {
    if (loading) {
      getRoomByCrewId(
        crewId,
        (response) => {
          console.log(response);
          setRoomId((prev) => (prev = response.data.roomId));
        },
        (fail) => {
          console.log(fail);
        }
      );
      getSchedule();
    }
    return () => {
      setLoading(false);
    };
  }, []);
  if (loading) return <Spinner />;
  else
    return (
      <motion.div>
        <Box>
          <Box direction="row" align="center" height="auto">
            <img src={planIcon} width="25px" height="25px" alt="캘린더" />
            <Text size="18px" weight={500} margin={{ left: "7px" }}>
              Weplog
            </Text>
          </Box>

          {/* 캘린더 */}
          <CrewCalender
            crewId={crewId}
            selectedDays={selectedDays}
            getSchedule={getSchedule}
            loggedDays={loggedDays}
          ></CrewCalender>

          <Box direction="row" align="center" height="auto" justify="between">
            <Text
              size="15px"
              weight={500}
              margin={{ left: "7px", bottom: "10px" }}
            >
              Plogging Plan
            </Text>
            {/* <Text
              size="12px"
              color="#00853b"
              weight={500}
              margin={{ left: "7px", bottom: "10px" }}
              onClick={handleOpen}
            >
              플로깅 일정 등록하기
            </Text> */}
          </Box>
          {scheduels.map((schedule, index) => {
            return <CrewPlanCard key={index} data={schedule} />;
          })}

          <Box width="100%" align="center">
            <PloggingButtonCrew
              whileTap={{ scale: 0.9 }}
              onClick={handlePloggingStart}
            >
              {isMyCrew ? "Plogging!" : "크루 가입 신청하기"}
            </PloggingButtonCrew>
          </Box>
        </Box>
        <CrewJoinDialog
          open={open}
          onDismiss={() => {
            setOpen(false);
          }}
          accept={handleJoinCrew}
        />
      </motion.div>
    );
};
export default React.memo(CrewDetailWeplog);
