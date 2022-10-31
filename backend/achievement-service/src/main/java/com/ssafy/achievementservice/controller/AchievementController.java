package com.ssafy.achievementservice.controller;

import com.ssafy.achievementservice.global.config.messagequeue.KafkaConsumer;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/achievement")
public class AchievementController {

    private final KafkaConsumer kafkaConsumer;


}
