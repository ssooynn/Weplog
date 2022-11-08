package com.ssafy.memberservice.domain.crew.dto.dao;

import com.ssafy.memberservice.domain.crew.domain.Crew;
import com.ssafy.memberservice.domain.crew.dto.NearCrewListInterface;
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

    @Query(value = "select crewId, ST_Distance_Sphere(Point(:lon, :lat), crew_loc) distance\n" +
            "from crew\n" +
            "order by distance asc limit 10;", nativeQuery = true)
    List<NearCrewListInterface> findAllNear(Double lat, Double lon);

    @Query("select distinct c from Crew c join fetch c.memberCrewList cl join fetch cl.member where c.id in :crewIdList")
    List<Crew> findByIdListWithMemberCrewList(List<Long> crewIdList);
}
