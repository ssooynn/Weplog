package com.ssafy.memberservice.domain.memberdetail.dto;

import com.ssafy.memberservice.global.common.uuid.UuidAdapter;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TotalRankingCntDto {

    private String memberId;
    private String name;
    private String nickname;
    private String profileImageUrl;
    private Long totalCnt;
    private Integer ranking;

    public static TotalRankingCntDto from(TotalRankingCntInterface interfaces) {
        TotalRankingCntDto totalRankingCntDto = new TotalRankingCntDto();
        totalRankingCntDto.memberId = UuidAdapter.getUUIDFromBytes(interfaces.getMemberId()).toString();
        totalRankingCntDto.name = interfaces.getName();
        totalRankingCntDto.nickname = interfaces.getNickname();
        totalRankingCntDto.profileImageUrl = interfaces.getProfileImageUrl();
        totalRankingCntDto.totalCnt = interfaces.getTotalCnt();
        totalRankingCntDto.ranking = interfaces.getRanking();

        return totalRankingCntDto;
    }
}
