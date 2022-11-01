package com.ssafy.challengeservice.dto;

import com.ssafy.challengeservice.domain.challenge.Challenge;
import com.ssafy.challengeservice.domain.challengetype.ChallengeType;
import com.ssafy.challengeservice.domain.member.Member;
import lombok.Data;

import java.time.LocalDate;

@Data
public class ChallengeReq {
    String title;
    String type;
    int goal;
    LocalDate endDate;
    int participantsCnt;
    int rewardPoint;
    int progress;
    boolean finishFlag;
    Long challengeTypeId;

    public Challenge toEntity(ChallengeType challengeType, Member member, String imageUrl){
        int baseReward = (challengeType.getChallengeLimit().getRewardPoint() * goal);
        int bonusReward = (int)(baseReward / 0.1);

        return Challenge.builder()
                .title(title)
                .type(type)
                .endDate(endDate)
                .goal(goal)
                .participantsCnt(0)
                .rewardPoint(baseReward + bonusReward)
                .progress(0)
                .finishFlag(false)
                .challengeType(challengeType)
                .imageUrl(imageUrl)
                .member(member)
                .totalDistance(0)
                .totalTime(0)
                .totalPloggingCnt(0).build();
    }
}
