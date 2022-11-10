package com.ssafy.memberservice.domain.calendar.dto;

import com.ssafy.memberservice.domain.calendar.domain.Calendar;
import com.ssafy.memberservice.domain.crew.domain.Crew;
import com.ssafy.memberservice.domain.member.domain.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CalendarRes {
    Long id;
    String nickname;
    String imageUrl;
    Long crewId;
    LocalDateTime scheduleDate;
    String content;
    String location;

    public CalendarRes(Calendar calendar){
        this.id = calendar.getId();
        this.nickname = calendar.getMember().getNickname();
        this.imageUrl = calendar.getMember().getProfileImageUrl();
        this.crewId = calendar.getCrew().getId();
        this.scheduleDate = calendar.getScheduleDate();
        this.content = calendar.getContent();
        this.location = calendar.getLocation();
    }
}
