package com.ssafy.challengeservice.global.config.data;

import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.cache.CacheKeyPrefix;
import org.springframework.data.redis.cache.RedisCacheConfiguration;
import org.springframework.data.redis.cache.RedisCacheManager;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializationContext;
import org.springframework.data.redis.serializer.StringRedisSerializer;

import java.time.Duration;
import java.util.HashMap;
import java.util.Map;

import static com.ssafy.challengeservice.global.common.base.CacheKey.*;

@Configuration
@EnableCaching
public class RedisCacheConfig {

    @Bean(name = "cacheManager")
    public RedisCacheManager cacheManager(RedisConnectionFactory connectionFactory){

        // 기본 expireTime 180초로 설정
        RedisCacheConfiguration configuration = RedisCacheConfiguration.defaultCacheConfig(Thread.currentThread().getContextClassLoader())
                .disableCachingNullValues()
                .entryTtl(Duration.ofSeconds(DEFAULT_EXPIRE_SEC))
                .computePrefixWith(CacheKeyPrefix.simple())
                .serializeKeysWith(RedisSerializationContext.SerializationPair.fromSerializer(new StringRedisSerializer()))
                .serializeValuesWith(RedisSerializationContext.SerializationPair.fromSerializer(new Jackson2JsonRedisSerializer<>(Object.class)));
        Map<String,RedisCacheConfiguration> cacheConfigurations = new HashMap<>();

        // 챌린지 랭킹 - 생명시간 하루
        cacheConfigurations.put(CHALLENGE_RANKING,RedisCacheConfiguration.defaultCacheConfig()
                .entryTtl(Duration.ofSeconds(RANKING_EXPIRE_SEC)));

        return RedisCacheManager.RedisCacheManagerBuilder.fromConnectionFactory(connectionFactory)
                .cacheDefaults(configuration).withInitialCacheConfigurations(cacheConfigurations).build();
    }

}
