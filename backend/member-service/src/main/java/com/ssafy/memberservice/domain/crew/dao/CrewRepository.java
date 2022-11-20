package com.ssafy.memberservice.domain.crew.dao;

import com.ssafy.memberservice.domain.crew.domain.Crew;
import com.ssafy.memberservice.domain.crew.dto.NearCrewListInterface;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.LockModeType;
import java.util.List;
import java.util.Optional;

public interface CrewRepository extends JpaRepository<Crew, Long> {

    @Query("select distinct c from Crew c join fetch c.crewMaster join c.memberCrewList where c.id = :crewId")
    Optional<Crew> findByIdWithCrewMasterAndParticipants(Long crewId);

    @Query("select distinct c from Crew c join fetch c.memberCrewList cl join fetch cl.member")
    List<Crew> findAllWithMemberCrewList();

    @Query(value = "select crew_id crewId, ST_Distance(ST_SRID(Point(:lon, :lat), 3857), crew_loc) distance\n" +
            "            from crew\n" +
            "            where crew_loc is not null\n" +
            "            order by distance asc limit 10", nativeQuery = true)
    List<NearCrewListInterface> findAllNear(Double lat, Double lon);

    @Query("select distinct c from Crew c join fetch c.memberCrewList cl join fetch cl.member where c.id in :crewIdList")
    List<Crew> findByIdListWithMemberCrewList(List<Long> crewIdList);

    @Query("select c from Crew c join fetch c.memberCrewList where c.id = :crewId")
    @Lock(value = LockModeType.PESSIMISTIC_WRITE) //여기
    Optional<Crew> findByCrewIdForLock(Long crewId);
}