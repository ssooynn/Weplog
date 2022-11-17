import "./styles.css";
import {
  currentMonthDay,
  days,
  monthDays,
  monthDayStart,
  monthYear,
  selectDay,
} from "../../utils/calender";
import React, { useEffect, useState } from "react";
import { Box, Spinner, Text } from "grommet";
import { CreateScheduleDialog } from "./crewDetail/CreateScheduleDialog";
import { getCrewSchedule } from "../../apis/calenderApi";
import { getCrewPloggingDetail } from "../../apis/ploggingApi";
import dayjs from "dayjs";
import { CrewLogDialog } from "./crewDetail/CrewLogDialog";

export const CrewCalender = ({
  crewId,
  selectedDays,
  loggedDays,
  getSchedule,
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [openLog, setOpenLog] = useState(false);
  // const today = dayjs(new Date()).tz("Asia/Seoul");
  const today = dayjs(new Date());
  const defaultDisplayedCalender = {
    month: today.month(),
    year: today.year(),
  };
  const [displayedCalenderInfo, setDisplayedCalenderInfo] = useState(
    defaultDisplayedCalender
  );
  const [selectedDate, setSelectedDate] = useState("");

  const [selectedDateIndex, setSelectedDateIndex] = useState([]);
  const handleArrowClick = (action) => {
    if (action === "next" && displayedCalenderInfo.month !== 11) {
      setSelectedDateIndex([]);
      setDisplayedCalenderInfo({
        ...displayedCalenderInfo,
        month: displayedCalenderInfo.month + 1,
      });
    } else if (action === "previous" && displayedCalenderInfo.month !== 0) {
      setSelectedDateIndex([]);
      setDisplayedCalenderInfo({
        ...displayedCalenderInfo,
        month: displayedCalenderInfo.month - 1,
      });
    }
  };

  const handleSelectedDates = (index) => {
    if (index < parseInt(today.date())) {
      if (loggedDays.includes(index)) {
        setSelectedDate(dayjs().set("date", index).format("YYYY-MM-DD"));
        // getCrewPloggingDetail(
        //   crewId,
        //   dayjs().set("date", index).format("YYYY-MM-DD"),
        //   (response) => {
        //     console.log(response);
        //   },
        //   (fail) => {
        //     console.log(fail);
        //   }
        // );
        setOpenLog(true);
      }
    } else {
      setSelectedDate(
        (prev) =>
          (prev = {
            month: displayedCalenderInfo.month,
            year: displayedCalenderInfo.year,
            day: index,
          })
      );
      setOpen(true);
    }
    // if (selectedDateIndex.includes(index))
    //   setSelectedDateIndex(
    //     selectedDateIndex.filter((dateIndex) => dateIndex !== index)
    //   );
    // else setSelectedDateIndex(selectedDateIndex.concat(index));
  };

  const displayDates = (monthDayStart) => {
    const emptyDays = Array(monthDayStart(displayedCalenderInfo)).fill("");
    const renderedDates = emptyDays.concat(
      Array.from(
        { length: monthDays(displayedCalenderInfo) },
        (_, index) => index + 1
      )
    );

    return renderedDates.map((item, index) => (
      <span
        key={`calender-day-number${index}`}
        className={`num-item ${
          selectedDateIndex.includes(index)
            ? parseInt(item) < parseInt(today.date())
              ? ""
              : "selected"
            : loggedDays.includes(index)
            ? "passed"
            : ""
        } ${currentMonthDay(displayedCalenderInfo, item) ? "current-day" : ""}`}
        onClick={(_) => handleSelectedDates(index)}
      >
        {item}
      </span>
    ));
  };

  useEffect(() => {
    if (loading) {
      setSelectedDateIndex(selectedDays);

      setLoading(false);
    }
  }, []);
  if (loading) return <Spinner />;
  else
    return (
      <>
        <CreateScheduleDialog
          crewId={crewId}
          open={open}
          handleClose={() => {
            setOpen(false);
          }}
          accept={getSchedule}
          date={selectedDate}
        />
        {openLog && (
          <CrewLogDialog
            crewId={crewId}
            date={selectedDate}
            open={openLog}
            onClose={() => {
              setOpenLog(false);
            }}
          />
        )}
        <Box width="90%" margin="20px" align="center">
          <div className="calender">
            <div className="month-name">
              <img
                className={`${
                  displayedCalenderInfo.month === 0 ? "unclickable" : ""
                }`}
                onClick={(e) => handleArrowClick("previous")}
                src="/assets/images/arrow-left-line.svg"
                alt="arrow-left"
                width="20px"
                height="20px"
              />
              <span className="month-text">
                {monthYear(displayedCalenderInfo)}
              </span>
              <img
                className={`${
                  displayedCalenderInfo.month === 11 ? "unclickable" : ""
                } right-arrow`}
                onClick={(e) => handleArrowClick("next")}
                src="/assets/images/arrow-left-line.svg"
                alt="arrow-left"
                width="20px"
                height="20px"
              />
            </div>
            <div className="days">
              {days.map((day) => (
                <span key={`calender-day_${day}`} className="day">
                  {day}
                </span>
              ))}
            </div>
            <div className="num-of-days">{displayDates(monthDayStart)}</div>
          </div>
          <Box direction="row" justify="end" margin="10px 0px" width="100%">
            <Box
              direction="column"
              align="center"
              justify="center"
              margin={{ right: "8px" }}
            >
              <Box
                round="100%"
                background={{ color: " rgba(87, 186, 131, 0.4)" }}
                width="25px"
                height="25px"
              ></Box>
              <Text size="12px" weight={500} margin={{ top: "5px" }}>
                Log
              </Text>
            </Box>
            <Box direction="column" align="center" justify="center">
              <Box
                round="100%"
                background={{ color: " rgba(255, 213, 0, 0.4)" }}
                width="25px"
                height="25px"
              ></Box>
              <Text size="12px" weight={500} margin={{ top: "5px" }}>
                Plan
              </Text>
            </Box>
          </Box>
        </Box>
      </>
    );
};
