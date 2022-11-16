package com.ssafy.achievementservice.messagequeue;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.achievementservice.dto.common.AddRewardPointDto;
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

    public List<AddRewardPointDto> sendRewardPoint(String topic, List<AddRewardPointDto> addRewardPointDtoList) {
        Map<String, Object> kafkaData = new HashMap<>();
        kafkaData.put("updateMember", addRewardPointDtoList);

        ObjectMapper mapper = new ObjectMapper();
        String jsonInString = "";
        try {
            jsonInString = mapper.writeValueAsString(kafkaData);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        kafkaTemplate.send(topic, jsonInString);
        log.info("Kafka Producer " + topic + " 으로 보냄 Member-service로 -> {}", jsonInString);
        log.info("Kafka Producer sent reward point from the Member microservice!!:" + kafkaData);

        return addRewardPointDtoList;
    }

}
