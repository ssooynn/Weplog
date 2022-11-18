package com.ssafy.challengeservice.dto;

import com.ssafy.challengeservice.domain.challenge.Challenge;
import com.ssafy.challengeservice.domain.memberchallenge.MemberChallenge;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
public class ChallengeRes {
    private String title;
    private String type;
    private int goal;
    private LocalDate endDate;
    private int participantsCnt;
    private int rewardPoint;
    private int progress;
    private double progressRate;
    private boolean finishFlag;
    private String imageUrl;
    private Long challengeId;

    @Builder
    public  ChallengeRes(Challenge challenge){
        this.title = challenge.getTitle();
        this.goal = challenge.getGoal();
        this.participantsCnt = challenge.getParticipantsCnt();
        this.rewardPoint = challenge.getRewardPoint();
        this.progress = challenge.getProgress();
        this.imageUrl = challenge.getImageUrl();
        this.challengeId = challenge.getId();
        this.type = challenge.getType();

    }

    public static ChallengeRes create(Challenge challenge) {
        ChallengeRes challengeRes = new ChallengeRes();
        challengeRes.title = challenge.getTitle();
        challengeRes.type = challenge.getType();
        challengeRes.goal = challenge.getGoal();
        challengeRes.endDate = challenge.getEndDate();
        challengeRes.participantsCnt = challenge.getParticipantsCnt();
        challengeRes.rewardPoint = challenge.getRewardPoint();
        challengeRes.progress = challenge.getProgress();
        challengeRes.progressRate = ((double)challenge.getProgress() / challenge.getGoal()) * 100;
        challengeRes.finishFlag = challenge.getFinishFlag();
        challengeRes.imageUrl = challenge.getImageUrl();
        challengeRes.challengeId = challenge.getId();

        return challengeRes;
    }
}
