package com.ssafy.challengeservice.repository;

import com.ssafy.challengeservice.domain.redis.RedisChallengeRanking;
import org.springframework.data.repository.CrudRepository;

public interface RedisChallengeRankingRepository extends CrudRepository<RedisChallengeRanking, Long> {
}
