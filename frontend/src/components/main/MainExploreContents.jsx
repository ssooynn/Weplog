import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { DetailDialog } from "../AlertDialog";
import { getRecentFeedList } from "../../apis/ploggingApi";
import dayjs from "dayjs";
export const ExploreArea = styled.div`
  height: 86vh;
  overflow: scroll;
  display: flex;
`;

export const LeftInfiniteBar = styled.div`
  flex-direction: column;
  width: 44%;
  margin: 2% 2% 0 4%;
`;

export const RightInfiniteBar = styled.div`
  flex-direction: column;
  width: 44%;
  margin: 2% 4% 0 2%;
`;

export const ArticleCard = styled.div`
  width: 100%;
  margin: 2% 0 8% 0;
`;

export const ArticleImg = styled.img`
  width: 100%;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const ArticleProfileArea = styled.div`
  padding: 3% 6%;
  display: flex;
  flex-direction: row;
  width: 94%;
  height: 7vh;
`;

export const ArticleProfileImgArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const ArticleProfileImg = styled.img`
  width: 5vh;
  height: 5vh;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid #e7e7e7;
`;

export const ArticleProfileTextArea = styled.div`
  padding-left: 1vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const ArticleProfileName = styled.div`
  font-size: 13px;
  display: flex;
  flex-direction: row;
  font-weight: 500;
  justify-content: flex-start;
`;

export const ArticleProfileTime = styled.div`
  font-size: 11px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

export function getPrettyPostingTime(PostingTime) {
  let today = dayjs();
  let nowYear = Number(today.year());
  let nowMonth = Number(today.month()) + 1;
  let nowDay = Number(today.date());
  let nowHour = Number(today.hour());
  let nowMin = Number(today.minute());

  let postingYear = Number(PostingTime.slice(0, 4));
  let postingMonth = Number(PostingTime.slice(5, 7));
  let postingDay = Number(PostingTime.slice(8, 10));
  let postingHour = Number(PostingTime.slice(11, 13));
  let postingMin = Number(PostingTime.slice(14, 16));

  if (nowYear === postingYear && nowMonth === postingMonth) {
    if (nowDay === postingDay) {
      if (nowHour === postingHour) {
        return String(nowMin - postingMin) + "분전";
      } else {
        return String(nowHour - postingHour) + "시간전";
      }
    } else {
      return String(nowDay - postingDay) + "일전";
    }
  } else {
    return (
      String(postingYear) +
      "년 " +
      String(postingMonth) +
      "월 " +
      String(postingDay) +
      "일"
    );
  }
}

export const MainExploreContents = () => {
  const [open, setOpen] = useState(false);
  const [plogData, setPlogdata] = useState([]);
  const [recentFeedList, setRecentFeedList] = useState([]);
  useEffect(() => {
    getRecentFeedList(
      (res) => {
        console.log(res);
        setRecentFeedList(res.data);
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  return (
    <ExploreArea>
      <LeftInfiniteBar>
        {recentFeedList !== undefined &&
          recentFeedList.length > 0 &&
          recentFeedList.map((feed, idx) => (
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
                        <ArticleProfileName>{feed.nickname}</ArticleProfileName>
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
          ))}
      </LeftInfiniteBar>

      <RightInfiniteBar>
        {recentFeedList !== undefined &&
          recentFeedList.length > 0 &&
          recentFeedList.map((feed, idx) => (
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
                        <ArticleProfileName>{feed.nickname}</ArticleProfileName>
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
          ))}
      </RightInfiniteBar>
      <DetailDialog
        open={open}
        handleClose={() => {
          setOpen(false);
        }}
        plogData={plogData}
      />
    </ExploreArea>
  );
};
