package com.ssafy.achievementservice.repository;

import com.ssafy.achievementservice.domain.achievement.AchievementType;
import com.ssafy.achievementservice.domain.memberachievement.MemberAchievement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface MemberAchievementRepository extends JpaRepository<MemberAchievement, Long> {

    @Query("select ma from MemberAchievement ma join fetch ma.achievement a where ma.member.id = :memberId and a.type in :typeList")
    List<MemberAchievement> findByMemberIdAndTypeListWithAchievement(UUID memberId, List<AchievementType> typeList);

    @Query("select ma from MemberAchievement ma join fetch ma.achievement a where ma.member.id in :memberIdList and a.type = :type")
    List<MemberAchievement> findByMemberIdListAndTypeListWithAchievement(List<UUID> memberIdList, AchievementType type);

    @Query("select ma from MemberAchievement ma join fetch ma.achievement a where ma.member.id = :memberId and a.type = :type")
    List<MemberAchievement> findByMemberIdAndTypeWithAchievement(UUID memberId, AchievementType type);

    @Query("select ma from MemberAchievement ma join fetch ma.achievement a where ma.member.id = :memberId")
    List<MemberAchievement> findByMemberIdWithAchievement(UUID memberId);
}
