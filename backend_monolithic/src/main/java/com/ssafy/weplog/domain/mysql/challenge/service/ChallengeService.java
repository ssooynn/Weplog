package com.ssafy.weplog.domain.mysql.challenge.service;

import com.ssafy.weplog.domain.mysql.challenge.dto.ChallengeDetailRes;
import com.ssafy.weplog.domain.mysql.challenge.dto.ChallengeReq;
import com.ssafy.weplog.domain.mysql.challenge.dto.ChallengeRes;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

public interface ChallengeService {

    void postChallenge(ChallengeReq challengeReq);

    void deleteChallenge(Long id);
    Slice<ChallengeRes> getChallengeList(Pageable pageable);
    Slice<ChallengeRes> getMyChallengeList(String id, Pageable pageable);
    Slice<ChallengeRes> getChallengeBySearch(String title, Pageable pageable);
    ChallengeDetailRes getChallengeDetail(Long id);

}
