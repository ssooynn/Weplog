package com.ssafy.weplog.domain.mysql.garbage.dao;

import com.ssafy.weplog.domain.mysql.garbage.domain.Garbage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GarbageRepository extends JpaRepository<Garbage, Long> {
}
