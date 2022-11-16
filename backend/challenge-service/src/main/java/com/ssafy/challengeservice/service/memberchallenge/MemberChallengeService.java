package com.ssafy.challengeservice.service.memberchallenge;

import com.ssafy.challengeservice.dto.ChallengeRes;
import com.ssafy.challengeservice.dto.response.CreateChallengeRes;

import java.util.List;
import java.util.UUID;

public interface MemberChallengeService {
    CreateChallengeRes postChallengeApplication(UUID memberId, Long challengeId);

    List<ChallengeRes> getMyChallengingList(UUID memberId);

    List<ChallengeRes> getMyEndChallengeList(UUID memberId);
}
