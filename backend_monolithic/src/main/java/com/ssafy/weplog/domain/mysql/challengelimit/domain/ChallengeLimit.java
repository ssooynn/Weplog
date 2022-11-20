package com.ssafy.weplog.domain.mysql.challengelimit.domain;

import com.ssafy.weplog.domain.mysql.challengetype.domain.ChallengeType;
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
public class ChallengeLimit extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "challenge_limit_id")
    private Long id;

    private Integer maxCnt;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "challenge_type_id")
    private ChallengeType challengeType;
}
