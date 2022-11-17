import { Box, Spinner, Text } from "grommet";
import React, { useEffect } from "react";
import styled from "styled-components";
import shareIcon from "../../assets/icons/shareIcon.svg";
import CrewDetailWeplog from "../../components/crew/crewDetail/CrewDetailWeplog.jsx";
import CrewDetailMember from "../../components/crew/crewDetail/CrewDetailMember.jsx";
import CrewDetailOurFeed from "../../components/crew/crewDetail/CrewDetailOurFeed.jsx";
import CrewDetailTalk from "../../components/crew/crewDetail/CrewDetailTalk.jsx";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { getCrewDetail } from "../../apis/crewApi";

const StyledProfile = styled.img`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  position: absolute;
  left: ${(props) => props.left || "20px"};
  bottom: -18px;
`;

const ProfileList = ({ memberList }) => {
  return (
    <div style={{ position: "relative" }}>
      {memberList.map((member, index) => {
        if (index < 4)
          return (
            <StyledProfile
              key={index}
              src={member.profileImageUrl}
              left={`${parseInt(-90 + index * 20)}px`}
            />
          );
      })}

      {/* <StyledProfile
        src="https://picsum.photos/100/100?random=45"
        left="-30px"
      />
      <StyledProfile
        src="https://picsum.photos/100/100?random=44"
        left="-50px"
      />
      <StyledProfile
        src="https://picsum.photos/100/100?random=43"
        left="-70px"
      />
      <StyledProfile
        src="https://picsum.photos/100/100?random=42"
        left="-90px"
      /> */}
    </div>
  );
};

export const CrewDetail = () => {
  const { crewId } = useParams();
  const [clicked, setClicked] = useState(0);
  const [crewData, setCrewData] = useState();
  const [loading, setLoading] = useState(true);
  const [reloading, setReloading] = useState(false);
  const clickedStyle = {
    color: "#00853B",
    textDecoration: "underline",
    textUnderlinePosition: "under",
    textDecorationThickness: "2px",
  };
  const sharePage = () => {
    window.navigator.share({
      title: `Beedly`,
      text: `히히`,
      url: window.location.href,
    });
  };

  const getCrew = () => {
    getCrewDetail(
      crewId,
      (response) => {
        console.log(response);
        setCrewData(response.data);
        if (
          response.data.isCrewMaster === true ||
          response.data.isCrewMaster === "true"
        ) {
        }
        setLoading(false);
      },
      (fail) => {
        console.log(fail);
      }
    );
  };

  useEffect(() => {
    if (loading) {
      getCrew();
    }
    return () => {
      setLoading(false);
    };
  }, []);

  if (loading) return <Spinner />;
  else
    return (
      <div style={{ width: "100%" }}>
        <Box style={{ position: "relative", width: "100%" }} height="250px">
          <img
            src={crewData.imageUrl}
            width="100%"
            height="250px"
            alt="크루배경"
            style={{ position: "absolute", objectFit: "cover" }}
          />
          <Box
            style={{ position: "absolute", bottom: "0px" }}
            width="100%"
            background={{ color: "white" }}
            round="10px 10px 0px 0px"
            height="20px"
            border={{
              color: "white",
              size: "3px",
              style: "solid",
              side: "all",
            }}
          ></Box>
        </Box>
        <Box
          background={{ color: "white" }}
          pad="15px 30px 35px 30px"
          margin={{ bottom: "50px" }}
        >
          <Box direction="row" justify="between" align="center">
            <Text size="20px" weight={500}>
              {crewData.name}
            </Text>
            <img
              src={shareIcon}
              width="20px"
              height="20px"
              alt="공유"
              onClick={sharePage}
            />
          </Box>
          <Text size="12px" weight={500} margin="10px 0px 30px 0px">
            {crewData.description}
          </Text>
          <Box direction="row" justify="between" align="center">
            <Box direction="column">
              <Text size="12px" weight={500}>
                {`총 플로깅 횟수 : ${crewData.totalCnt}회`}
              </Text>
              <Text size="12px" weight={500}>
                {`총 플로깅 거리 : ${crewData.totalDistance}Km`}
              </Text>
            </Box>
            <ProfileList memberList={crewData.memberList}></ProfileList>
          </Box>
          {crewData.isMyCrew && (
            <Box
              direction="row"
              margin="20px 0px"
              justify="between"
              width="250px"
            >
              <Text
                size="14px"
                weight={500}
                color="#AEAEAE"
                style={clicked === 0 ? clickedStyle : {}}
                onClick={() => setClicked(0)}
              >
                Weplog
              </Text>
              <Text
                size="14px"
                weight={400}
                color="#AEAEAE"
                style={clicked === 1 ? clickedStyle : {}}
                onClick={() => setClicked(1)}
              >
                TALK
              </Text>
              <Text
                size="14px"
                weight={400}
                color="#AEAEAE"
                style={clicked === 2 ? clickedStyle : {}}
                onClick={() => setClicked(2)}
              >
                Our Feed
              </Text>
              <Text
                size="14px"
                weight={400}
                color="#AEAEAE"
                style={clicked === 3 ? clickedStyle : {}}
                onClick={() => setClicked(3)}
              >
                Member
              </Text>
            </Box>
          )}
          {crewData.isMyCrew && (
            <Box direction="column">
              {clicked === 0 && (
                <CrewDetailWeplog
                  ploggingDateList={crewData.ploggingDateList}
                  crewId={crewId}
                  isMyCrew={crewData.isMyCrew}
                />
              )}
              {clicked === 1 && <CrewDetailTalk crewId={crewId} />}
              {clicked === 2 && <CrewDetailOurFeed crewId={crewId} />}
              {clicked === 3 && (
                <CrewDetailMember getCrew={getCrew} crewData={crewData} />
              )}
            </Box>
          )}
          {!crewData.isMyCrew && (
            <CrewDetailMember getCrew={getCrew} crewData={crewData} />
          )}
          {!crewData.isMyCrew && (
            <CrewDetailWeplog
              ploggingDateList={crewData.ploggingDateList}
              crewId={crewId}
              isMyCrew={crewData.isMyCrew}
            />
          )}
        </Box>
      </div>
    );
};
