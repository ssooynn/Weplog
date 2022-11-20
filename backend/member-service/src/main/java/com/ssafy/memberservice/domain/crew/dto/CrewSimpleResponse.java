package com.ssafy.memberservice.domain.crew.dto;

import com.ssafy.memberservice.domain.crew.domain.Crew;
import com.ssafy.memberservice.domain.member.dto.MemberSimpleResponse;
import com.ssafy.memberservice.domain.membercrew.domain.MemberCrew;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CrewSimpleResponse {

    public Long crewId;
    public String name;
    public String description;
    public String imageUrl;
    public Integer maxParticipantCnt;
    public Integer participantCnt;
    public List<MemberSimpleResponse> memberList;

    public static CrewSimpleResponse from(Crew crew) {
        List<MemberCrew> memberCrewList = crew.getMemberCrewList();

        return CrewSimpleResponse.builder()
                .crewId(crew.getId())
                .name(crew.getName())
                .description(crew.getDescription())
                .imageUrl(crew.getImageUrl())
                .maxParticipantCnt(crew.getMaxParticipantCnt())
                .participantCnt(memberCrewList.size())
                .memberList(memberCrewList.stream().map(memberCrew -> MemberSimpleResponse.from(memberCrew.getMember()))
                        .collect(Collectors.toList()))
                .build();
    }

}
