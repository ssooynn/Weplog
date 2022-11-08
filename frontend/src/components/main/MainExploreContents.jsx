import styled from "styled-components";
import React, { useState } from "react";
import { DetailDialog } from "../AlertDialog";

const ExploreArea = styled.div`
  height: 86vh;
  overflow: scroll;
  display: flex;
`;

const LeftInfiniteBar = styled.div`
  flex-direction: column;
  width: 44%;
  margin: 2% 2% 0 4%;
`;

const RightInfiniteBar = styled.div`
  flex-direction: column;
  width: 44%;
  margin: 2% 4% 0 2%;
`;

const ArticleCard = styled.div`
  width: 100%;
  margin: 2% 0 8% 0;
`;

const ArticleImg = styled.img`
  width: 100%;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ArticleProfileArea = styled.div`
  padding: 3% 6%;
  display: flex;
  flex-direction: row;
  width: 94%;
  height: 7vh;
`;

const ArticleProfileImgArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ArticleProfileImg = styled.img`
  width: 5vh;
  height: 5vh;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid #e7e7e7;
`;

const ArticleProfileTextArea = styled.div`
  padding-left: 1vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ArticleProfileName = styled.div`
  font-size: 13px;
  display: flex;
  flex-direction: row;
  font-weight: 500;
  justify-content: flex-start;
`;

const ArticleProfileTime = styled.div`
  font-size: 11px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

export const MainExploreContents = () => {
  const [open, setOpen] = useState(false);
  const [plogData, setPlogData] = useState({
    ArticleImgURL: "https://picsum.photos/200/400?random=2",
    ProfileImgURL: "https://picsum.photos/200/300?random=41",
    Name: "이수연",
    Time: "2",
  });

  return (
    <ExploreArea>
      <LeftInfiniteBar>
        <>
          <ArticleCard onClick={() => setOpen(true)}>
            <ArticleImg src="https://picsum.photos/200/400?random=2" />
            <ArticleProfileArea>
              <ArticleProfileImgArea>
                <ArticleProfileImg src="https://picsum.photos/200/300?random=41" />
              </ArticleProfileImgArea>
              <ArticleProfileTextArea>
                <ArticleProfileName>이수연</ArticleProfileName>
                <ArticleProfileTime>1분전</ArticleProfileTime>
              </ArticleProfileTextArea>
            </ArticleProfileArea>
          </ArticleCard>
          <DetailDialog
            open={open}
            handleClose={() => {
              setOpen(false);
            }}
            plogData={plogData}
          />
        </>
      </LeftInfiniteBar>

      <RightInfiniteBar>
        <>
          <ArticleCard onClick={() => setOpen(true)}>
            <ArticleImg src="https://picsum.photos/200/300?random=2" />
            <ArticleProfileArea>
              <ArticleProfileImgArea>
                <ArticleProfileImg src="https://picsum.photos/200/300?random=21" />
              </ArticleProfileImgArea>
              <ArticleProfileTextArea>
                <ArticleProfileName>이아현</ArticleProfileName>
                <ArticleProfileTime>2분전</ArticleProfileTime>
              </ArticleProfileTextArea>
            </ArticleProfileArea>
          </ArticleCard>
          <DetailDialog
            open={open}
            handleClose={() => {
              setOpen(false);
            }}
            plogData={plogData}
          />
        </>
      </RightInfiniteBar>
    </ExploreArea>
  );
};
