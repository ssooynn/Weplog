package com.ssafy.memberservice.domain.calendar.controller;
import com.ssafy.memberservice.domain.calendar.dto.CalendarReq;
import com.ssafy.memberservice.domain.calendar.dto.CalendarRes;
import com.ssafy.memberservice.domain.calendar.service.CalendarService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.time.LocalDateTime;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("calendar")
public class CalendarController {

    private static CalendarService calendarService;
    @ApiOperation("캘린더 등록")
    @GetMapping("{crewId}/{date}")
    ResponseEntity<?> getCalendarInfo(@PathVariable("crewId")Long crewId, @PathVariable("date")LocalDateTime time){
        CalendarRes calendarRes = calendarService.getCalendarInfo(time, crewId);
        return new ResponseEntity<>(calendarRes, HttpStatus.OK);
    }

    @PostMapping()
    ResponseEntity<?> postCalendarInfo(@ApiIgnore @RequestHeader("memberId") UUID memberId, @RequestBody CalendarReq calendarReq){
       calendarService.postCalendarInfo(memberId, calendarReq);
        return ResponseEntity.ok("Calendar Posted");
    }
}
