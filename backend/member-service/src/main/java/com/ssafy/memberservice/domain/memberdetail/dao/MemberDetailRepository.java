package com.ssafy.memberservice.domain.memberdetail.dao;

import com.ssafy.memberservice.domain.memberdetail.domain.MemberDetail;
import com.ssafy.memberservice.domain.memberdetail.dto.TotalRankingCntInterface;
import com.ssafy.memberservice.domain.memberdetail.dto.TotalRankingDistanceInterface;
import com.ssafy.memberservice.domain.memberdetail.dto.TotalRankingTimeInterface;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface MemberDetailRepository extends JpaRepository<MemberDetail, Long> {

    @Query("select md from MemberDetail md where md.member.id = :memberId")
    Optional<MemberDetail> findByMemberId(UUID memberId);

    @Query("select m from MemberDetail m where m.member.id = :uuid")
    MemberDetail findByUUId(UUID uuid);

    @Query(value = "select pr.member_id memberId, m.name name, m.nickname nickname, m.profile_image_url profileImageUrl, distance totalDistance, rank() over (order by distance desc) as ranking\n" +
            "            from member_detail pr join member m on pr.member_id = m.member_id", nativeQuery = true)
    List<TotalRankingDistanceInterface> findTotalRankingDistance();

    @Query(value = "select pr.member_id memberId, m.name name, m.nickname nickname, m.profile_image_url profileImageUrl, time totalTime, rank() over (order by time desc) as ranking\n" +
            "            from member_detail pr join member m on pr.member_id = m.member_id", nativeQuery = true)
    List<TotalRankingTimeInterface> findTotalRankingTime();

    @Query(value = "select pr.member_id memberId, m.name name, m.nickname nickname, m.profile_image_url profileImageUrl, plogging_cnt totalCnt, rank() over (order by plogging_cnt desc) as ranking\n" +
            "            from member_detail pr join member m on pr.member_id = m.member_id", nativeQuery = true)
    List<TotalRankingCntInterface> findTotalRankingCnt();
}
