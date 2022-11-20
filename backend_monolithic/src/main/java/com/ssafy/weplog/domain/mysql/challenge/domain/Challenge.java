package com.ssafy.weplog.domain.mysql.challenge.domain;

import com.ssafy.weplog.domain.mysql.challengetype.domain.ChallengeType;
import com.ssafy.weplog.global.common.base.BaseEntity;
import lombok.*;
import org.apache.catalina.User;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
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
    private Integer maxParticipantsCnt;
    private Integer rewardPoint;
    private Integer progress;
    private Boolean finishFlag;

    private String imageUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "challenge_type_id")
    private ChallengeType challengeType;

    @Builder
    public Challenge(String title, String type, int goal, LocalDate endDate, int participantsCnt, int maxParticipantsCnt, int rewardPoint, int progress, boolean finishFlag, ChallengeType challengeType, String imageUrl)
    {
        this.title = title;
        this.type = type;
        this.goal = goal;
        this.endDate = endDate;
        this.participantsCnt = participantsCnt;
        this.maxParticipantsCnt = maxParticipantsCnt;
        this.rewardPoint = rewardPoint;
        this.progress = progress;
        this.finishFlag = finishFlag;
        this.challengeType = challengeType;
        this.imageUrl = imageUrl;
    }
}
