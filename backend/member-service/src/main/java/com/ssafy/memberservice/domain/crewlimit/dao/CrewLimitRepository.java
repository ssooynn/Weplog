package com.ssafy.memberservice.domain.crewlimit.dao;

import com.ssafy.memberservice.domain.crewlimit.domain.CrewLimit;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CrewLimitRepository extends JpaRepository<CrewLimit, Long> {
}
