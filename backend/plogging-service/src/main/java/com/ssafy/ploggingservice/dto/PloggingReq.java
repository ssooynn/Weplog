package com.ssafy.ploggingservice.dto;

import com.ssafy.ploggingservice.domain.Member;
import com.ssafy.ploggingservice.domain.Plogging;
import com.ssafy.ploggingservice.service.PloggingService;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PloggingReq {
    private Long ploggingId;
    private int distance;
    private int time;
    private int calorie;
    private String startLoc;
    private String imageUrl;
    private String startLat;
    private String startLng;

    public Plogging toEntity(Member member){
        return Plogging.builder()
                .distance(distance)
                .time(time)
                .member(member)
                .calorie(calorie)
                .startLat(startLat)
                .startLoc(startLoc)
                .startLng(startLng)
                .imageUrl(imageUrl)
                .build();
    }
}
