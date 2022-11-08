package com.ssafy.ploggingservice.domain;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.locationtech.jts.geom.Point;
import org.locationtech.jts.io.WKTReader;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Coordinate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // GPS 로 부터 받는 위치 정보를 저장하기 위해 WGS 84 좌표계(SRID=3857, 4326)으로 이중 lon,lat 순서로 하기 위해 3857로 컬럼을 정의
    @Column(columnDefinition = "POINT SRID 3857", nullable = false)
    private Point ploggingLoc;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "plogging_id")
    private Plogging plogging;

    public static Coordinate create(Plogging plogging, double lon, double lng) {
        Coordinate coordinate = new Coordinate();
        coordinate.plogging = plogging;
        String pointWKT = String.format("POINT(%s %s)", lon, lng);
        try {
            coordinate.ploggingLoc = ((Point) new WKTReader().read(pointWKT));
            coordinate.ploggingLoc.setSRID(3857);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return coordinate;
    }
}
