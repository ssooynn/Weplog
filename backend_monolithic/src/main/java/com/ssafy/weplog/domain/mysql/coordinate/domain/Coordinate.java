package com.ssafy.weplog.domain.mysql.coordinate.domain;

import com.ssafy.weplog.domain.mysql.plogging.domain.Plogging;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.geo.Point;

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
}
