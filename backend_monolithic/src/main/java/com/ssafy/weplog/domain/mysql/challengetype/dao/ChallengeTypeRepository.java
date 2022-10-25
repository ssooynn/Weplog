package com.ssafy.weplog.domain.mysql.challengetype.dao;

import com.ssafy.weplog.domain.mysql.challengetype.domain.ChallengeType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChallengeTypeRepository extends JpaRepository<ChallengeType, Long> {
}
