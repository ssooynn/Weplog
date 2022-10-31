package com.ssafy.ploggingservice.domain;

import com.ssafy.ploggingservice.global.common.base.BaseEntity;
import lombok.*;

import javax.persistence.*;

@Entity
@Builder
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

    private String imageUrl;
    private Boolean certFlag;

    @Column(length = 15)
    private double startLat;

    @Column(length = 15)
    private double startLng;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @JoinColumn(name = "challenge_id")
    private String ChallengeId;
}
