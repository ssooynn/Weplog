package com.ssafy.memberservice.domain.memberdetail.domain;

import com.ssafy.memberservice.domain.member.domain.Member;
import com.ssafy.memberservice.global.common.base.BaseEntity;
import lombok.*;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
@Builder
public class MemberDetail extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_detail_id")
    private Long id;

    private Integer point;
    private Long distance;
    private Long time;
    private Integer challengeCnt;
    private Integer ploggingCnt;
    private String profileImageUrl;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    public void addRewardPoint(int rewardPoint) {
        this.point += rewardPoint;
    }

    public void addChallengeCnt() {
        this.challengeCnt += 1;
    }

    public void updatePloggingLog(Integer distance, Integer time) {
        this.ploggingCnt += 1;
        this.distance += distance;
        this.time += time;
    }
}
