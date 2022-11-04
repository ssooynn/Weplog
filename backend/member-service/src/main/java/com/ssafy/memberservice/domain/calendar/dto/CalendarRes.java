package com.ssafy.memberservice.domain.calendar.dto;

import com.ssafy.memberservice.domain.crew.domain.Crew;
import com.ssafy.memberservice.domain.member.domain.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@Builder
public class CalendarRes {
    Long id;
    String nickname;
    String imageUrl;
    Long crewId;
    LocalDateTime scheduleDate;
    String content;
    String location;
}
