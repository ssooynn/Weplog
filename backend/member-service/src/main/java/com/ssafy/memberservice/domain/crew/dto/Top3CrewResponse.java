package com.ssafy.memberservice.domain.crew.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Top3CrewResponse {

    private List<Top3CrewDto> top3Distance = new ArrayList<>();
    private List<Top3CrewDto> top3Time = new ArrayList<>();

    public static Top3CrewResponse from(List<Top3CrewDto> top3Distance, List<Top3CrewDto> top3Time) {
        Top3CrewResponse top3CrewResponse = new Top3CrewResponse();
        top3CrewResponse.top3Distance = top3Distance;
        top3CrewResponse.top3Time = top3Time;

        return top3CrewResponse;
    }
}
