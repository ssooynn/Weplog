package com.ssafy.challengeservice.repository;

import com.ssafy.challengeservice.domain.challengeranking.ChallengeRanking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ChallengeRankingRepository extends JpaRepository<ChallengeRanking, Long> {

    @Query("select cr from ChallengeRanking cr join fetch cr.member where cr.id = :challengeId order by cr.ranking asc")
    List<ChallengeRanking> getChallengeRankingByChallengeIdOrderByRankingWithMember(Long challengeId);
}
