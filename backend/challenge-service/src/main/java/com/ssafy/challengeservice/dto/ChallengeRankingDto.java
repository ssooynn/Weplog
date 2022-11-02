package com.ssafy.challengeservice.dto;

import com.ssafy.challengeservice.domain.challengeranking.ChallengeRanking;
import com.ssafy.challengeservice.domain.member.Member;
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
                .memberId(dtoInterface.getMemberId())
                .name(dtoInterface.getName())
                .nickname(dtoInterface.getNickname())
                .profileImageUrl(dtoInterface.getProfileImageUrl())
                .contribution(dtoInterface.getContribution())
                .ranking(dtoInterface.getRanking())
                .challengeId(dtoInterface.getChallengeId())
                .build();
    }

    public static ChallengeRankingDto from(ChallengeRanking challengeRanking) {
        Member member = challengeRanking.getMember();

        return ChallengeRankingDto.builder()
                .memberId(member.getId().toString())
                .name(member.getName())
                .nickname(member.getNickname())
                .profileImageUrl(member.getProfileImageUrl())
                .contribution(challengeRanking.getContribution())
                .ranking(challengeRanking.getRanking())
                .challengeId(challengeRanking.getChallenge().getId())
                .build();
    }
}
