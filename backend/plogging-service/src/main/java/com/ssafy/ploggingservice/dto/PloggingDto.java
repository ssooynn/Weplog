package com.ssafy.ploggingservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PloggingDto {
    private Long ploggingId;
    private int distance;
    private int time;
    private int calorie;
    private String startLoc;
    private String certImageUrl;
    private String shareImageUrl;
    private String startLat;
    private String startLng;
}
