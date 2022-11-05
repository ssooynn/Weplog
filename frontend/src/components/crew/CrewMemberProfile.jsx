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

export const CrewMemberProfile = () => {
  return (
    <StyledHorizonTable>
      <div className="card">
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
            src="https://picsum.photos/200/300?random=43"
          />
          <Text size="14px" weight={500}>
            이아현
          </Text>
        </Box>
      </div>
      <div className="card">
        <Box
          direction="column"
          justify="between"
          align="center"
          margin="5px 10px 5px 0px"
        >
          <StyledProfile
            height="60px"
            width="60px"
            style={{ objectFit: "cover" }}
            src="https://picsum.photos/200/300?random=43"
          />
          <Text size="14px" weight={500}>
            이아현
          </Text>
        </Box>
      </div>
      <div className="card">
        <Box
          direction="column"
          justify="between"
          align="center"
          margin="5px 10px 5px 0px"
        >
          <StyledProfile
            height="60px"
            width="60px"
            style={{ objectFit: "cover" }}
            src="https://picsum.photos/200/300?random=43"
          />
          <Text size="14px" weight={500}>
            이아현
          </Text>
        </Box>
      </div>
      <div className="card">
        <Box
          direction="column"
          justify="between"
          align="center"
          margin="5px 10px 5px 0px"
        >
          <StyledProfile
            height="60px"
            width="60px"
            style={{ objectFit: "cover" }}
            src="https://picsum.photos/200/300?random=43"
          />
          <Text size="14px" weight={500}>
            이아현
          </Text>
        </Box>
      </div>
      <div className="card">
        <Box
          direction="column"
          justify="between"
          align="center"
          margin="5px 10px 5px 0px"
        >
          <StyledProfile
            height="60px"
            width="60px"
            style={{ objectFit: "cover" }}
            src="https://picsum.photos/200/300?random=43"
          />
          <Text size="14px" weight={500}>
            이아현
          </Text>
        </Box>
      </div>
    </StyledHorizonTable>
  );
};
