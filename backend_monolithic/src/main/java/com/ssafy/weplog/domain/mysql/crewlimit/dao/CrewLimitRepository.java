package com.ssafy.weplog.domain.mysql.crewlimit.dao;

import com.ssafy.weplog.domain.mysql.crewlimit.domain.CrewLimit;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CrewLimitRepository extends JpaRepository<CrewLimit, Long> {
}
