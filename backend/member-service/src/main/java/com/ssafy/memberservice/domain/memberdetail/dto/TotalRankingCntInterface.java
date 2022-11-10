package com.ssafy.memberservice.domain.memberdetail.dto;

public interface TotalRankingCntInterface {

    byte[] getMemberId();
    String getName();
    String getNickname();
    String getProfileImageUrl();
    Long getTotalCnt();
    Integer getRanking();
}
