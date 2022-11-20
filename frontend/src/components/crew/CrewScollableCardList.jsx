import React from "react";
import styled from "styled-components";
import { CrewCard } from "./CrewCard";

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

export const CrewScollableCardList = ({ crews }) => {
  if (crews)
    return (
      <StyledHorizonTable>
        {crews.map((crew, index) => {
          return (
            <div className="card" key={index}>
              <CrewCard crew={crew} />
            </div>
          );
        })}
      </StyledHorizonTable>
    );
  else
    return (
      <StyledHorizonTable>
        <div className="card">
          <CrewCard />
        </div>
        <div className="card">
          <CrewCard />
        </div>
        <div className="card">
          <CrewCard />
        </div>
      </StyledHorizonTable>
    );
};
