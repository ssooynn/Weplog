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
}
