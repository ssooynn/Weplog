package com.ssafy.memberservice.domain.memberdetail.dto;

public interface TotalRankingTimeInterface {

    byte[] getMemberId();
    String getName();
    String getNickname();
    String getProfileImageUrl();
    Long getTotalTime();
    Integer getRanking();
}
