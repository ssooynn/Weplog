package com.ssafy.memberservice.domain.calendar.service;

import com.ssafy.memberservice.domain.calendar.domain.Calendar;
import com.ssafy.memberservice.domain.calendar.dto.CalendarReq;
import com.ssafy.memberservice.domain.calendar.dto.CalendarRes;
import com.ssafy.memberservice.domain.calendar.repository.CalendarRepository;
import com.ssafy.memberservice.domain.crew.dto.dao.CrewRepository;
import com.ssafy.memberservice.domain.crew.domain.Crew;
import com.ssafy.memberservice.domain.member.dao.MemberRepository;
import com.ssafy.memberservice.domain.member.domain.Member;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

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
        LocalDateTime start = time.withDayOfMonth(1);
        LocalDateTime end = time.withDayOfMonth(time.getMonth().length(time.toLocalDate().isLeapYear()));
        List<CalendarRes> res = calendarRepository.findAllByDate(start, end, crewId).stream()
                .map(CalendarRes::new)
                .collect(Collectors.toList());
        return null;
    }

    @Override
    public void postCalendarInfo(UUID memberId, CalendarReq calendarReq) {
        System.out.println("Heyyyy");
        Member member = memberRepository.findById(memberId).get();
        Crew crew = crewRepository.findById(calendarReq.getCrewId()).get();
        System.out.println(member);
        System.out.println(crew);
        Calendar calendar = Calendar.builder()
                .crew(crew).member(member).location(calendarReq.getLocation()).content(calendarReq.getContent())
                .build();
        calendarRepository.save(calendar);
    }
}
