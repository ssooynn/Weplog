package com.ssafy.weplog.domain.mysql.crew.domain;

import com.ssafy.weplog.domain.mysql.crew.dto.CreateCrewRequest;
import com.ssafy.weplog.domain.mysql.member.domain.Member;
import com.ssafy.weplog.global.common.base.BaseEntity;
import com.ssafy.weplog.global.config.security.auth.CustomUserDetails;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

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

    public static Crew createCrew(CreateCrewRequest request, String imageUrl, Member member) {
        Crew crew = new Crew();
        crew.name = request.getName();
        crew.description = request.getDescription();
        crew.imageUrl = imageUrl;
        crew.crewMaster = member;

        return crew;
    }
}
