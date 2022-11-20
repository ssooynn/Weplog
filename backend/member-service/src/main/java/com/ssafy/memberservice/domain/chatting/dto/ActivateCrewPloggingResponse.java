package com.ssafy.memberservice.domain.chatting.dto;


import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ActivateCrewPloggingResponse {

    private String roomId;

    private String crewName;

    private Long crewId;

    public static ActivateCrewPloggingResponse of(String roomId, String crewName, Long crewId) {
        return ActivateCrewPloggingResponse.builder()
                .crewId(crewId)
                .roomId(roomId)
                .crewName(crewName)
                .build();
    }

}
