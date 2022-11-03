package com.ssafy.ploggingservice.repository;

import com.ssafy.ploggingservice.domain.Crew;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CrewRepository extends JpaRepository<Crew, Long> {
}
