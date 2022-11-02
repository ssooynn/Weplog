package com.ssafy.challengeservice.domain.challengeranking;

import com.ssafy.challengeservice.domain.challenge.Challenge;
import com.ssafy.challengeservice.domain.member.Member;
import com.ssafy.challengeservice.domain.redis.RedisChallengeRanking;
import com.ssafy.challengeservice.dto.ChallengeRankingDto;
import com.ssafy.challengeservice.global.common.base.BaseEntity;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
public class ChallengeRanking extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "challenge_ranking_id")
    private Long id;

    private Integer ranking;
    private Double contribution;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "challenge_id")
    private Challenge challenge;

    public static ChallengeRanking create(ChallengeRankingDto rankingData, Member member, Challenge challenge) {
        ChallengeRanking challengeRanking = new ChallengeRanking();
        challengeRanking.ranking = rankingData.getRanking();
        challengeRanking.contribution = rankingData.getContribution();
        challengeRanking.member = member;
        challengeRanking.challenge = challenge;

        return challengeRanking;
    }
}
