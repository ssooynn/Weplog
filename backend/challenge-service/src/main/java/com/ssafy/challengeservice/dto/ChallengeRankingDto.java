package com.ssafy.challengeservice.dto;

import com.ssafy.challengeservice.domain.member.Member;
import com.ssafy.challengeservice.global.common.uuid.UuidAdapter;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChallengeRankingDto implements Serializable {
    private String memberId;
    private String name;
    private String nickname;
    private String profileImageUrl;
    private Double contribution;
    private Integer ranking;
    private Long challengeId;

    public static ChallengeRankingDto from(ChallengeRankingDtoInterface dtoInterface) {
        return ChallengeRankingDto.builder()
                .memberId(UuidAdapter.getUUIDFromBytes(dtoInterface.getMemberId()).toString())
                .name(dtoInterface.getName())
                .nickname(dtoInterface.getNickname())
                .profileImageUrl(dtoInterface.getProfileImageUrl())
                .contribution(dtoInterface.getContribution())
                .ranking(dtoInterface.getRanking())
                .challengeId(dtoInterface.getChallengeId())
                .build();
    }
}
