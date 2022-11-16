package com.ssafy.weplog.domain.mysql.memberachievement.dao;

import com.ssafy.weplog.domain.mysql.memberachievement.domain.MemberAchievement;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberAchievementRepository extends JpaRepository<MemberAchievement, Long> {
}
