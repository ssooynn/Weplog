package com.ssafy.memberservice.global.messagequeue;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class KafkaProducer {

    private final KafkaTemplate<String, String> kafkaTemplate;

    /* topic: member-sign-up */
    public String sendInitAchievement(String topic, String memberId) {
        log.info("멤버 첫 회원가입 후 도전과제 세팅하려고 Kafka로 메세지 전송");

        Map<String, String> kafkaData = new HashMap<>();
        kafkaData.put("memberId", memberId);

        ObjectMapper mapper = new ObjectMapper();
        String jsonInString = "";
        try {
            jsonInString = mapper.writeValueAsString(kafkaData);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        kafkaTemplate.send(topic, jsonInString);
        log.info("Kafka Producer sent member-sign-up from the Member microservice!!:" + kafkaData);

        return memberId;
    }

    /* topic: pet-max-level */
    public String sendPetMaxLevel(String topic, String memberId) {
        log.info("펫 육성완료 후 도전과제 세팅하려고 Kafka로 메세지 전송");

        Map<String, String> kafkaData = new HashMap<>();
        kafkaData.put("memberId", memberId);

        ObjectMapper mapper = new ObjectMapper();
        String jsonInString = "";
        try {
            jsonInString = mapper.writeValueAsString(kafkaData);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        kafkaTemplate.send(topic, jsonInString);
        log.info("Kafka Producer sent member-sign-up from the Member microservice!!:" + kafkaData);

        return memberId;
    }
}
