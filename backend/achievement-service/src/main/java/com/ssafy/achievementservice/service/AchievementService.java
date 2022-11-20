package com.ssafy.achievementservice.service;

import com.ssafy.achievementservice.dto.response.MemberAchievementDto;

import java.util.List;

public interface AchievementService {
    List<MemberAchievementDto> getMyAchivementList(String memberId);
}
