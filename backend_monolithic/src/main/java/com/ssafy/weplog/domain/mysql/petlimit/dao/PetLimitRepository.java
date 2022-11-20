package com.ssafy.weplog.domain.mysql.petlimit.dao;

import com.ssafy.weplog.domain.mysql.petlimit.domain.PetLimit;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PetLimitRepository extends JpaRepository<PetLimit, Long> {
}
