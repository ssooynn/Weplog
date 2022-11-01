package com.ssafy.challengeservice.repository;

import com.ssafy.challengeservice.domain.challenge.Challenge;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ChallengeRepository extends JpaRepository<Challenge, Long> {
    @Query("select c from Challenge c where c.finishFlag=false")
    Slice<Challenge> getChallengeList(Pageable pageable);

    @Query("select c from Challenge c where c.title like %:title% and c.finishFlag=false")
    Slice<Challenge> getChallengeByTitle(String title, Pageable pageable);

    @Query("select c.challenge from MemberChallenge c where c.member.id=:id")
    Slice<Challenge> getChallengeByID(String id, Pageable pageable);

    @Query("select c from Challenge c join fetch c.challengeType ct join fetch ct.challengeLimit where c.id = :challengeId")
    Optional<Challenge> findByChallengeIdWithLimit(Long challengeId);

    @Query("select c from Challenge c join fetch c.member where c.id = :challengeId")
    Optional<Challenge> findByIdWithMember(Long challengeId);

    @Query("select c from Challenge c where c.endDate < current_date")
    List<Challenge> findAllMustFinishChallenge();

    @Modifying
    @Query("update Challenge c set c.finishFlag = true where c.endDate < current_date ")
    int updateFinishChallenge();
}
