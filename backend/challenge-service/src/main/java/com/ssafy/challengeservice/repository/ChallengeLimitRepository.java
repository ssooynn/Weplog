package com.ssafy.challengeservice.repository;

import com.ssafy.challengeservice.domain.ChallengeLimit;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChallengeLimitRepository extends JpaRepository<ChallengeLimit, Long> {
}
