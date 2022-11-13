import { Box, Text } from "grommet";
import React from "react";
import styled from "styled-components";
import { StyledProfile } from "../common/ProfileImg";

const StyledHorizonTable = styled.div`
  width: 100%;
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  &::-webkit-scrollbar {
    display: none;
  }
  .card {
    display: inline-block;
  }
`;

export const CrewMemberProfile = (data) => {
  console.log(data);
  const memberList = data.memberList;
  return (
    <StyledHorizonTable>
      {memberList !== undefined && memberList.length > 0 && memberList.map((member, idx) => <div className="card" key={idx}>
        <Box
          direction="column"
          justify="between"
          align="center"
          margin="5px 7px 5px 0px"
        >
          <StyledProfile
            height="60px"
            width="60px"
            style={{ objectFit: "cover" }}
            src={member.profileImageUrl}
          />
          <Text size="14px" weight={500}>
            {member.nickname}
          </Text>
        </Box>
      </div>)}
    </StyledHorizonTable>
  );
};
