package com.ssafy.memberservice.domain.calendar.service;

import com.ssafy.memberservice.domain.calendar.dto.CalendarReq;
import com.ssafy.memberservice.domain.calendar.dto.CalendarRes;

import java.time.LocalDateTime;
import java.util.UUID;

public interface CalendarService {
    CalendarRes getCalendarInfo(LocalDateTime time, Long crewId);
    void postCalendarInfo(UUID memberId, CalendarReq calendarReq);
}
