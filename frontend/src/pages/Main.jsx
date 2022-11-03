import { motion } from "framer-motion";
import { container } from "../utils/util";
import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Box } from "grommet";
import { MainMYContents } from "../components/main/MainMYContents";

const MainCategoryContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1vh 0 1vh 0;
  height: 5vh;
`;

const MainMyCategory = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #57ba83;
  padding: 0 2vh 0 2vh;
  cursor: pointer;
  &:after {
    content: "";
    display: block;
    width: ${(props) => (props.isMyCategory ? "18px" : "0px")};
    border-bottom: 2px solid #57ba83;
    margin: auto;
  }
`;

const MainExploreCategory = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: rgba(87, 186, 131, 0.6);
  padding: 0 2vh 0 2vh;
  cursor: pointer;
  &:after {
    content: "";
    display: block;
    width: ${(props) => (props.isMyCategory ? "0px" : "18px")};
    border-bottom: 2px solid #57ba83;
    margin: auto;
  }
`;

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

export const Main = () => {
  // const location = useLocation();
  // const navigate = useNavigate();
  const [isMyCategory, setIsMyCategory] = useState(true);
  const OnPressExplore = () => setIsMyCategory(false);
  const OnPressMy = () => setIsMyCategory(true);
  const [open, setOpen] = useState(false);
  const [plogData, setPlogData] = useState({
    ArticleImgURL: "https://picsum.photos/200/400?random=2",
    ProfileImgURL: "https://picsum.photos/200/300?random=41",
    Name: "이수연",
    Time: "2",
  });

  return (
    <div
      style={{
        width: "100%",
        justify: "center",
        background:
          "linear-gradient(307.96deg, rgba(87, 186, 131, 0.296), rgba(29, 38, 255, 0.088))",
        textAlign: "center",
        height: "94vh",
      }}
    >
      <MainCategoryContainer>
        <MainMyCategory onClick={() => navigate("/main")}>
          MY
        </MainMyCategory>
        <MainExploreCategory
          isMyCategory={isMyCategory}
          onClick={OnPressExplore}
        >
          탐험하기
        </MainExploreCategory>
      </MainCategoryContainer>
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
          <ArticleCard>
            <ArticleImg src="https://picsum.photos/200/300?random=20" />
            <ArticleProfileArea>
              <ArticleProfileImg src="https://picsum.photos/200/300?random=42" />
              <ArticleProfileTextArea>
                <ArticleProfileName>이아현</ArticleProfileName>
                <ArticleProfileTime>2분전</ArticleProfileTime>
              </ArticleProfileTextArea>
            </ArticleProfileArea>
          </ArticleCard>
          <ArticleCard>
            <ArticleImg src="https://picsum.photos/200/400?random=2" />
            <ArticleProfileArea>
              <ArticleProfileImg src="https://picsum.photos/200/300?random=43" />
              <ArticleProfileTextArea>
                <ArticleProfileName>문석희</ArticleProfileName>
                <ArticleProfileTime>3분전</ArticleProfileTime>
              </ArticleProfileTextArea>
            </ArticleProfileArea>
          </ArticleCard>
          <ArticleCard>
            <ArticleImg src="https://picsum.photos/200/400?random=7" />
            <ArticleProfileArea>
              <ArticleProfileImg src="https://picsum.photos/200/300?random=44" />
              <ArticleProfileTextArea>
                <ArticleProfileName>박재권</ArticleProfileName>
                <ArticleProfileTime>16분전</ArticleProfileTime>
              </ArticleProfileTextArea>
            </ArticleProfileArea>
          </ArticleCard>
          <ArticleCard>
            <ArticleImg src="https://picsum.photos/200/100?random=4" />
            <ArticleProfileArea>
              <ArticleProfileImg src="https://picsum.photos/200/300?random=45" />
              <ArticleProfileTextArea>
                <ArticleProfileName>배인수</ArticleProfileName>
                <ArticleProfileTime>21분전</ArticleProfileTime>
              </ArticleProfileTextArea>
            </ArticleProfileArea>
          </ArticleCard>
          <ArticleCard>
            <ArticleImg src="https://picsum.photos/200/400?random=8" />
            <ArticleProfileArea>
              <ArticleProfileImg src="https://picsum.photos/200/300?random=46" />
              <ArticleProfileTextArea>
                <ArticleProfileName>이태희</ArticleProfileName>
                <ArticleProfileTime>22분전</ArticleProfileTime>
              </ArticleProfileTextArea>
            </ArticleProfileArea>
          </ArticleCard>
          <ArticleCard>
            <ArticleImg src="https://picsum.photos/200/400?random=12" />
            <ArticleProfileArea>
              <ArticleProfileImg src="https://picsum.photos/200/300?random=47" />
              <ArticleProfileTextArea>
                <ArticleProfileName>카즈하</ArticleProfileName>
                <ArticleProfileTime>51분전</ArticleProfileTime>
              </ArticleProfileTextArea>
            </ArticleProfileArea>
          </ArticleCard>
          <ArticleCard>
            <ArticleImg src="https://picsum.photos/200/300?random=22" />
            <ArticleProfileArea>
              <ArticleProfileImg src="https://picsum.photos/200/300?random=48" />
              <ArticleProfileTextArea>
                <ArticleProfileName>카즈하</ArticleProfileName>
                <ArticleProfileTime>1분전</ArticleProfileTime>
              </ArticleProfileTextArea>
            </ArticleProfileArea>
          </ArticleCard>
          <ArticleCard>
            <ArticleImg src="https://picsum.photos/200/400?random=24" />
            <ArticleProfileArea>
              <ArticleProfileImg src="https://picsum.photos/200/300?random=49" />
              <ArticleProfileTextArea>
                <ArticleProfileName>카즈하</ArticleProfileName>
                <ArticleProfileTime>1분전</ArticleProfileTime>
              </ArticleProfileTextArea>
            </ArticleProfileArea>
          </ArticleCard>
          <ArticleCard>
            <ArticleImg src="https://picsum.photos/200/400?random=62" />
            <ArticleProfileArea>
              <ArticleProfileImg src="https://picsum.photos/200/300?random=50" />
              <ArticleProfileTextArea>
                <ArticleProfileName>카즈하</ArticleProfileName>
                <ArticleProfileTime>1분전</ArticleProfileTime>
              </ArticleProfileTextArea>
            </ArticleProfileArea>
          </ArticleCard>
        </LeftInfiniteBar>

        <RightInfiniteBar>
          <ArticleCard>
            <ArticleImg src="https://picsum.photos/200/200?random=1" />
            <ArticleProfileArea>
              <ArticleProfileImg src="https://picsum.photos/200/300?random=51" />
              <ArticleProfileTextArea>
                <ArticleProfileName>이진행</ArticleProfileName>
                <ArticleProfileTime>2분전</ArticleProfileTime>
              </ArticleProfileTextArea>
            </ArticleProfileArea>
          </ArticleCard>
          <ArticleCard>
            <ArticleImg src="https://picsum.photos/200/300?random=2" />
            <ArticleProfileArea>
              <ArticleProfileImg src="https://picsum.photos/200/300?random=52" />
              <ArticleProfileTextArea>
                <ArticleProfileName>당현아</ArticleProfileName>
                <ArticleProfileTime>3분전</ArticleProfileTime>
              </ArticleProfileTextArea>
            </ArticleProfileArea>
          </ArticleCard>
          <ArticleCard>
            <ArticleImg src="https://picsum.photos/200/400?random=1" />
            <ArticleProfileArea>
              <ArticleProfileImg src="https://picsum.photos/200/300?random=53" />
              <ArticleProfileTextArea>
                <ArticleProfileName>카즈하</ArticleProfileName>
                <ArticleProfileTime>4분전</ArticleProfileTime>
              </ArticleProfileTextArea>
            </ArticleProfileArea>
          </ArticleCard>
          <ArticleCard>
            <ArticleImg src="https://picsum.photos/200/200?random=1" />
            <ArticleProfileArea>
              <ArticleProfileImg src="https://picsum.photos/200/300?random=54" />
              <ArticleProfileTextArea>
                <ArticleProfileName>장원영</ArticleProfileName>
                <ArticleProfileTime>5분전</ArticleProfileTime>
              </ArticleProfileTextArea>
            </ArticleProfileArea>
          </ArticleCard>
          <ArticleCard>
            <ArticleImg src="https://picsum.photos/200/100?random=1" />
            <ArticleProfileArea>
              <ArticleProfileImg src="https://picsum.photos/200/300?random=55" />
              <ArticleProfileTextArea>
                <ArticleProfileName>안유진</ArticleProfileName>
                <ArticleProfileTime>6분전</ArticleProfileTime>
              </ArticleProfileTextArea>
            </ArticleProfileArea>
          </ArticleCard>
          <ArticleCard>
            <ArticleImg src="https://picsum.photos/200/400?random=5" />
            <ArticleProfileArea>
              <ArticleProfileImg src="https://picsum.photos/200/300?random=56" />
              <ArticleProfileTextArea>
                <ArticleProfileName>카즈하</ArticleProfileName>
                <ArticleProfileTime>1분전</ArticleProfileTime>
              </ArticleProfileTextArea>
            </ArticleProfileArea>
          </ArticleCard>
          <ArticleCard>
            <ArticleImg src="https://picsum.photos/200/400?random=3" />
            <ArticleProfileArea>
              <ArticleProfileImg src="https://picsum.photos/200/300?random=57" />
              <ArticleProfileTextArea>
                <ArticleProfileName>카즈하</ArticleProfileName>
                <ArticleProfileTime>1분전</ArticleProfileTime>
              </ArticleProfileTextArea>
            </ArticleProfileArea>
          </ArticleCard>
          <ArticleCard>
            <ArticleImg src="https://picsum.photos/200/400?random=4" />
            <ArticleProfileArea>
              <ArticleProfileImg src="https://picsum.photos/200/300?random=58" />
              <ArticleProfileTextArea>
                <ArticleProfileName>카즈하</ArticleProfileName>
                <ArticleProfileTime>1분전</ArticleProfileTime>
              </ArticleProfileTextArea>
            </ArticleProfileArea>
          </ArticleCard>
          <ArticleCard>
            <ArticleImg src="https://picsum.photos/200/400?random=32" />
            <ArticleProfileArea>
              <ArticleProfileImg src="https://picsum.photos/200/300?random=59" />
              <ArticleProfileTextArea>
                <ArticleProfileName>카즈하</ArticleProfileName>
                <ArticleProfileTime>1분전</ArticleProfileTime>
              </ArticleProfileTextArea>
            </ArticleProfileArea>
          </ArticleCard>
          <ArticleCard>
            <ArticleImg src="https://picsum.photos/200/300?random=50" />
            <ArticleProfileArea>
              <ArticleProfileImg src="https://picsum.photos/200/300?random=60" />
              <ArticleProfileTextArea>
                <ArticleProfileName>카즈하</ArticleProfileName>
                <ArticleProfileTime>1분전</ArticleProfileTime>
              </ArticleProfileTextArea>
            </ArticleProfileArea>
          </ArticleCard>
          <ArticleCard>
            <ArticleImg src="https://picsum.photos/200/400?random=27" />
            <ArticleProfileArea>
              <ArticleProfileImg src="https://picsum.photos/200/300?random=61" />
              <ArticleProfileTextArea>
                <ArticleProfileName>카즈하</ArticleProfileName>
                <ArticleProfileTime>1분전</ArticleProfileTime>
              </ArticleProfileTextArea>
            </ArticleProfileArea>
          </ArticleCard>
        </RightInfiniteBar>
      </ExploreArea>
    </motion.div>
  );
};
