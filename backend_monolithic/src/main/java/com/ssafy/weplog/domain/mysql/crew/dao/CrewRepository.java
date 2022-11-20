package com.ssafy.weplog.domain.mysql.crew.dao;

import com.ssafy.weplog.domain.mysql.crew.domain.Crew;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CrewRepository extends JpaRepository<Crew, Long> {
}
