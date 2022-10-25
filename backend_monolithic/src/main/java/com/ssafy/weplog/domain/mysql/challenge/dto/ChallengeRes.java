package com.ssafy.weplog.domain.mysql.challenge.dto;

import com.ssafy.weplog.domain.mysql.challenge.domain.Challenge;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class ChallengeRes {
    private String title;
    private int goal;
    private LocalDate endDate;
    private int participantsCnt;
    private int rewardPoint;
    private int progress;
    private String imageUrl;

    @Builder
    public  ChallengeRes(Challenge challenge){
        this.title = challenge.getTitle();
        this.goal = challenge.getGoal();
        this.participantsCnt = challenge.getParticipantsCnt();
        this.rewardPoint = challenge.getRewardPoint();
        this.progress = challenge.getProgress();
        this.imageUrl = challenge.getImageUrl();
    }
}
