package com.ssafy.challengeservice.service;

import com.ssafy.challengeservice.dto.ChallengeDetailRes;
import com.ssafy.challengeservice.dto.ChallengeReq;
import com.ssafy.challengeservice.dto.ChallengeRes;
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
