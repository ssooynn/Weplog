package com.ssafy.memberservice.domain.joinwaiting.dao;

import com.ssafy.memberservice.domain.joinwaiting.domain.JoinWaiting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface JoinWaitingRepository extends JpaRepository<JoinWaiting, Long> {

    @Query("select jw from JoinWaiting jw join fetch jw.member join fetch jw.crew where jw.id = :joinWaitingId")
    Optional<JoinWaiting> findByIdWithMemberAndCrew(Long joinWaitingId);

    @Query("select distinct jw from JoinWaiting jw join fetch jw.member join fetch jw.crew c join c.memberCrewList where jw.crew.id = :crewId")
    List<JoinWaiting> findByCrewIdWithMember(Long crewId);
}
