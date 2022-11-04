package com.ssafy.memberservice.domain.membercrew.dao;

import com.ssafy.memberservice.domain.membercrew.domain.MemberCrew;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;
import java.util.UUID;

public interface MemberCrewRepository extends JpaRepository<MemberCrew, Long> {

    @Query("select mc from MemberCrew mc where mc.member.id = :memberId and mc.crew.id = :crewId")
    Optional<MemberCrew> findMemberCrewByMemberIdAndCrewId(UUID memberId, Long crewId);
}
