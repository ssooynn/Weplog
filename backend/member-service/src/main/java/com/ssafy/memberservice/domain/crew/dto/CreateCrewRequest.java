package com.ssafy.memberservice.domain.crew.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class CreateCrewRequest {

    private String name;
    private String description;
    private String activityArea;

}
