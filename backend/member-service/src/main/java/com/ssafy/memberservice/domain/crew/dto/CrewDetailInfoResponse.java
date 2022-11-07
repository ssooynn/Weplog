package com.ssafy.memberservice.domain.crew.dto;

import com.ssafy.memberservice.domain.crew.domain.Crew;
import com.ssafy.memberservice.domain.member.dto.MemberSimpleResponse;
import com.ssafy.memberservice.domain.membercrew.domain.MemberCrew;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CrewDetailInfoResponse {

    public Long crewId;
    public String name;
    public String description;
    public String imageUrl;
    public String activityArea;
    public boolean isCrewMaster;

    public Long totalDistance;
    public Long totalTime;
    public Integer totalCnt;

    public List<MemberSimpleResponse> memberList = new ArrayList<>();

    public List<CrewPloggingRecordDate> ploggingDateList = new ArrayList<>();
    public boolean isMyCrew;

    public static CrewDetailInfoResponse from(Crew crew, CrewTotalRecordDtoInterface crewTotalRecord,
                                              List<CrewPloggingRecordDate> dateList, UUID loginMember) {
        CrewDetailInfoResponse crewDetailInfoResponse = new CrewDetailInfoResponse();
        crewDetailInfoResponse.crewId = crew.getId();
        crewDetailInfoResponse.name = crew.getName();
        crewDetailInfoResponse.description = crew.getDescription();
        crewDetailInfoResponse.imageUrl = crew.getImageUrl();
        crewDetailInfoResponse.activityArea = crew.getActivityArea();
        crewDetailInfoResponse.isCrewMaster = loginMember.equals(crew.getCrewMaster().getId());

        crewDetailInfoResponse.totalDistance = crewTotalRecord.getTotalDistance();
        crewDetailInfoResponse.totalTime = crewTotalRecord.getTotalTime();
        crewDetailInfoResponse.totalCnt = crewTotalRecord.getTotalCnt();

        crewDetailInfoResponse.memberList = crew.getMemberCrewList().stream()
                .map(memberCrew -> MemberSimpleResponse.from(memberCrew.getMember()))
                .collect(Collectors.toList());

        crewDetailInfoResponse.ploggingDateList = dateList;

        // 내가 속한 크루인지 검사
        boolean isMyCrew = false;
        for (MemberCrew memberCrew : crew.getMemberCrewList()) {
            if (memberCrew.getMember().getId().equals(loginMember)) {
                isMyCrew = true;
                break;
            }
        }
        crewDetailInfoResponse.isMyCrew = isMyCrew;

        return crewDetailInfoResponse;
    }
}
