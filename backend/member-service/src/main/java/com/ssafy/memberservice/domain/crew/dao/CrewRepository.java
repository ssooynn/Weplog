package com.ssafy.memberservice.domain.crew.dao;

import com.ssafy.memberservice.domain.crew.domain.Crew;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CrewRepository extends JpaRepository<Crew, Long> {

    @Query("select distinct c from Crew c join fetch c.crewMaster join c.memberCrewList where c.id = :crewId")
    Optional<Crew> findByIdWithCrewMasterAndParticipants(Long crewId);

    @Query("select distinct c from Crew c join fetch c.memberCrewList cl join fetch cl.member")
    List<Crew> findAllWithMemberCrewList();
}
