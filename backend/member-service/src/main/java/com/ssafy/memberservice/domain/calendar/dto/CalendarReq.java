package com.ssafy.memberservice.domain.calendar.dto;

import com.ssafy.memberservice.domain.calendar.domain.Calendar;
import com.ssafy.memberservice.domain.crew.domain.Crew;
import com.ssafy.memberservice.domain.member.domain.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;


@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class CalendarReq {
    Long crewId;
    LocalDateTime scheduleDate;
    String content;
    String location;

    public Calendar toEntity(Member member, Crew crew){
        return Calendar.builder()
                .crew(crew)
                .content(content)
                .member(member)
                .location(location)
                .scheduleDate(scheduleDate)
                .build();
    }
}
