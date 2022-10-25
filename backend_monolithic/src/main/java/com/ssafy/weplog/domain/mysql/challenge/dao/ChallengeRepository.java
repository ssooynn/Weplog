package com.ssafy.weplog.domain.mysql.challenge.dao;

import com.ssafy.weplog.domain.mysql.challenge.domain.Challenge;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ChallengeRepository extends JpaRepository<Challenge, Long> {
    @Query("select c from Challenge c where c.finishFlag=false")
    Slice<Challenge> getChallengeList(Pageable pageable);

    @Query("select c from Challenge c where c.title like %:title% and c.finishFlag=false")
    Slice<Challenge> getChallengeByTitle(String title, Pageable pageable);

    @Query("select c.challenge from MemberChallenge c where c.member.id=:id")
    Slice<Challenge> getChallengeByID(String id, Pageable pageable);

}
