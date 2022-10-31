package com.ssafy.achievementservice.service;

import com.ssafy.achievementservice.repository.AchievementRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AchievementServiceImpl implements AchievementService{

    private final AchievementRepository achievementRepository;
}
