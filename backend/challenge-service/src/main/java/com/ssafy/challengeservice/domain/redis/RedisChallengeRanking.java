package com.ssafy.challengeservice.domain.redis;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.redis.core.RedisHash;

import javax.persistence.Id;
import java.io.Serializable;

@Getter
@RedisHash(value = "challenge_ranking", timeToLive = 60 * 60* 24)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class RedisChallengeRanking implements Serializable {

    @Id
    private Long challengeId;

    private String memberId;
    private String name;
    private String nickname;
    private String profileImageUrl;
    private Double contribution;
    private Integer ranking;
}
