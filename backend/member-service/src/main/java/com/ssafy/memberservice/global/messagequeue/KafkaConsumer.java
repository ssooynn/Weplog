package com.ssafy.memberservice.global.messagequeue;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.memberservice.domain.membercrew.dao.MemberCrewRepository;
import com.ssafy.memberservice.domain.membercrew.domain.MemberCrew;
import com.ssafy.memberservice.domain.memberdetail.dao.MemberDetailRepository;
import com.ssafy.memberservice.domain.memberdetail.domain.MemberDetail;
import com.ssafy.memberservice.domain.memberpet.dao.MemberPetRepository;
import com.ssafy.memberservice.domain.memberpet.domain.MemberPet;
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
    private final MemberPetRepository memberPetRepository;
    private final KafkaProducer kafkaProducer;

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
            UUID memberId = UUID.fromString(addRewardPointDto.getMemberId());
            MemberDetail findMemberDetail = memberDetailRepository.findByMemberId(memberId).get();
            findMemberDetail.addRewardPoint(addRewardPointDto.getRewardPoint());

            // 키우고 있는 플로몬 경험치 주고 경험치 꽉차면 레벨업
            MemberPet findMemberPet = memberPetRepository.findGrowingPetByMemberId(memberId).get();
            boolean evolutionFlag = findMemberPet.addExp(addRewardPointDto.getRewardPoint());
            // 레벨업 했으면 카프카로 보내서 도전과제 갱신
            if (evolutionFlag) {
                kafkaProducer.sendPetMaxLevel("pet-max-level", memberId.toString());
            }
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
        
        int rewardPoint = distance * 1; // m당 1점

        // 멤버 리워드 갱신(플로몬 경험치 같이주기)
        MemberDetail memberDetail = memberDetailRepository.findByMemberId(memberId).get();
        memberDetail.addRewardPoint(rewardPoint); 

        // 키우고 있는 플로몬 경험치 주고 경험치 꽉차면 레벨업
        MemberPet findMemberPet = memberPetRepository.findGrowingPetByMemberId(memberId).get();
        boolean evolutionFlag = findMemberPet.addExp(rewardPoint);
        // 레벨업 했으면 카프카로 보내서 도전과제 갱신
        if (evolutionFlag) {
            kafkaProducer.sendPetMaxLevel("pet-max-level", memberId.toString());
        }

        // 크루 플로깅이면 크루 플로깅 기록 갱신
        if (crewId != null) {
            MemberCrew findMemberCrew = memberCrewRepository.findMemberCrewByMemberIdAndCrewId(memberId, crewId).get();
            findMemberCrew.updateRecord(distance, time);
        }

    }

}
