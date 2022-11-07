package com.ssafy.memberservice.domain.calendar.service;

import com.ssafy.memberservice.domain.calendar.dto.CalendarReq;
import com.ssafy.memberservice.domain.calendar.dto.CalendarRes;
import com.ssafy.memberservice.domain.calendar.repository.CalendarRepository;
import com.ssafy.memberservice.domain.crew.dao.CrewRepository;
import com.ssafy.memberservice.domain.crew.domain.Crew;
import com.ssafy.memberservice.domain.member.dao.MemberRepository;
import com.ssafy.memberservice.domain.member.domain.Member;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class CalendarServiceImpl implements CalendarService
{
    private final CalendarRepository calendarRepository;
    private final MemberRepository memberRepository;
    private final CrewRepository crewRepository;
    @Override
    public CalendarRes getCalendarInfo(LocalDateTime time, Long crewId) {
//        calendarRepository.findAllByDate(time, crewId);
        return null;
    }

    @Override
    public void postCalendarInfo(UUID memberId, CalendarReq calendarReq) {
        Member member = memberRepository.findById(memberId).get();
        Crew crew = crewRepository.findById(calendarReq.getCrewId()).get();


    }
}
