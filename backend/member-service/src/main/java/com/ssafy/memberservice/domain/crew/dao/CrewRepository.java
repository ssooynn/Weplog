package com.ssafy.memberservice.domain.crew.dao;

import com.ssafy.memberservice.domain.crew.domain.Crew;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CrewRepository extends JpaRepository<Crew, Long> {
}
