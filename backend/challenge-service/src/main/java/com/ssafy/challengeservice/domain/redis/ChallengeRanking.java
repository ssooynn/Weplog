package com.ssafy.challengeservice.domain.redis;

import lombok.Getter;
import org.springframework.data.redis.core.RedisHash;

import javax.persistence.Id;

@Getter
@RedisHash(value = "challenge_ranking", timeToLive = 60 * 60* 24)
public class ChallengeRanking {

}
