package com.ssafy.memberservice.domain.crew.dto;

import lombok.Data;

@Data
public class CreateCrewResponse {

    private Long crewId;

    public static CreateCrewResponse from(Long crewId) {
        CreateCrewResponse createCrewResponse = new CreateCrewResponse();
        createCrewResponse.crewId = crewId;

        return createCrewResponse;
    }
}
