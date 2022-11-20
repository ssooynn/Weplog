package com.ssafy.weplog.domain.mysql.achievement.dao;

import com.ssafy.weplog.domain.mysql.achievement.domain.Achievement;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AchievementRepository extends JpaRepository<Achievement, Long> {
}
