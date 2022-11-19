import { Box, Text } from "grommet";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPloggingList, getRecentFeedList } from "../../apis/ploggingApi";
import leftArrowIcon from "../../assets/icons/leftArrowIcon.svg";
import { DetailDialog } from "../../components/AlertDialog";
import {
  ArticleCard,
  ArticleImg,
  ArticleProfileArea,
  ArticleProfileImg,
  ArticleProfileImgArea,
  ArticleProfileName,
  ArticleProfileTextArea,
  ArticleProfileTime,
  ExploreArea,
  getPrettyPostingTime,
  LeftInfiniteBar,
  RightInfiniteBar,
} from "../../components/main/MainExploreContents";
export const MypagePloggingLog = () => {
  const [logs, setLogs] = useState([]);
  const User = useSelector((state) => state.user.user);
  const [open, setOpen] = useState(false);
  const [plogData, setPlogdata] = useState([]);
  useEffect(() => {
    getRecentFeedList(
      (res) => {
        console.log(res);
        res.data.forEach((log) => {
          if (log.nickname === User.nickname) setLogs((prev) => [...prev, log]);
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);
  const navigate = useNavigate();
  return (
    <Box
      direction="column"
      height="auto"
      justify="start"
      style={{ minHeight: "700px" }}
    >
      {/* 제목 Header */}
      <Box
        direction="row"
        pad="18px"
        width="100%"
        height="60px"
        justify="between"
        align="center"
        border={{
          color: "#EAEAEA",
          size: "2px",
          styled: "solid",
          side: "bottom",
        }}
      >
        <img
          src={leftArrowIcon}
          width="30px"
          height="30px"
          onClick={(e) => navigate(-1)}
        />
        <Text size="16px" weight={500} style={{ alignSelf: "end" }}>
          {" "}
          내 플로깅 기록
        </Text>
        <Box width="30px"></Box>
      </Box>
      <ExploreArea
        style={{
          height: "auto",
        }}
      >
        <LeftInfiniteBar>
          {logs !== undefined &&
            logs.length > 0 &&
            logs.map((feed, idx) => {
              return (
                <div key={idx}>
                  {idx % 2 === 0 ? (
                    <>
                      <ArticleCard
                        onClick={() => (setOpen(true), setPlogdata(feed))}
                      >
                        <ArticleImg src={feed.imageUrl} />
                        <ArticleProfileArea>
                          <ArticleProfileImgArea>
                            <ArticleProfileImg src={feed.profileImageUrl} />
                          </ArticleProfileImgArea>
                          <ArticleProfileTextArea>
                            <ArticleProfileName>
                              {feed.nickname}
                            </ArticleProfileName>
                            <ArticleProfileTime>
                              {getPrettyPostingTime(feed.createdDate)}
                            </ArticleProfileTime>
                          </ArticleProfileTextArea>
                        </ArticleProfileArea>
                      </ArticleCard>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              );
            })}
        </LeftInfiniteBar>

        <RightInfiniteBar>
          {logs !== undefined &&
            logs.length > 0 &&
            logs.map((feed, idx) => {
              return (
                <div key={idx}>
                  {idx % 2 === 1 ? (
                    <>
                      <ArticleCard
                        onClick={() => (setOpen(true), setPlogdata(feed))}
                      >
                        <ArticleImg src={feed.imageUrl} />
                        <ArticleProfileArea>
                          <ArticleProfileImgArea>
                            <ArticleProfileImg src={feed.profileImageUrl} />
                          </ArticleProfileImgArea>
                          <ArticleProfileTextArea>
                            <ArticleProfileName>
                              {feed.nickname}
                            </ArticleProfileName>
                            <ArticleProfileTime>
                              {getPrettyPostingTime(feed.createdDate)}
                            </ArticleProfileTime>
                          </ArticleProfileTextArea>
                        </ArticleProfileArea>
                      </ArticleCard>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              );
            })}
        </RightInfiniteBar>
        <DetailDialog
          open={open}
          handleClose={() => {
            setOpen(false);
          }}
          plogData={plogData}
        />
      </ExploreArea>
    </Box>
  );
};
