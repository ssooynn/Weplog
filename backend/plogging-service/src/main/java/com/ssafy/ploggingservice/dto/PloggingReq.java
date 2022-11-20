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
                .startLat(Math.round(coordinates.get(0).getLat() * 100_000) / 100_000.0)
                .startLng(Math.round(coordinates.get(0).getLng() * 100_000) / 100_000.0)
                .crew(crew)
                .startLoc(address)
                .build();
    }
}
