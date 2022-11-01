package com.ssafy.challengeservice.messagequeue;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.challengeservice.domain.challenge.Challenge;
import com.ssafy.challengeservice.global.common.error.exception.NotFoundException;
import com.ssafy.challengeservice.repository.ChallengeRepository;
import com.ssafy.challengeservice.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

import static com.ssafy.challengeservice.global.common.error.exception.NotFoundException.CHALLENGE_NOT_FOUND;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class KafkaConsumer {

    private final MemberRepository memberRepository;
    private final ChallengeRepository challengeRepository;


    @KafkaListener(topics = "exit-plogging")
    public void createFirstMemberAchievementList(String kafkaMessage) {
        log.info("Counsume exit-plogging Kafka Message: -> {}", kafkaMessage);

        Map<Object, Object> map = new HashMap<>();
        ObjectMapper mapper = new ObjectMapper();
        try {
            map = mapper.readValue(kafkaMessage, new TypeReference<Map<Object, Object>>() {});
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        if(map.get("challengeId") != null) {
            Long challengeId = (Long) map.get("challengeId");
            Challenge findChallenge = challengeRepository.findById(challengeId)
                    .orElseThrow(() -> new NotFoundException(CHALLENGE_NOT_FOUND));

            Integer distance =(Integer) map.get("distance");
            Integer time =(Integer) map.get("time");

            findChallenge.updateAfterPlogging(distance, time);
        }

        log.info("Kafka 플로깅 종료 후 챌린지 총 기록 갱신 성공");
    }
}
