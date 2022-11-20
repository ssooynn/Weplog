package com.ssafy.weplog.domain.mysql.challenge.dto;

import com.ssafy.weplog.domain.mysql.challenge.domain.Challenge;
import com.ssafy.weplog.domain.mysql.challengetype.domain.ChallengeType;
import lombok.Data;

import java.time.LocalDate;

@Data
public class ChallengeReq {
    String title;
    String type;
    int goal;
    LocalDate endDate;
    int participantsCnt;
    int maxParticipantsCnt;
    int rewardPoint;
    int progress;
    boolean finishFlag;
    Long challengeTypeId;

    public Challenge toEntity(ChallengeType challengeType){
        return Challenge.builder()
                .title(title)
                .type(type)
                .endDate(endDate)
                .goal(goal)
                .participantsCnt(participantsCnt)
                .maxParticipantsCnt(maxParticipantsCnt)
                .rewardPoint(rewardPoint)
                .progress(progress)
                .finishFlag(finishFlag)
                .challengeType(challengeType).build();
    }
}
