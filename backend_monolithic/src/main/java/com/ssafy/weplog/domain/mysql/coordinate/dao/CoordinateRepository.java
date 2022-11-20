package com.ssafy.weplog.domain.mysql.coordinate.dao;

import com.ssafy.weplog.domain.mysql.coordinate.domain.Coordinate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;

import java.util.List;

public interface CoordinateRepository extends JpaRepository<Coordinate, Long> {

    @Procedure
    List<Coordinate> getSquarePoint(Double lon, Double lat, int radius);
}
