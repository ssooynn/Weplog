package com.ssafy.achievementservice.messagequeue;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.achievementservice.domain.achievement.Achievement;
import com.ssafy.achievementservice.domain.achievement.AchievementType;
import com.ssafy.achievementservice.domain.member.Member;
import com.ssafy.achievementservice.domain.memberachievement.MemberAchievement;
import com.ssafy.achievementservice.dto.common.AddRewardPointDto;
import com.ssafy.achievementservice.repository.AchievementRepository;
import com.ssafy.achievementservice.repository.MemberAchievementRepository;
import com.ssafy.achievementservice.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

import static com.ssafy.achievementservice.domain.achievement.AchievementType.*;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class KafkaConsumer {

    private final MemberRepository memberRepository;
    private final MemberAchievementRepository memberAchievementRepository;
    private final AchievementRepository achievementRepository;
    private final KafkaProducer kafkaProducer;

    @KafkaListener(topics = "member-sign-up")
    public void createFirstMemberAchievementList(String kafkaMessage) {
        log.info("Counsume member-sign-up Kafka Message: -> {}", kafkaMessage);

        Map<String, String> map = new HashMap<>();
        ObjectMapper mapper = new ObjectMapper();
        try {
            map = mapper.readValue(kafkaMessage, new TypeReference<Map<String, String>>() {});
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        String memberId = map.get("memberId");
        Member findMember = memberRepository.findById(UUID.fromString(memberId)).get();
        List<Achievement> allAchievementList = achievementRepository.findAll();

        memberAchievementRepository.saveAll(MemberAchievement.createFirstList(allAchievementList, findMember));

        log.info("Kafka 회원가입 후 도전과제 리스트 생성 성공");
    }

    @KafkaListener(topics = "exit-plogging")
    public void updateAfterPlogging(String kafkaMessage) {
        log.info("Counsume exit-plogging Kafka Message: -> {}", kafkaMessage);

        Map<Object, Object> map = new HashMap<>();
        ObjectMapper mapper = new ObjectMapper();
        try {
            map = mapper.readValue(kafkaMessage, new TypeReference<Map<Object, Object>>() {});
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        List<AchievementType> typeList = new ArrayList<>();
        typeList.add(TOTAL_DISTANCE);
        typeList.add(TOTAL_TIME);
        typeList.add(PLOGGING_CNT);
        typeList.add(GROUP_PLOGGING_CNT);

        UUID memberId = UUID.fromString((String) map.get("memberId"));
        Integer distance = (Integer) map.get("distance");
        Integer time = (Integer) map.get("time");
        Long crewId = (Long) map.get("crewId");

        List<MemberAchievement> memberAchievementList = memberAchievementRepository.findByMemberIdAndTypeListWithAchievement(memberId, typeList);
        log.info(memberAchievementList.toString());

        int addRewardPoint = 0;
        for (MemberAchievement memberAchievement : memberAchievementList) {
            AchievementType type = memberAchievement.getAchievement().getType();
            if (type.equals(TOTAL_DISTANCE)) {
                addRewardPoint += memberAchievement.updateDistance(distance);
            } else if (type.equals(TOTAL_TIME)) {
                addRewardPoint += memberAchievement.updateTime(time);
            } else if (type.equals(PLOGGING_CNT)) {
                addRewardPoint += memberAchievement.updateNumber();
            } else if (type.equals(GROUP_PLOGGING_CNT)) {
                if (crewId != null) {
                    addRewardPoint += memberAchievement.updateNumber();
                }
            }
        }

        // 달성한 도전과제가 있으면 리워드 포인트 지급
        if (addRewardPoint != 0) {
            List<AddRewardPointDto> rewardList = new ArrayList<>();
            rewardList.add(AddRewardPointDto.create(memberId, addRewardPoint));
            kafkaProducer.sendRewardPoint("update-reward-point", rewardList);
        }

        log.info("Kafka 플로깅 종료 후 도전과제 갱신 성공");
    }

    @KafkaListener(topics = "exit-challenge")
    public void updateAfterExitChallenge(String kafkaMessage) {
        log.info("Counsume exit-challenge Kafka Message: -> {}", kafkaMessage);

        Map<Object, Object> map = new HashMap<>();
        ObjectMapper mapper = new ObjectMapper();
        try {
            map = mapper.readValue(kafkaMessage, new TypeReference<Map<Object, Object>>() {});
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        List<String> memberIdList = (List<String>) map.get("memberIdList");
        List<UUID> memberIdToUUIDList = memberIdList.stream().map(s -> UUID.fromString(s)).collect(Collectors.toList());

        List<MemberAchievement> achievementList =
                memberAchievementRepository.findByMemberIdListAndTypeListWithAchievement(memberIdToUUIDList, CHALLENGE_COMPLETE_CNT);
        log.info("멤버 도전과제 리스트 출력 -> {}", achievementList);

        List<AddRewardPointDto> rewardList = new ArrayList<>();
        for (MemberAchievement memberAchievement : achievementList) {
            int addRewardPoint = memberAchievement.updateNumber();
            if (addRewardPoint != 0) {
                rewardList.add(AddRewardPointDto.create(memberAchievement.getMember().getId(), addRewardPoint));
            }
        }

        // 달성한 도전과제가 있으면 리워드 포인트 지급
        if (!rewardList.isEmpty()) {
            kafkaProducer.sendRewardPoint("update-reward-point", rewardList);
        }

        log.info("Kafka 챌린지 종료 후 도전과제 갱신 성공");
    }

    @KafkaListener(topics = "pet-max-level")
    public void updatePetRaiseCompleteCnt(String kafkaMessage) {
        log.info("Counsume pet-max-level Kafka Message: -> {}", kafkaMessage);

        Map<Object, Object> map = new HashMap<>();
        ObjectMapper mapper = new ObjectMapper();
        try {
            map = mapper.readValue(kafkaMessage, new TypeReference<Map<Object, Object>>() {});
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        UUID memberId = UUID.fromString((String) map.get("memberId"));
        List<MemberAchievement> achievementList = memberAchievementRepository.findByMemberIdAndTypeWithAchievement(memberId, PLOMON_CNT);

        int addRewardPoint = 0;
        for (MemberAchievement memberAchievement : achievementList) {
            addRewardPoint += memberAchievement.updateNumber();
        }

        // 달성한 도전과제가 있으면 리워드 포인트 지급
        if (addRewardPoint != 0) {
            List<AddRewardPointDto> rewardList = new ArrayList<>();
            rewardList.add(AddRewardPointDto.create(memberId, addRewardPoint));
            kafkaProducer.sendRewardPoint("update-reward-point", rewardList);
        }

        log.info("Kafka 펫 육성 완료 후 도전과제 갱신 성공");
    }

}
