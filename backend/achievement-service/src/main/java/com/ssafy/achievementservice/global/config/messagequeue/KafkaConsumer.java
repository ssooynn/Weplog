package com.ssafy.achievementservice.global.config.messagequeue;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.achievementservice.domain.achievement.Achievement;
import com.ssafy.achievementservice.domain.achievement.AchievementType;
import com.ssafy.achievementservice.domain.member.Member;
import com.ssafy.achievementservice.domain.memberachievement.MemberAchievement;
import com.ssafy.achievementservice.repository.AchievementRepository;
import com.ssafy.achievementservice.repository.MemberAchievementRepository;
import com.ssafy.achievementservice.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.util.*;

import static com.ssafy.achievementservice.domain.achievement.AchievementType.*;

@Service
@Slf4j
@RequiredArgsConstructor
public class KafkaConsumer {

    private final MemberRepository memberRepository;
    private final MemberAchievementRepository memberAchievementRepository;
    private final AchievementRepository achievementRepository;

    @KafkaListener(topics = "member-sign-up")
    public void createFirstMemberAchievementList(String kafkaMessage) {
        log.info("Counsume member-sign-up Kafka Message: -> {}", kafkaMessage);

        Map<Object, Object> map = new HashMap<>();
        ObjectMapper mapper = new ObjectMapper();
        try {
            map = mapper.readValue(kafkaMessage, new TypeReference<Map<Object, Object>>() {});
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        Member findMember = memberRepository.findById((UUID) map.get("memberId")).get();
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
        typeList.add(DISTANCE);
        typeList.add(TIME);
        typeList.add(FLOGGING_CNT);
        typeList.add(AchievementType.GROUP_FLOGGING_CNT);

        List<MemberAchievement> memberAchievementList = memberAchievementRepository.findByMemberIdAndTypesWithAchievementAtEndPlogging((UUID) map.get("memberId"), typeList);

        Integer distance = (Integer) map.get("distance");
        Integer time = (Integer) map.get("time");
        Boolean isGroupPlogging = (Boolean) map.get("isGroupPlogging");

        for (MemberAchievement memberAchievement : memberAchievementList) {
            AchievementType type = memberAchievement.getAchievement().getType();
            if (type.equals(DISTANCE)) {
                memberAchievement.updateDistance(distance);
            } else if (type.equals(TIME)) {
                memberAchievement.updateTime(time);
            } else if (type.equals(FLOGGING_CNT)) {
                memberAchievement.updateFloggingCnt();
            } else if (type.equals(GROUP_FLOGGING_CNT)) {
                if (isGroupPlogging) {
                    memberAchievement.updateGroupFloggingCnt();
                }
            }
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
    }



}
