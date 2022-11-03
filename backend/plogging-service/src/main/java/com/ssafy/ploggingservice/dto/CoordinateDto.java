package com.ssafy.ploggingservice.dto;

import com.ssafy.ploggingservice.domain.Garbage;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.geo.Point;

import java.awt.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CoordinateDto {
    double lat;
    double lng;

    public CoordinateDto(Garbage garbage){
        this.lat = garbage.getLat();
        this.lng = garbage.getLng();
    }

    public CoordinateDto(Point point){
        this.lng = point.getX();
        this.lat = point.getY();
    }

}
