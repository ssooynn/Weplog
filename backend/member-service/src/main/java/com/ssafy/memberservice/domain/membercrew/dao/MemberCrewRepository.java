package com.ssafy.memberservice.domain.membercrew.dao;

import com.ssafy.memberservice.domain.crew.dto.CrewPloggingRecordDateInterface;
import com.ssafy.memberservice.domain.crew.dto.CrewTotalRecordDtoInterface;
import com.ssafy.memberservice.domain.crew.dto.Top3CrewDtoInterface;
import com.ssafy.memberservice.domain.membercrew.domain.MemberCrew;
import com.ssafy.memberservice.domain.memberdetail.dto.TotalRankingCntInterface;
import com.ssafy.memberservice.domain.memberdetail.dto.TotalRankingDistanceInterface;
import com.ssafy.memberservice.domain.memberdetail.dto.TotalRankingTimeInterface;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface MemberCrewRepository extends JpaRepository<MemberCrew, Long> {

    @Query("select mc from MemberCrew mc where mc.member.id = :memberId and mc.crew.id = :crewId")
    Optional<MemberCrew> findMemberCrewByMemberIdAndCrewId(UUID memberId, Long crewId);

    @Query(value = "select sum(total_distance) totalDistance, sum(total_time) totalTime, max(total_cnt) totalCnt\n" +
            "from member_crew\n" +
            "where crew_id = :crewId\n" +
            "group by crew_id", nativeQuery = true)
    Optional<CrewTotalRecordDtoInterface> findTotalRecordByCrewId(Long crewId);

    @Query(value = "select month(created_date) month, day(created_date) day\n" +
            "from plogging\n" +
            "where crew_id = 1 and year(created_date) = year(now())", nativeQuery = true)
    List<CrewPloggingRecordDateInterface> findCrewPloggingDate(Long crewId);

    @Query(value = "select totalAmount, mc.crew_id crewId, c.name name, c.image_url imageUrl\n" +
            "from (select sum(total_distance) totalAmount, crew_id\n" +
            "            from member_crew\n" +
            "            group by crew_id\n" +
            "            order by totalAmount desc limit 3) mc join crew c on mc.crew_id = c.crew_id", nativeQuery = true)
    List<Top3CrewDtoInterface> findTop3DistanceCrew();

    @Query(value = "select totalAmount, mc.crew_id crewId, c.name name, c.image_url imageUrl\n" +
            "from (select sum(total_time) totalAmount, crew_id\n" +
            "            from member_crew\n" +
            "            group by crew_id\n" +
            "            order by totalAmount desc limit 3) mc join crew c on mc.crew_id = c.crew_id", nativeQuery = true)
    List<Top3CrewDtoInterface> findTop3TimeCrew();

    @Query("select mc from MemberCrew mc join fetch mc.crew join fetch mc.member where mc.member.id = :memberId")
    List<MemberCrew> findMemberCrewListByMemberId(UUID memberId);

    @Query(value = "select mc.member_id memberId, m.name name, m.nickname nickname, m.profile_image_url profileImageUrl, total_distance totalDistance, rank() over (order by total_distance desc) as ranking\n" +
            "            from member_crew mc join member m on mc.member_id = m.member_id where mc.crew_id = :crewId", nativeQuery = true)
    List<TotalRankingDistanceInterface> findCrewRankingDistance(Long crewId);

    @Query(value = "select mc.member_id memberId, m.name name, m.nickname nickname, m.profile_image_url profileImageUrl, total_time totalTime, rank() over (order by total_time desc) as ranking\n" +
            "            from member_crew mc join member m on mc.member_id = m.member_id where mc.crew_id = :crewId", nativeQuery = true)
    List<TotalRankingTimeInterface> findCrewRankingTime(Long crewId);

    @Query(value = "select mc.member_id memberId, m.name name, m.nickname nickname, m.profile_image_url profileImageUrl, total_cnt totalCnt, rank() over (order by total_cnt desc) as ranking\n" +
            "            from member_crew mc join member m on mc.member_id = m.member_id where mc.crew_id = :crewId", nativeQuery = true)
    List<TotalRankingCntInterface> findCrewRankingCnt(Long crewId);
}
