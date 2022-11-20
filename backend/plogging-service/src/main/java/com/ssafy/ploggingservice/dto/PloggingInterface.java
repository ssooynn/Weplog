package com.ssafy.ploggingservice.dto;

import java.time.LocalDateTime;
import java.util.UUID;

public interface PloggingInterface {
    Long getPloggingId();
    Double getStartLat();
    Double getStartLng();
}
