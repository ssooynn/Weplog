package com.ssafy.achievementservice.controller;

import com.ssafy.achievementservice.dto.response.MemberAchievementDto;
import com.ssafy.achievementservice.messagequeue.KafkaConsumer;
import com.ssafy.achievementservice.service.AchievementService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/achievement")
public class AchievementController {

    private final KafkaConsumer kafkaConsumer;
    private final AchievementService achievementService;

    // 나의 도전과제 리스트 조회
    @GetMapping("/my")
    public ResponseEntity<List<MemberAchievementDto>> getMyAchivementList(@RequestHeader("memberId") String memberId) {
        return ResponseEntity.ok(achievementService.getMyAchivementList(memberId));
    }
}
