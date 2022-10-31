package com.ssafy.achievementservice.repository;

import com.ssafy.achievementservice.domain.achievement.Achievement;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AchievementRepository extends JpaRepository<Achievement, Long> {
}
