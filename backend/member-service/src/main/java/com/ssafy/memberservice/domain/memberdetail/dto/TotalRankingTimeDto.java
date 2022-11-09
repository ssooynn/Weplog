package com.ssafy.memberservice.domain.memberdetail.dto;

import com.ssafy.memberservice.global.common.uuid.UuidAdapter;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TotalRankingTimeDto {

    private String memberId;
    private String name;
    private String nickname;
    private String profileImageUrl;
    private Long totalTime;
    private Integer ranking;

    public static TotalRankingTimeDto from(TotalRankingTimeInterface interfaces) {
        TotalRankingTimeDto totalRankingTimeDto = new TotalRankingTimeDto();
        totalRankingTimeDto.memberId = UuidAdapter.getUUIDFromBytes(interfaces.getMemberId()).toString();
        totalRankingTimeDto.name = interfaces.getName();
        totalRankingTimeDto.nickname = interfaces.getNickname();
        totalRankingTimeDto.profileImageUrl = interfaces.getProfileImageUrl();
        totalRankingTimeDto.totalTime = interfaces.getTotalTime();
        totalRankingTimeDto.ranking = interfaces.getRanking();

        return totalRankingTimeDto;
    }

}
