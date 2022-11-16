package com.ssafy.weplog.domain.mysql.memberchallenge.service;

import java.util.UUID;

public interface MemberChallengeService {
    void postChallengeApplication(UUID memberId, Long challengeId);
}
