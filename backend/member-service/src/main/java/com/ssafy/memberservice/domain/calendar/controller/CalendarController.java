package com.ssafy.memberservice.domain.calendar.controller;
import com.ssafy.memberservice.domain.calendar.dto.CalendarReq;
import com.ssafy.memberservice.domain.calendar.dto.CalendarRes;
import com.ssafy.memberservice.domain.calendar.service.CalendarService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("calendar")
public class CalendarController {

    private final CalendarService calendarService;
//    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
//    private LocalDateTime time;
    @ApiOperation(value = "캘린더 가져오기", notes = "해당 월에 해당하는 스케쥴을 리스트로 반환")
    @GetMapping("{crewId}/{date}")
    ResponseEntity<?> getCalendarInfo(@PathVariable("crewId")Long crewId, @PathVariable("date")
    @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate time){
        List<CalendarRes> calendarRes = calendarService.getCalendarInfo(time, crewId);
        return new ResponseEntity<>(calendarRes, HttpStatus.OK);
    }

    @PostMapping()
    ResponseEntity<?> postCalendarInfo(@ApiIgnore @RequestHeader("memberId") String memberId, @RequestBody CalendarReq calendarReq){
        System.out.println(calendarReq);
        System.out.println(memberId);
       calendarService.postCalendarInfo(UUID.fromString(memberId), calendarReq);
        return ResponseEntity.ok("Calendar Posted");
    }
}
