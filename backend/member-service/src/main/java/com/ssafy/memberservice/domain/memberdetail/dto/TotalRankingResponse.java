package com.ssafy.memberservice.domain.memberdetail.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TotalRankingResponse {

    private List<TotalRankingDistanceDto> distanceRanking;
    private List<TotalRankingTimeDto> timeRanking;
    private List<TotalRankingCntDto> cntRanking;

    public static TotalRankingResponse create(List<TotalRankingDistanceInterface> distanceInterfaces,
                                      List<TotalRankingTimeInterface> timeInterfaces,
                                      List<TotalRankingCntInterface> cntInterfaces) {
        TotalRankingResponse response = new TotalRankingResponse();
        response.distanceRanking = distanceInterfaces.stream()
                .map(totalRankingDistanceInterface -> TotalRankingDistanceDto.from(totalRankingDistanceInterface))
                .collect(Collectors.toList());
        response.timeRanking = timeInterfaces.stream()
                .map(totalRankingTimeInterface -> TotalRankingTimeDto.from(totalRankingTimeInterface))
                .collect(Collectors.toList());
        response.cntRanking = cntInterfaces.stream()
                .map(totalRankingCntInterface -> TotalRankingCntDto.from(totalRankingCntInterface))
                .collect(Collectors.toList());

        return response;
    }
}
