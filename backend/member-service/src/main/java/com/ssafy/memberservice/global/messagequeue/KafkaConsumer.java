package com.ssafy.memberservice.global.messagequeue;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.memberservice.domain.membercrew.dao.MemberCrewRepository;
import com.ssafy.memberservice.domain.membercrew.domain.MemberCrew;
import com.ssafy.memberservice.domain.memberdetail.dao.MemberDetailRepository;
import com.ssafy.memberservice.domain.memberdetail.domain.MemberDetail;
import com.ssafy.memberservice.domain.memberpet.dao.MemberPetRepository;
import com.ssafy.memberservice.domain.memberpet.dao.domain.MemberPet;
import com.ssafy.memberservice.domain.notification.service.NotificationService;
import com.ssafy.memberservice.domain.pet.dao.PetRepository;
import com.ssafy.memberservice.domain.pet.domain.Pet;
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

    private final NotificationService notificationService;
    private final PetRepository petRepository;

    @KafkaListener(topics = "update-reward-point")
    public void updateRewardPoint(String kafkaMessage) {
        log.info("Counsume update-reward-point Kafka Message: -> {}", kafkaMessage);

        Map<String, Object> map = new HashMap<>();
        ObjectMapper mapper = new ObjectMapper();
        try {
            map = mapper.readValue(kafkaMessage, new TypeReference<Map<String, Object>>() {});
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        List<Object> objectList = (List<Object>) map.get("updateMember");
        List<AddRewardPointDto> rewardPointDtoList = new ArrayList<>();
        for (Object o : objectList) {
            LinkedHashMap<String, Object> temp = (LinkedHashMap) o;
            rewardPointDtoList.add(AddRewardPointDto.create(UUID.fromString(temp.get("memberId").toString()), Integer.parseInt(temp.get("rewardPoint").toString())));
        }

//        List<AddRewardPointDto> rewardPointDtoList = (List<AddRewardPointDto>) map.get("updateMember");

        for (AddRewardPointDto addRewardPointDto : rewardPointDtoList) {
            UUID memberId = UUID.fromString(addRewardPointDto.getMemberId());
            MemberDetail findMemberDetail = memberDetailRepository.findByMemberId(memberId).get();
            findMemberDetail.addRewardPoint(addRewardPointDto.getRewardPoint());

            // 키우고 있는 플로몬 경험치 주고 경험치 꽉차면 레벨업
            Optional<MemberPet> findMemberPet = memberPetRepository.findGrowingPetByMemberId(memberId);
            if (findMemberPet.isPresent()) {
                MemberPet memberPet = findMemberPet.get();
                boolean evolutionFlag = memberPet.addExp(addRewardPointDto.getRewardPoint());
                // 레벨업 했으면 이미지, 레벨 갱신하고 카프카로 보내서 도전과제 갱신
                if (evolutionFlag) {
                    notificationService.send(memberId, "플로몬이 나이를 먹었어요!!","message");
                    kafkaProducer.sendPetMaxLevel("pet-max-level", memberId.toString());
                    // 지금 키우는 플로몬 종류 가져오기
                    List<Pet> petInfo = petRepository.findPetByCategory(memberPet.getName());
                    // image 업데이트
                    memberPet.updateImage(petInfo);
                }
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
        Long crewId = null;
        if (map.get("crewId") != null) {
            Integer crewIdInteger = (Integer) map.get("crewId");
            crewId = crewIdInteger.longValue();
        }
        
        int rewardPoint = distance * 1; // m당 1점

        // 멤버 리워드 갱신(플로몬 경험치 같이주기)
        MemberDetail memberDetail = memberDetailRepository.findByMemberId(memberId).get();
        memberDetail.addRewardPoint(rewardPoint);
        memberDetail.updatePloggingLog(distance, time);

        // 키우고 있는 플로몬 있으면 경험치 주고 경험치 꽉차면 레벨업
        Optional<MemberPet> findMemberPet = memberPetRepository.findGrowingPetByMemberId(memberId);
        if (findMemberPet.isPresent()) {
            MemberPet memberPet = findMemberPet.get();
            boolean evolutionFlag = memberPet.addExp(rewardPoint);
            // 레벨업 했으면 카프카로 보내서 도전과제 갱신
            if (evolutionFlag) {
                kafkaProducer.sendPetMaxLevel("pet-max-level", memberId.toString());
                // 지금 키우는 플로몬 종류 가져오기
                List<Pet> petInfo = petRepository.findPetByCategory(memberPet.getName());
                // image 업데이트
                memberPet.updateImage(petInfo);
                notificationService.send(memberId, "플로몬이 나이를 먹었어요!!","message");
            }
        }

        // 크루 플로깅이면 크루 플로깅 기록 갱신
        if (crewId != null) {
            MemberCrew findMemberCrew = memberCrewRepository.findMemberCrewByMemberIdAndCrewId(memberId, crewId).get();
            findMemberCrew.updateRecord(distance, time);
        }

    }

}
