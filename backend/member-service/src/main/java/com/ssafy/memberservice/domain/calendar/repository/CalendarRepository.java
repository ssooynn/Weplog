package com.ssafy.memberservice.domain.calendar.repository;

import com.ssafy.memberservice.domain.calendar.domain.Calendar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface CalendarRepository extends JpaRepository<Calendar, Long> {

//    @Query("select c from Calendar c where c.crew.id=:crewId and c.scheduleDate.getMonthValue=:time.getMothValue")
//    List<Calendar> findAllByDate(LocalDateTime time, Long crewId);
}
