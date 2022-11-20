package com.ssafy.achievementservice.service;

import com.ssafy.achievementservice.domain.memberachievement.MemberAchievement;
import com.ssafy.achievementservice.dto.response.MemberAchievementDto;
import com.ssafy.achievementservice.repository.AchievementRepository;
import com.ssafy.achievementservice.repository.MemberAchievementRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AchievementServiceImpl implements AchievementService{

    private final AchievementRepository achievementRepository;
    private final MemberAchievementRepository memberAchievementRepository;

    @Override
    public List<MemberAchievementDto> getMyAchivementList(String memberId) {
        List<MemberAchievement> achievementList = memberAchievementRepository.findByMemberIdWithAchievement(UUID.fromString(memberId));

        return achievementList.stream().map(memberAchievement -> MemberAchievementDto.from(memberAchievement))
                .collect(Collectors.toList());
    }
}
