package com.ssafy.weplog.domain.mysql.challenge.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class ChallengeDto {
    private String title;
    private String type;
    private int goal;
    private LocalDate endDate;
    private int participantsCnt;
    private int maxParticipantsCnt;
    private int rewardPoint;
    private int progress;
    private boolean finishFlag;
    private Long challengeTypeId;
}
