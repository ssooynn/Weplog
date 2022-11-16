package com.ssafy.memberservice.domain.memberdetail.dto;

import com.ssafy.memberservice.global.common.uuid.UuidAdapter;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TotalRankingDistanceDto {

    private String memberId;
    private String name;
    private String nickname;
    private String profileImageUrl;
    private Long totalDistance;
    private Integer ranking;

    public static TotalRankingDistanceDto from(TotalRankingDistanceInterface distanceInterface) {
        TotalRankingDistanceDto totalRankingDistanceDto = new TotalRankingDistanceDto();
        totalRankingDistanceDto.memberId = UuidAdapter.getUUIDFromBytes(distanceInterface.getMemberId()).toString();
        totalRankingDistanceDto.name = distanceInterface.getName();
        totalRankingDistanceDto.nickname = distanceInterface.getNickname();
        totalRankingDistanceDto.profileImageUrl = distanceInterface.getProfileImageUrl();
        totalRankingDistanceDto.totalDistance = distanceInterface.getTotalDistance();
        totalRankingDistanceDto.ranking = distanceInterface.getRanking();

        return totalRankingDistanceDto;
    }
}
