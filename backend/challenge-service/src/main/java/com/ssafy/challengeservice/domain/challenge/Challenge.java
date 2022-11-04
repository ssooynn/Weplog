package com.ssafy.challengeservice.domain.challenge;

import com.ssafy.challengeservice.domain.challengetype.ChallengeType;
import com.ssafy.challengeservice.domain.member.Member;
import com.ssafy.challengeservice.domain.memberchallenge.MemberChallenge;
import com.ssafy.challengeservice.global.common.base.BaseEntity;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
@Builder
public class Challenge extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "challenge_id")
    private Long id;

    @Column(length = 50)
    private String title;

    @Column(length = 10)
    private String type;

    private Integer goal;
    private LocalDate endDate;
    private Integer participantsCnt;
    private Integer rewardPoint;
    private Integer progress;
    private Boolean finishFlag;

    private String imageUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "challenge_type_id")
    private ChallengeType challengeType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    private Integer totalDistance;
    private Integer totalPloggingCnt;
    private Integer totalTime;

    @OneToMany(mappedBy = "challenge")
    private List<MemberChallenge> memberChallengeList = new ArrayList<>();

    public void updateParticipantsCnt() {
        this.participantsCnt += 1;
    }

    public void updateAfterPlogging(Integer distance, Integer time) {
        this.totalDistance += distance;
        this.totalPloggingCnt += 1;
        this.totalTime = time;
        if ("DISTANCE".equals(type)) {
            progress += distance;
        } else if ("TIME".equals(type)) {
            progress += time;
        } else if ("PLOGGING_CNT".equals(type)) {
            progress += 1;
        }
    }

    public void exitChallenge() {
        this.participantsCnt -= 1;
    }
}
