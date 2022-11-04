package com.ssafy.ploggingservice.dto;

import com.ssafy.ploggingservice.domain.Plogging;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import reactor.core.publisher.Flux;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PloggingRes {
    private Long ploggingId;
    private int distance;
    private int time;
    private int calorie;
    private String startLoc;
    private String imageUrl;
    private double startLat;
    private double startLng;

    public PloggingRes(Plogging plogging){
        this.ploggingId = plogging.getId();
        this.distance = plogging.getDistance();
        this.time = plogging.getTime();
        this.calorie = plogging.getCalorie();
        this.imageUrl = plogging.getImageUrl();
        this.startLat = plogging.getStartLat();
        this.startLng = plogging.getStartLng();
    }
}
