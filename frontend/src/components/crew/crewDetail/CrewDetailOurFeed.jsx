import { Text } from "grommet";
import React, { useEffect, useState } from "react";
import { getCrewFeedList } from "../../../apis/ploggingApi";
import { DetailDialog } from "../../AlertDialog";
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
} from "../../main/MainExploreContents";

const CrewDetailOurFeed = ({ crewId }) => {
  const [open, setOpen] = useState(false);
  const [plogData, setPlogdata] = useState([]);
  const [recentFeedList, setRecentFeedList] = useState([]);

  useEffect(() => {
    getCrewFeedList(
      crewId,
      (response) => {
        console.log(response);
        setRecentFeedList(response.data);
      },
      (fail) => {
        console.log(fail);
      }
    );
  }, []);
  if (recentFeedList.length > 0)
    return (
      <ExploreArea
        style={{
          height: "auto",
        }}
      >
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
  else return <Text>플로깅 기록이 없습니다!</Text>;
};
export default React.memo(CrewDetailOurFeed);
