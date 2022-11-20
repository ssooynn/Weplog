package com.ssafy.challengeservice.repository;

import com.ssafy.challengeservice.domain.challengetype.ChallengeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ChallengeTypeRepository extends JpaRepository<ChallengeType, Long> {

    @Query("select ct from ChallengeType ct join fetch ct.challengeLimit where ct.name = :type")
    Optional<ChallengeType> findChallengeTypeByTypeName(String type);
}
