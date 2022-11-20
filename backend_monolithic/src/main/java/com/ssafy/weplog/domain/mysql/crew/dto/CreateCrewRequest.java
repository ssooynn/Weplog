package com.ssafy.weplog.domain.mysql.crew.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateCrewRequest {

    private String name;
    private String description;
}
