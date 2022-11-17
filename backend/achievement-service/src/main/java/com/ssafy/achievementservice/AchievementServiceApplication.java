package com.ssafy.achievementservice;

import feign.Logger;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;

import javax.annotation.PostConstruct;
import java.util.TimeZone;

@SpringBootApplication
@EnableDiscoveryClient
@EnableFeignClients
public class AchievementServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(AchievementServiceApplication.class, args);
    }

    @Bean
    public Logger.Level feignLoggerLevel() {
        return Logger.Level.FULL;
    }

    @PostConstruct
    public void started() {
        // timezone UTC 셋팅
        TimeZone.setDefault(TimeZone.getTimeZone("Asia/Seoul"));
    }

}
