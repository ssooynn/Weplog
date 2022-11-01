package com.ssafy.challengeservice.repository;

import com.ssafy.challengeservice.domain.challengeranking.ChallengeRanking;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChallengeRankingRepository extends JpaRepository<ChallengeRanking, Long> {
}
