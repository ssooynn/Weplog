package com.ssafy.weplog.domain.mysql.challenge.dto;

import com.ssafy.weplog.domain.mysql.challenge.domain.Challenge;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
public class ChallengeDetailRes {
    private String title;
    private int goal;
    private LocalDate endDate;
    private int participantsCnt;
    private int rewardPoint;
    private int progress;
    private String imageUrl;
    private int totalCnt;
    private Long totalDist;

    @Builder
    public ChallengeDetailRes(Challenge challenge, int totalCnt, Long totalDist){
        this.title = challenge.getTitle();
        this.goal = challenge.getGoal();
        this.endDate = challenge.getEndDate();
        this.progress = challenge.getProgress();
        this.imageUrl = challenge.getImageUrl();
        this.totalCnt = totalCnt;
        this.totalDist = totalDist;
    }
}
