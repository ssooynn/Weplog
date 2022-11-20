package com.ssafy.weplog.domain.mysql.challengelimit.dao;

import com.ssafy.weplog.domain.mysql.challengelimit.domain.ChallengeLimit;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChallengeLimitRepository extends JpaRepository<ChallengeLimit, Long> {
}
