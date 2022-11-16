package com.ssafy.challengeservice.messagequeue;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.challengeservice.domain.challenge.Challenge;
import com.ssafy.challengeservice.domain.memberchallenge.MemberChallenge;
import com.ssafy.challengeservice.global.common.error.exception.NotFoundException;
import com.ssafy.challengeservice.repository.ChallengeRepository;
import com.ssafy.challengeservice.repository.MemberChallengeRepository;
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
    private final MemberChallengeRepository memberChallengeRepository;

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

        String memberId = (String) map.get("memberId");
        Integer distance = (Integer) map.get("distance");
        Integer time = (Integer) map.get("time");
        List<MemberChallenge> findMemberChallenge = memberChallengeRepository.findByMemberIdWithChallengeInProgress(UUID.fromString(memberId));
        for (MemberChallenge memberChallenge : findMemberChallenge) {
            // 챌린지에 반영
            Challenge challenge = memberChallenge.getChallenge();
            challenge.updateAfterPlogging(distance, time);

            // 멤버 챌린지에도 반영
            memberChallenge.updateAfterPlogging(distance, time);
        }

        log.info("Kafka 플로깅 종료 후 챌린지 총 기록 갱신 성공");
    }
}
