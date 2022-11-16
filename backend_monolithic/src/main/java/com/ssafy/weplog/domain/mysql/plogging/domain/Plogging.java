package com.ssafy.weplog.domain.mysql.plogging.domain;

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
public class Plogging extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "plogging_id")
    private Long id;

    private Integer distance;
    private Integer time;
    private Integer calorie;

    @Column(length = 20)
    private String startLoc;

    private String certImageUrl;
    private String shareImageUrl;
    private Boolean certFlag;

    @Column(length = 15)
    private String startLat;

    @Column(length = 15)
    private String startLng;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "challenge_id")
    private Challenge challenge;

}
