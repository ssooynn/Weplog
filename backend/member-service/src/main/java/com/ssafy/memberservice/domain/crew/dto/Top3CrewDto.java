package com.ssafy.memberservice.domain.crew.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Top3CrewDto {

    private Long crewId;
    private String name;
    private String imageUrl;
    private Long totalAmount;

    public static Top3CrewDto from(Top3CrewDtoInterface top3Interface) {
        return Top3CrewDto.builder()
                .crewId(top3Interface.getCrewId())
                .name(top3Interface.getName())
                .imageUrl(top3Interface.getImageUrl())
                .totalAmount(top3Interface.getTotalAmount())
                .build();
    }
}
