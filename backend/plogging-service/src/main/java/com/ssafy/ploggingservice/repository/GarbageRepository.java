package com.ssafy.ploggingservice.repository;

import com.ssafy.ploggingservice.domain.Garbage;
import com.ssafy.ploggingservice.dto.GarbageDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface GarbageRepository extends JpaRepository<Garbage, Long> {
//    @Query("select g from Garbage g where abs(g.lat-:lat) + abs(g.lng-:lng) <= sqrt(5)")
//    List<Garbage> getTrashCansLoc(double lat, double lng);

    @Query(value = "SELECT g.lat, g.lng " +
            "FROM garbage g " +
            "WHERE " +
            "(6371*acos(cos(radians(:lat))*cos(radians(g.lat))*cos(radians(g.lng) " +
            "-radians(:lng))+sin(radians(:lat))*sin(radians(g.lat)))) <= 2"
            , nativeQuery = true)
    List<GarbageDto> getTrashCansLoc(double lat, double lng);
}
