package com.ssafy.ploggingservice.repository;


import com.ssafy.ploggingservice.domain.Coordinate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;

import java.util.List;

public interface CoordinateRepository extends JpaRepository<Coordinate, Long> {

    @Procedure
    List<Coordinate> getSquarePoint(Double lon, Double lat, int radius);

    @Query("select c from Coordinate c where c.plogging.id=:id order by c.id asc")
    List<Coordinate> findAllByPloggingId(Long id);
}
