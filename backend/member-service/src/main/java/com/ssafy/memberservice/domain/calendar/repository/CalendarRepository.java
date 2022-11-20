package com.ssafy.memberservice.domain.calendar.repository;

import com.ssafy.memberservice.domain.calendar.domain.Calendar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface CalendarRepository extends JpaRepository<Calendar, Long> {

    @Query(value= "select c from Calendar c where c.crew.id = :crewId and c.scheduleDate between :start and :end order by c.scheduleDate desc")
    List<Calendar> findAllByDate(LocalDateTime start, LocalDateTime end, Long crewId);
}
