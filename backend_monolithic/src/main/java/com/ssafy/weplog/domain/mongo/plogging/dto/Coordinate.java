package com.ssafy.weplog.domain.mongo.plogging.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Coordinate {
    String lat;
    String lng;
}
