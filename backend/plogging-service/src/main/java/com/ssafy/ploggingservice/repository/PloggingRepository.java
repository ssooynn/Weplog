package com.ssafy.ploggingservice.repository;

import com.ssafy.ploggingservice.domain.Plogging;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public interface PloggingRepository extends JpaRepository<Plogging, Long> {

    @Query("select p from Plogging p where p.member.id = :memberId")
    Slice<Plogging> findAllById(UUID memberId, Pageable pageable);

    @Query("select p from Plogging p where abs(p.startLat-:lat) + abs(p.startLng-:lng) <= sqrt(5) " +
            "and p.createdDate >= :time ")
    List<Plogging> getPloggingLoc(double lat, double lng, LocalDateTime time);

    // 최근 플로깅 리스트 조회
    @Query("select p from Plogging p join fetch p.member order by p.createdDate desc ")
    List<Plogging> findAllWithMemberOrderByCreatedDate();

    // 최근 크루별 플로깅 리스트 조회
    @Query("select p from Plogging p join fetch p.member where p.crew.id = :crewId order by p.createdDate desc ")
    List<Plogging> findCrewPloggingAllWithMemberOrderByCreatedDate(Long crewId);
}
