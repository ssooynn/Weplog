package com.ssafy.ploggingservice.repository;

import com.ssafy.ploggingservice.domain.Garbage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface GarbageRepository extends JpaRepository<Garbage, Long> {
    @Query("select g from Garbage g where abs(g.lat-:lat) + abs(g.lng-:lng) <= sqrt(5)")
    List<Garbage> getTrashCansLoc(double lat, double lng);
}
