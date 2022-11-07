package com.ssafy.challengeservice.domain.memberchallenge;

import com.ssafy.challengeservice.domain.challenge.Challenge;
import com.ssafy.challengeservice.domain.member.Member;
import com.ssafy.challengeservice.global.common.base.BaseEntity;
import lombok.*;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
@Builder
public class MemberChallenge extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_challenging_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "challenge_id")
    private Challenge challenge;

    private Long totalAmount;
    private String nickname;
    private String profileImageUrl;

    public void updateAfterPlogging(Integer distance, Integer time) {
        if (this.challenge.getType().equals("DISTANCE")) {
            this.totalAmount += distance;
        } else if (this.challenge.getType().equals("TIME")) {
            this.totalAmount += time;
        } else if (this.challenge.getType().equals("PLOGGING_CNT")) {
            this.totalAmount += 1;
        }
    }
}
