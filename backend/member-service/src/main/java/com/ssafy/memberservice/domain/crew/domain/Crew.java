package com.ssafy.memberservice.domain.crew.domain;

import com.ssafy.memberservice.domain.crew.dto.CreateCrewRequest;
import com.ssafy.memberservice.domain.member.domain.Member;
import com.ssafy.memberservice.domain.membercrew.domain.MemberCrew;
import com.ssafy.memberservice.global.common.base.BaseEntity;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.locationtech.jts.geom.Point;
import org.locationtech.jts.io.WKTReader;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

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

    @OneToMany(mappedBy = "crew")
    private List<MemberCrew> memberCrewList = new ArrayList<>();

    public static Crew createCrew(CreateCrewRequest request, String imageUrl, Member member, Double lon, Double lat, String address) {
        Crew crew = new Crew();
        crew.name = request.getName();
        crew.description = request.getDescription();
        crew.imageUrl = imageUrl;
        crew.crewMaster = member;
        // TODO: crewLoc 백에서 처리할지 프론트에서 할지 정해야 함
        crew.activityArea = address != null ? address : request.getActivityArea();
        String pointWKT = String.format("POINT(%s %s)", lon != null ? lon : request.getLon(), lat != null ? request.getLat() : null);
        try {
            crew.crewLoc = (Point) new WKTReader().read(pointWKT);
            crew.crewLoc.setSRID(3857);
        } catch (Exception e) {
            e.printStackTrace();
        }
        crew.maxParticipantCnt = request.getMaxParticipantCnt();

        return crew;
    }
}
