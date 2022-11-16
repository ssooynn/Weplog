package com.ssafy.challengeservice.global.common.base;

public class CacheKey {

    private CacheKey() {}

    // 예시 코드
    public static final int DEFAULT_EXPIRE_SEC = 180;

    public static final int RANKING_EXPIRE_SEC = 60 * 60 * 24 * 1; // 하루

    public static final String CHALLENGE_RANKING = "challenge_ranking";
}
