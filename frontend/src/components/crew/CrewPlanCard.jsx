import zIndex from "@mui/material/styles/zIndex";
import dayjs from "dayjs";
import { Box, Text } from "grommet";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { dateToString } from "../../utils/util";
import { StyledProfile } from "../common/ProfileImg";

export const CrewPlanCard = ({ data }) => {
  const today = dayjs();
  return (
    <Box
      // background={{ image: `url(${data.imageUrl})`, opacity: "strong" }}
      height="100px"
      width="100%"
      margin="10px 0px"
      round="small"
      elevation="medium"
      style={{
        position: "relative",
      }}
    >
      {parseInt(data.scheduleDate.split("T")[0].split("-")[2]) <
        today.date() && (
        <Box
          width="100%"
          height="100%"
          round="small"
          style={{
            position: "absolute",
            zIndex: 15,
            background: "rgba(0, 0, 0, 0.59)",
          }}
          align="center"
          justify="center"
        >
          <Text color="#57BA83" weight="bold">
            완료됨
          </Text>
        </Box>
      )}
      <Box justify="around" pad="14px 18px" height="100px">
        <Box direction="row" justify="between">
          <Text size="12px" weight={500} color="black">
            {dateToString(data.scheduleDate)}
          </Text>
          <Text size="12px" weight={400} color="black">
            {data.location}
          </Text>
        </Box>
        <Box direction="row" justify="between" align="center">
          <Text size="15px" weight={500} color="black">
            {data.content}
          </Text>
          <Box direction="row" align="center">
            <StyledProfile height="25px" width="25px" src={data.imageUrl} />
            <Text size="12px" weight={400} color="black">
              {data.nickname}
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
