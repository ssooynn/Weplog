package com.ssafy.memberservice.domain.calendar.service;

import com.ssafy.memberservice.domain.calendar.domain.Calendar;
import com.ssafy.memberservice.domain.calendar.dto.CalendarReq;
import com.ssafy.memberservice.domain.calendar.dto.CalendarRes;
import com.ssafy.memberservice.domain.calendar.repository.CalendarRepository;
import com.ssafy.memberservice.domain.crew.dao.CrewRepository;
import com.ssafy.memberservice.domain.crew.domain.Crew;
import com.ssafy.memberservice.domain.member.dao.MemberRepository;
import com.ssafy.memberservice.domain.member.domain.Member;
import com.ssafy.memberservice.domain.membercrew.dao.MemberCrewRepository;
import com.ssafy.memberservice.domain.membercrew.domain.MemberCrew;
import com.ssafy.memberservice.global.common.error.exception.DuplicateException;
import com.ssafy.memberservice.global.common.error.exception.NotExistException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import static com.ssafy.memberservice.global.common.error.exception.DuplicateException.JOIN_CREW_DUPLICATED;
import static com.ssafy.memberservice.global.common.error.exception.NotExistException.CREW_MEMBER_NOT_EXIST;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CalendarServiceImpl implements CalendarService
{
    private final CalendarRepository calendarRepository;
    private final MemberRepository memberRepository;
    private final CrewRepository crewRepository;
    private final MemberCrewRepository memberCrewRepository;

    @Override
    public List<CalendarRes> getCalendarInfo(LocalDate time, Long crewId) {
        LocalDateTime start = time.withDayOfMonth(1).atTime(0, 0, 0);
        LocalDateTime end = time.withDayOfMonth(time.getMonth().length(time.isLeapYear()))
                .atTime(23,59,59);

        System.out.println(start);
        List<CalendarRes> res = calendarRepository.findAllByDate(start, end, crewId).stream()
                .map(CalendarRes::new)
                .collect(Collectors.toList());
        return res;
    }

    @Override
    @Transactional
    public void postCalendarInfo(UUID memberId, CalendarReq calendarReq) {
        System.out.println("Heyyyy");

        // 크루 참가자인지 확인하기
        Optional<MemberCrew> memberCrewByMemberIdAndCrewId =
                memberCrewRepository.findMemberCrewByMemberIdAndCrewId(memberId, calendarReq.getCrewId());
        if (!memberCrewByMemberIdAndCrewId.isPresent()) {
            throw new NotExistException(CREW_MEMBER_NOT_EXIST);
        }
        
        Member member = memberRepository.findById(memberId).get();
        Crew crew = crewRepository.findById(calendarReq.getCrewId()).get();
        System.out.println(member);
        System.out.println(crew);
        Calendar calendar = Calendar.builder()
                .crew(crew).member(member)
                .location(calendarReq.getLocation()).content(calendarReq.getContent())
                .scheduleDate(calendarReq.getScheduleDate())
                .build();
        calendarRepository.save(calendar);
    }
}
