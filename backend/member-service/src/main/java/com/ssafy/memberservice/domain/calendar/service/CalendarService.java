package com.ssafy.memberservice.domain.calendar.service;

import com.ssafy.memberservice.domain.calendar.dto.CalendarReq;
import com.ssafy.memberservice.domain.calendar.dto.CalendarRes;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public interface CalendarService {
    List<CalendarRes> getCalendarInfo(LocalDate time, Long crewId);
    void postCalendarInfo(UUID memberId, CalendarReq calendarReq);
}
