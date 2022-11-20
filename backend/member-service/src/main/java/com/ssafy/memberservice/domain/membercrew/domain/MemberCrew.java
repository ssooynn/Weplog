package com.ssafy.memberservice.domain.membercrew.domain;

import com.ssafy.memberservice.domain.crew.domain.Crew;
import com.ssafy.memberservice.domain.member.domain.Member;
import com.ssafy.memberservice.global.common.base.BaseEntity;
import lombok.*;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
@Builder
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

    @Column(unique = true, length = 10)
    private String nickname;

    private String profileImageUrl;

    public static MemberCrew create(Member findMember, Crew saveCrew) {
        return MemberCrew.builder()
                .member(findMember)
                .crew(saveCrew)
                .totalDistance(0)
                .totalTime(0)
                .totalCnt(0)
                .nickname(findMember.getNickname())
                .profileImageUrl(findMember.getProfileImageUrl())
                .build();
    }

    public void updateRecord(Integer distance, Integer time) {
        this.totalCnt += 1;
        this.totalDistance += distance;
        this.totalTime += time;
    }
}
