package com.ssafy.weplog.domain.mysql.memberchallenge.dao;

import com.ssafy.weplog.domain.mysql.memberchallenge.domain.MemberChallenge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface MemberChallengeRepository extends JpaRepository<MemberChallenge, Long> {

    @Query("select count(m) from MemberChallenge m where m.challenge.id=:id")
    int getParticipantsCnt(Long id);
}
