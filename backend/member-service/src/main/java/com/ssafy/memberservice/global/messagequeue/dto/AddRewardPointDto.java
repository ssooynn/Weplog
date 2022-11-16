package com.ssafy.memberservice.global.messagequeue.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AddRewardPointDto {

    private String memberId;
    private int rewardPoint;

    public static AddRewardPointDto create(UUID memberId, int rewardPoint) {
        return AddRewardPointDto.builder()
                .memberId(memberId.toString())
                .rewardPoint(rewardPoint)
                .build();

    }
}
