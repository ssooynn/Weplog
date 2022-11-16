package com.ssafy.memberservice.domain.memberdetail.service;

import com.ssafy.memberservice.domain.memberdetail.dto.MyPageDetailRes;
import com.ssafy.memberservice.domain.memberdetail.dto.MyPageRes;
import com.ssafy.memberservice.domain.memberdetail.dto.TotalRankingResponse;

import java.util.UUID;


public interface MyPageService {
    MyPageDetailRes getMyPageDetail(UUID uuid);
    MyPageRes getMyPage(UUID uuid);

    TotalRankingResponse getTotalRanking();
}
