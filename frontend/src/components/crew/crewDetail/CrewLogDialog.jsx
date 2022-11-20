import { Avatar, Spinner } from "grommet";
import { Dialog, DialogTitle } from "@mui/material";
import { Box, Text } from "grommet";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../../Button";
import { getCrewPloggingDetail } from "../../../apis/ploggingApi";
import { CustomOverlayMap, Map, Polyline } from "react-kakao-maps-sdk";
import {
  calcDistance,
  convertStringToColor,
  httpToHttps,
} from "../../../utils/util";

export const CrewLogDialog = ({ open, onClose, crewId, date }) => {
  const [loading, setLoading] = useState(true);
  const [log, setLog] = useState();
  const [distance, setDistance] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  useEffect(() => {
    if (loading)
      getCrewPloggingDetail(
        crewId,
        date,
        (response) => {
          console.log(response);
          setLog(response.data);
          let d = 0;
          let t = 0;
          response.data.forEach((log) => {
            d = d + log.totalDistance;
            t = t + totalTime;
          });
          setDistance(d);
          setTotalTime(t);
          setLoading(false);
        },
        (fail) => {
          console.log(fail);
        }
      );
    return () => {
      setLoading(false);
    };
  }, []);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle
        id="alert-dialog-title"
        style={{
          fontFamily: "gwmd",
          fontWeight: "bold",
          fontSize: "16px",
          padding: "10px",
        }}
      >
        {date}
      </DialogTitle>
      {loading ? (
        <Spinner />
      ) : (
        <Box
          direction="column"
          width="80vw"
          height="50vh"
          justify="around"
          align="start"
        >
          {log.length > 0 && (
            <Map
              center={log[0].coordinatesList[0][0]}
              isPanto={true}
              style={{ width: "100%", height: "100%" }}
            >
              {log.length > 0 &&
                log.map((member, index) => {
                  console.log(member);
                  return member.coordinatesList.map((coord, idx) => {
                    return (
                      <CustomOverlayMap // 커스텀 오버레이를 표시할 Container
                        // 커스텀 오버레이가 표시될 위치입니다
                        position={{ lat: coord[0].lat, lng: coord[0].lng }}
                        key={idx}
                      >
                        {/* 커스텀 오버레이에 표시할 내용입니다 */}
                        <Avatar
                          src={httpToHttps(member.profileImageUrl)}
                          style={{
                            width: "35px",
                            height: "35px",
                            border: `3px inset ${convertStringToColor(
                              member.color
                            )}`,
                          }}
                        />
                      </CustomOverlayMap>
                    );
                  });
                })}

              {log.length > 0 &&
                log.map((logg, index) => {
                  console.log(logg);
                  return logg.coordinatesList.map((coord, idx) => {
                    return (
                      <Polyline
                        key={idx}
                        path={[coord]}
                        strokeWeight={5} // 선의 두께 입니다
                        strokeColor={convertStringToColor(logg.color)} // 선의 색깔입니다
                        strokeOpacity={0.7} // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
                        strokeStyle={"solid"} // 선의 스타일입니다
                      />
                    );
                  });
                })}
            </Map>
          )}
          <Box
            direction="row"
            width="90%"
            justify="end"
            gap="large"
            margin="10px"
          >
            <Box direction="row" align="end" height="100%">
              <Text weight="bold">{calcDistance(totalTime)}</Text>
              <Text size="14px">시간</Text>
            </Box>
            <Box direction="row" align="end" height="100%">
              <Text weight="bold">{calcDistance(distance)}</Text>
              <Text size="14px">km</Text>
            </Box>
          </Box>

          <Box
            direction="row"
            overflow="scroll"
            height="100px"
            width="100%"
            pad="10px 10px"
            gap="medium"
          >
            {log.length > 0 &&
              log.map((member, index) => {
                return (
                  <Box key={index} align="center" justify="center">
                    <Avatar
                      src={httpToHttps(member.profileImageUrl)}
                      style={{
                        width: "50px",
                        height: "50px",
                        border: `3px inset ${convertStringToColor(
                          member.color
                        )}`,
                      }}
                    />
                    <Text size="10px" weight="bold">
                      {member.nickname}
                    </Text>
                  </Box>
                );
              })}
          </Box>
        </Box>
      )}
    </Dialog>
  );
};
