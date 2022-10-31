package com.ssafy.challengeservice.repository;

import com.ssafy.challengeservice.domain.ChallengeType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChallengeTypeRepository extends JpaRepository<ChallengeType, Long> {
}
