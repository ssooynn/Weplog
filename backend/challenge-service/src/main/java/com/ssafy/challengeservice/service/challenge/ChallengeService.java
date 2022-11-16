package com.ssafy.challengeservice.service.challenge;

import com.ssafy.challengeservice.dto.ChallengeDetailRes;
import com.ssafy.challengeservice.dto.ChallengeRankingDto;
import com.ssafy.challengeservice.dto.ChallengeReq;
import com.ssafy.challengeservice.dto.ChallengeRes;
import com.ssafy.challengeservice.dto.response.CreateChallengeRes;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

public interface ChallengeService {

    CreateChallengeRes postChallenge(ChallengeReq challengeReq, MultipartFile image, String memberId);

    void deleteChallenge(Long id, UUID memberId);
    Slice<ChallengeRes> getChallengeList(Pageable pageable);
    Slice<ChallengeRes> getMyChallengeList(UUID id, Pageable pageable);
    Slice<ChallengeRes> getChallengeBySearch(String title, Pageable pageable);
    ChallengeDetailRes getChallengeDetail(Long id, UUID memberId);

    void finishChallenge();

    List<ChallengeRankingDto> getRankChallenge(Long challengeId);
}
