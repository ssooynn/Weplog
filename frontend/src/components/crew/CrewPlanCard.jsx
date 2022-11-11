import { Box, Text } from "grommet";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { dateToString } from "../../utils/util";
import { StyledProfile } from "../common/ProfileImg";

export const CrewPlanCard = ({ data }) => {
  return (
    <Box
      // background={{ image: `url(${data.imageUrl})`, opacity: "strong" }}
      height="100px"
      width="100%"
      margin="10px 0px"
      round="small"
      elevation="medium"
    >
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
