package com.ssafy.weplog.domain.mysql.challenge.dto;

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
}
