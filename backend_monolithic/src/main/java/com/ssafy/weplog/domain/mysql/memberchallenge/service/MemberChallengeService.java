package com.ssafy.weplog.domain.mysql.memberchallenge.service;

public interface MemberChallengeService {
    void postChallengeApplication(String memberId, Long challengeId);
}
