package com.ssafy.ploggingservice.domain;

import com.ssafy.ploggingservice.global.common.base.BaseEntity;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.locationtech.jts.geom.Point;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
public class Crew extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "crew_id")
    private Long id;

    @Column(length = 15)
    private String name;

    private String imageUrl;

    @Column(length = 100)
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member crewMaster;

    private int maxParticipantCnt;

    // GPS 로 부터 받는 위치 정보를 저장하기 위해 WGS 84 좌표계(SRID=3857, 4326)으로 이중 lon,lat 순서로 하기 위해 3857로 컬럼을 정의
    @Column(columnDefinition = "POINT SRID 3857", nullable = false)
//    @Type(type = "org.hibernate.spatial.JTSGeometryType")
    private Point crewLoc;

    private String activityArea;
}
