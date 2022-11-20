package com.ssafy.weplog.domain.mysql.plogging.dao;

import com.ssafy.weplog.domain.mysql.plogging.domain.Plogging;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PloggingRepository extends JpaRepository<Plogging, Long> {
}
