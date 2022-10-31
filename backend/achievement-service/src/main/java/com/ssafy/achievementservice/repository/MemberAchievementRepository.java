package com.ssafy.achievementservice.repository;

import com.ssafy.achievementservice.domain.achievement.AchievementType;
import com.ssafy.achievementservice.domain.memberachievement.MemberAchievement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface MemberAchievementRepository extends JpaRepository<MemberAchievement, Long> {

    @Query("select ma from MemberAchievement ma join fetch ma.achievement a where ma.member.id = :memberId and a.type in :typeList")
    List<MemberAchievement> findByMemberIdAndTypesWithAchievementAtEndPlogging(UUID memberId, List<AchievementType> typeList);

    @Query("select ma from MemberAchievement ma join fetch ma.achievement a where ma.member.id in :memberIdList and a.type = :type")
    List<MemberAchievement> findByMemberIdAndTypesWithAchievementAtEndChallenge(List<UUID> memberIdList, AchievementType type);
}
