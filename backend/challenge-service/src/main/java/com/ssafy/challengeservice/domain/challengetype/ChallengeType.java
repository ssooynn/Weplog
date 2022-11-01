package com.ssafy.challengeservice.domain.challengetype;

import com.ssafy.challengeservice.domain.challengelimit.ChallengeLimit;
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
public class ChallengeType extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "challenge_type_id")
    private Long id;

    @Column(length = 20)
    private String name;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "challenge_limit_id")
    private ChallengeLimit challengeLimit;
}
