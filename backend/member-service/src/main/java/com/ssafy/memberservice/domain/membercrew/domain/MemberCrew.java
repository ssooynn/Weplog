package com.ssafy.memberservice.domain.membercrew.domain;

import com.ssafy.memberservice.domain.crew.domain.Crew;
import com.ssafy.memberservice.domain.member.domain.Member;
import com.ssafy.memberservice.global.common.base.BaseEntity;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
public class MemberCrew extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_crew_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "crew_id")
    private Crew crew;

    private long totalDistance;

    private long totalTime;

    private int totalCnt;
}
