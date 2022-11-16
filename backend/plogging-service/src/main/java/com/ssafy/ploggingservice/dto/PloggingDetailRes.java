package com.ssafy.ploggingservice.dto;

import com.ssafy.ploggingservice.domain.Coordinate;
import com.ssafy.ploggingservice.domain.Plogging;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PloggingDetailRes {

    private Long ploggingId;
    private int distance;
    private int time;
    private int calorie;
    private String startLoc;
    private String imageUrl;
    private double startLat;
    private double startLng;
    private List<CoordinateDto> coordinates = new ArrayList<>();

    public PloggingDetailRes(Plogging plogging, List<Coordinate> coordinates){
        this.ploggingId = plogging.getId();
        this.distance = plogging.getDistance();
        this.time = plogging.getTime();
        this.calorie = plogging.getCalorie();
        this.imageUrl = plogging.getImageUrl();
        this.startLat = plogging.getStartLat();
        this.startLng = plogging.getStartLng();
        this.coordinates = coordinates.stream().map(coordinate -> new CoordinateDto(coordinate.getPloggingLoc()))
                .collect(Collectors.toList());
    }
}
