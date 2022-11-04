package com.ssafy.memberservice.domain.crew.domain;

import com.ssafy.memberservice.domain.crew.dto.CreateCrewRequest;
import com.ssafy.memberservice.domain.member.domain.Member;
import com.ssafy.memberservice.domain.membercrew.domain.MemberCrew;
import com.ssafy.memberservice.global.common.base.BaseEntity;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.geo.Point;

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

    private Point crewLoc;

    private String activityArea;

    @OneToMany(mappedBy = "crew")
    private List<MemberCrew> memberCrewList = new ArrayList<>();

    public static Crew createCrew(CreateCrewRequest request, String imageUrl, Member member) {
        Crew crew = new Crew();
        crew.name = request.getName();
        crew.description = request.getDescription();
        crew.imageUrl = imageUrl;
        crew.crewMaster = member;
        // TODO: crewLoc 백에서 처리할지 프론트에서 할지 정해야 함
        crew.activityArea = request.getActivityArea();
        crew.crewLoc = new Point(request.getLon(), request.getLat());
        crew.maxParticipantCnt = request.getMaxParticipantCnt();

        return crew;
    }
}
