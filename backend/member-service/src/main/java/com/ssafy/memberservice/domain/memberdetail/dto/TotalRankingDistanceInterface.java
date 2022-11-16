package com.ssafy.memberservice.domain.memberdetail.dto;

public interface TotalRankingDistanceInterface {
    byte[] getMemberId();
    String getName();
    String getNickname();
    String getProfileImageUrl();
    Long getTotalDistance();
    Integer getRanking();
}
