package com.ssafy.weplog.domain.mysql.challengeranking.domain;

import com.ssafy.weplog.domain.mysql.challenge.domain.Challenge;
import com.ssafy.weplog.domain.mysql.member.domain.Member;
import com.ssafy.weplog.global.common.base.BaseEntity;
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
}
