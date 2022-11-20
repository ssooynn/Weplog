package com.ssafy.memberservice.domain.crew.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CrewPloggingRecordDate {

    private int month;
    private int day;

    public static CrewPloggingRecordDate from(CrewPloggingRecordDateInterface data) {
        return CrewPloggingRecordDate.builder()
                .month(data.getMonth())
                .day(data.getDay())
                .build();
    }
}
