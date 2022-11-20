package com.ssafy.ploggingservice.dto;

import com.ssafy.ploggingservice.domain.Coordinate;
import com.ssafy.ploggingservice.domain.Member;
import com.ssafy.ploggingservice.domain.Plogging;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CrewPloggingByDateRes {

    private String memberId;
    private String nickname;
    private String profileImageUrl;
    private String color;
    private List<List<CoordinateDto>> coordinatesList = new ArrayList<>();
    private Integer totalTime;
    private Integer totalDistance;

    public static CrewPloggingByDateRes from(Plogging plogging) {
        CrewPloggingByDateRes crewPloggingByDateRes = new CrewPloggingByDateRes();
        Member member = plogging.getMember();
        crewPloggingByDateRes.memberId = member.getId().toString();
        crewPloggingByDateRes.nickname = member.getNickname();
        crewPloggingByDateRes.profileImageUrl = member.getProfileImageUrl();
        crewPloggingByDateRes.coordinatesList.add(
                plogging.getCoordinates()
                .stream().map(coordinate -> new CoordinateDto(coordinate))
                .collect(Collectors.toList())
        );
        crewPloggingByDateRes.totalTime = plogging.getTime();
        crewPloggingByDateRes.totalDistance = plogging.getDistance();

        return crewPloggingByDateRes;
    }

    public void addTimeAndDistance(Integer time, Integer distance) {
        this.totalTime += time;
        this.totalDistance += distance;
    }
}
