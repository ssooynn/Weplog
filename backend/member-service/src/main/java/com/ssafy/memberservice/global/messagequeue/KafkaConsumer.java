package com.ssafy.memberservice.global.messagequeue;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.memberservice.domain.membercrew.dao.MemberCrewRepository;
import com.ssafy.memberservice.domain.memberdetail.dao.MemberDetailRepository;
import com.ssafy.memberservice.domain.memberdetail.domain.MemberDetail;
import com.ssafy.memberservice.global.messagequeue.dto.AddRewardPointDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class KafkaConsumer {

    private final MemberDetailRepository memberDetailRepository;
    private final MemberCrewRepository memberCrewRepository;

    @KafkaListener(topics = "update-reward-point")
    public void createFirstMemberAchievementList(String kafkaMessage) {
        log.info("Counsume update-reward-point Kafka Message: -> {}", kafkaMessage);

        Map<String, Object> map = new HashMap<>();
        ObjectMapper mapper = new ObjectMapper();
        try {
            map = mapper.readValue(kafkaMessage, new TypeReference<Map<String, Object>>() {});
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        List<AddRewardPointDto> rewardPointDtoList = (List<AddRewardPointDto>) map.get("updateMember");

        for (AddRewardPointDto addRewardPointDto : rewardPointDtoList) {
            MemberDetail findMemberDetail = memberDetailRepository.findByMemberId(UUID.fromString(addRewardPointDto.getMemberId())).get();
            findMemberDetail.addRewardPoint(addRewardPointDto.getRewardPoint());
        }

        log.info("Kafka 회원 리워드 포인트 반영 성공");
    }

    @KafkaListener(topics = "exit-challenge")
    public void updateMemberDetailChallengeCnt(String kafkaMessage) {
        log.info("Counsume exit-challenge Kafka Message: -> {}", kafkaMessage);

        Map<String, Object> map = new HashMap<>();
        ObjectMapper mapper = new ObjectMapper();
        try {
            map = mapper.readValue(kafkaMessage, new TypeReference<Map<String, Object>>() {});
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        List<String> memberIdList = (List<String>)map.get("memberIdList");
        for (String memberId : memberIdList) {
            MemberDetail findMember = memberDetailRepository.findByMemberId(UUID.fromString(memberId)).get();
            findMember.addChallengeCnt();
        }

        log.info("Kafka 회원의 챌린지 참여 수 반영 성공");
    }

    @KafkaListener(topics = "exit-plogging")
    public void updatePointAndCrewPloggingAfterPlogging(String kafkaMessage) {
        log.info("Counsume exit-plogging Kafka Message: -> {}", kafkaMessage);

        Map<String, Object> map = new HashMap<>();
        ObjectMapper mapper = new ObjectMapper();
        try {
            map = mapper.readValue(kafkaMessage, new TypeReference<Map<String, Object>>() {});
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        UUID memberId = UUID.fromString((String) map.get("memberId"));
        Integer distance = (Integer) map.get("distance");
        Integer time = (Integer) map.get("time");
        Long crewId = map.get("crewId") == null ? null : (Long) map.get("crewId");

        // 멤버 리워드 갱신



        // 크루 플로깅이면 크루 플로깅 기록 갱신
        if (crewId != null) {

        }

    }

}
