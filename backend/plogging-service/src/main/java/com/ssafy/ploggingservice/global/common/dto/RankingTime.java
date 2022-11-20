package com.ssafy.ploggingservice.global.common.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RankingTime {

    private Long memberId;
    private String name;
    private String nickname;
    private String profileImageUrl;
    private Integer ranking;
    private Integer time;
}
