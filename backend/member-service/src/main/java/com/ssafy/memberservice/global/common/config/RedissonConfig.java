//package com.ssafy.memberservice.global.common.config;
//
//import lombok.RequiredArgsConstructor;
//import org.redisson.Redisson;
//import org.redisson.api.RedissonClient;
//import org.redisson.client.codec.Codec;
//import org.redisson.client.codec.StringCodec;
//import org.redisson.codec.SerializationCodec;
//import org.redisson.config.Config;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.boot.autoconfigure.data.redis.RedisProperties;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//import java.io.IOException;
//
//@Configuration
//@RequiredArgsConstructor
//public class RedissonConfig {
//
//    @Value("${spring.redis.host}")
//    String REDIS_HOST;
//
//    @Value("${spring.redis.port}")
//    String REDIS_PORT;
//
//    @Value("${spring.redis.password}")
//    String REDIS_PASSWORD;
//
//    @Bean(name = "redissonClient")
//    public RedissonClient redissonClientSingle() throws IOException {
//        RedissonClient redisson = null;
//        Config config = new Config();
//        final Codec codec = new SerializationCodec(); // redis-cli에서 보기 위해
//        config.setCodec(codec);
//        config.useSingleServer()
//                .setAddress("redis://" + REDIS_HOST + ":" + REDIS_PORT)
//                .setPassword(REDIS_PASSWORD);
//        redisson = Redisson.create(config);
//        return redisson;
//    }
//}