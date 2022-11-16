package com.ssafy.ploggingservice.dto;

import com.ssafy.ploggingservice.domain.Crew;
import com.ssafy.ploggingservice.domain.Member;
import com.ssafy.ploggingservice.domain.Plogging;
import com.ssafy.ploggingservice.service.PloggingService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PloggingReq {
    private int distance;
    private int time;
    private int calorie;
    private Long crewId;
    private List<CoordinateDto> coordinates = new ArrayList<>();
    public Plogging toEntity(Member member, Crew crew, String address){
        return Plogging.builder()
                .distance(distance)
                .time(time)
                .member(member)
                .calorie(calorie)
                .startLat(coordinates.get(0).getLat())
                .startLng(coordinates.get(0).getLng())
                .crew(crew == null ? null : crew)
                .startLoc(address)
                .build();
    }
}
