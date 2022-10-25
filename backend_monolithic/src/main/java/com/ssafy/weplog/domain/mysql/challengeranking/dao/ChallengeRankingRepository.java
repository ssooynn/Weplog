package com.ssafy.weplog.domain.mysql.challengeranking.dao;

import com.ssafy.weplog.domain.mysql.challengeranking.domain.ChallengeRanking;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChallengeRankingRepository extends JpaRepository<ChallengeRanking, Long> {
}
