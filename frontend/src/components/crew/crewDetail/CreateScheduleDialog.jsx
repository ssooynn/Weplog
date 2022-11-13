import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "../../Button";
import { Box, Grid, Image, Text } from "grommet";
import styled from "styled-components";
import { StyledInput } from "../../common/TextInput";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { selectDay } from "../../../utils/calender";
import { createCrewSchedule } from "../../../apis/calenderApi";

// {
//     "content": "string",
//     "crewId": 0,
//     "location": "string",
//     "scheduleDate": "2022-11-09T05:20:42.997Z"
//   }

export const CreateScheduleDialog = ({
  open,
  date,
  crewId,
  handleClose,
  accept,
}) => {
  const [desc, setDesc] = useState("");
  const [loc, setLoc] = useState("");
  const [time, setTime] = useState();
  const [startDate, setStartDate] = useState(new Date());

  const handleRegisterSchedule = () => {
    startDate.setFullYear(date.year, date.month, date.day);
    const calendarReq = {
      content: desc,
      crewId: crewId,
      location: loc,
      scheduleDate: startDate,
    };
    createCrewSchedule(
      calendarReq,
      (response) => {
        console.log(response);
        accept();
        handleClose();
      },
      (fail) => {
        console.log(fail);
      }
    );
  };

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
        스케줄 등록
      </DialogTitle>
      <Box
        direction="column"
        margin="30px 24px"
        width="70vw"
        justify="around"
        align="center"
      >
        <Text weight={500} size="16px">
          {selectDay(date.year, date.month + 1, date.day)}
        </Text>
        <Grid
          width="90%"
          rows={["60px", "60px", "60px"]}
          columns={["1/3", "2/3"]}
          gap="0"
          areas={[
            { name: "desc", start: [0, 0], end: [0, 0] },
            { name: "descData", start: [1, 0], end: [1, 0] },
            { name: "loc", start: [0, 1], end: [0, 1] },
            { name: "locData", start: [1, 1], end: [1, 1] },
            { name: "time", start: [0, 2], end: [0, 2] },
            { name: "timeData", start: [1, 2], end: [1, 2] },
          ]}
        >
          <Box gridArea="desc" justify="center" align="start">
            <Text weight={500} size="16px">
              내용
            </Text>
          </Box>
          <Box gridArea="descData" justify="center" align="start">
            <StyledInput
              placeholder="내용을 입력하세요."
              value={desc}
              onChange={(e) => {
                setDesc(e.target.value);
              }}
              padding="0px"
              margin="0px"
              style={{ fontSize: "16px" }}
            />
          </Box>
          <Box gridArea="loc" justify="center" align="start">
            <Text weight={500} size="16px">
              장소
            </Text>
          </Box>
          <Box
            gridArea="locData"
            justify="between"
            align="center"
            direction="row"
            width="100%"
          >
            <StyledInput
              placeholder="장소명을 입력하세요."
              value={loc}
              onChange={(e) => {
                setLoc(e.target.value);
              }}
              padding="0px"
              margin="0px"
              width="100%"
              style={{ fontSize: "16px" }}
            />
          </Box>

          <Box gridArea="time" justify="center" align="start">
            <Text weight={500} size="16px">
              시간
            </Text>
          </Box>
          <Box gridArea="timeData" justify="center" align="start">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="h:mm aa"
            />
          </Box>
        </Grid>

        <Button biggreenround="true" onClick={handleRegisterSchedule}>
          스케줄 등록하기
        </Button>
      </Box>
    </Dialog>
  );
};
