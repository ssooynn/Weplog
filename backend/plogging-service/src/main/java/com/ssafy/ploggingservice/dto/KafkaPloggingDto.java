package com.ssafy.ploggingservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class KafkaPloggingDto {

    private String memberId;
    private int distance;
    private int time;
    private Long crewId;

    public static KafkaPloggingDto create(String memberId, PloggingReq ploggingReq) {
        KafkaPloggingDto kafkaPloggingDto = new KafkaPloggingDto();
        kafkaPloggingDto.memberId = memberId;
        kafkaPloggingDto.distance = ploggingReq.getDistance();
        kafkaPloggingDto.time = ploggingReq.getTime();
        kafkaPloggingDto.crewId = ploggingReq.getCrewId();

        return kafkaPloggingDto;
    }
}
