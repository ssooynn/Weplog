package com.ssafy.memberservice.global.common.config;

import com.ssafy.memberservice.domain.chatting.pubsub.service.CrewChatService;
import com.ssafy.memberservice.domain.chatting.pubsub.service.PloggingChatService;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.cache.CacheKeyPrefix;
import org.springframework.data.redis.cache.RedisCacheConfiguration;
import org.springframework.data.redis.cache.RedisCacheManager;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.data.redis.listener.adapter.MessageListenerAdapter;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializationContext;
import org.springframework.data.redis.serializer.StringRedisSerializer;

import java.time.Duration;
import java.util.HashMap;
import java.util.Map;

@Configuration
@EnableCaching
public class RedisCacheConfig {

    @Bean
    public ChannelTopic crewTopic() {
        return new ChannelTopic("crewChat");
    }

    @Bean
    public ChannelTopic ploggingTopic() {
        return new ChannelTopic("ploggingChat");
    }

    @Bean(name = "cacheManager")
    public RedisCacheManager cacheManager(RedisConnectionFactory connectionFactory,
                                          MessageListenerAdapter crewListenerAdapter,
                                          MessageListenerAdapter ploggingListenerAdapter,
                                          ChannelTopic crewTopic,
                                          ChannelTopic ploggingTopic) {

        // 기본 expireTime 180초로 설정
        RedisCacheConfiguration configuration = RedisCacheConfiguration.defaultCacheConfig(Thread.currentThread().getContextClassLoader())
                .disableCachingNullValues()
                .entryTtl(Duration.ofSeconds(180))
                .computePrefixWith(CacheKeyPrefix.simple())
                .serializeKeysWith(RedisSerializationContext.SerializationPair.fromSerializer(new StringRedisSerializer()))
                .serializeValuesWith(RedisSerializationContext.SerializationPair.fromSerializer(new Jackson2JsonRedisSerializer<>(Object.class)));
        Map<String, RedisCacheConfiguration> cacheConfigurations = new HashMap<>();

        RedisMessageListenerContainer container = new RedisMessageListenerContainer();
        container.setConnectionFactory(connectionFactory);
        container.addMessageListener(crewListenerAdapter, crewTopic);
        container.addMessageListener(ploggingListenerAdapter, ploggingTopic);

//        // personal_auction_board의 경우 300초로 설정
//        cacheConfigurations.put(CacheKey.PERSONAL_AUCTION_BOARD,RedisCacheConfiguration.defaultCacheConfig()
//                .entryTtl(Duration.ofSeconds(CacheKey.PERSONAL_AUCTION_EXPIRE_SEC)));
//        // special_auction_board의 경우 300초로 설정
//        cacheConfigurations.put(CacheKey.SPECIAL_AUCTION_BOARD,RedisCacheConfiguration.defaultCacheConfig()
//                .entryTtl(Duration.ofSeconds(CacheKey.SPECIAL_AUCTION_BOARD_EXPIRE_SEC)));

        return RedisCacheManager.RedisCacheManagerBuilder.fromConnectionFactory(connectionFactory)
                .cacheDefaults(configuration).withInitialCacheConfigurations(cacheConfigurations).build();
    }

    @Bean
    public MessageListenerAdapter crewListenerAdapter(CrewChatService crewChatService) {
        return new MessageListenerAdapter(crewChatService, "sendChatMessage");
    }

    @Bean
    public MessageListenerAdapter ploggingListenerAdapter(PloggingChatService ploggingChatService) {
        return new MessageListenerAdapter(ploggingChatService, "sendChatMessage");
    }

}
