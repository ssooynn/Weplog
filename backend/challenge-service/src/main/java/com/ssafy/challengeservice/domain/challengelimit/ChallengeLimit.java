package com.ssafy.challengeservice.domain.challengelimit;

import com.ssafy.challengeservice.domain.challengetype.ChallengeType;
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
public class ChallengeLimit extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "challenge_limit_id")
    private Long id;

    private Integer maxCnt;
    private Integer rewardPoint;
}
