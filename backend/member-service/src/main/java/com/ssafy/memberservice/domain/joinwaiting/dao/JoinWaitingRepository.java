package com.ssafy.memberservice.domain.joinwaiting.dao;

import com.ssafy.memberservice.domain.joinwaiting.domain.JoinWaiting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.LockModeType;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface JoinWaitingRepository extends JpaRepository<JoinWaiting, Long> {

//    @Query("select jw from JoinWaiting jw join fetch jw.member join fetch jw.crew where jw.id = :joinWaitingId")
//    @Lock(value = LockModeType.PESSIMISTIC_WRITE) //여기
//    Optional<JoinWaiting> findByIdWithMemberAndCrew(Long joinWaitingId);

    @Query("select jw from JoinWaiting jw join fetch jw.member join fetch jw.crew where jw.id = :joinWaitingId")
    Optional<JoinWaiting> findByIdWithMemberAndCrew(Long joinWaitingId);

    @Query("select distinct jw from JoinWaiting jw join fetch jw.member join fetch jw.crew c join c.memberCrewList where jw.crew.id = :crewId")
    List<JoinWaiting> findByCrewIdWithMember(Long crewId);

    @Query("select jw from JoinWaiting jw where jw.member.id = :memberId and jw.crew.id = :crewId")
    Optional<JoinWaiting> findByMemberIdAndCrewId(UUID memberId, Long crewId);
}
