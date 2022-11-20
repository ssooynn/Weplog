package com.ssafy.ploggingservice.domain;

import com.ssafy.ploggingservice.global.common.base.BaseEntity;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
public class Plogging extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "plogging_id")
    private Long id;

    private Integer distance;
    private Integer time;
    private Integer calorie;

    @Column(length = 20)
    private String startLoc;

    private String imageUrl;

    @Column(length = 15)
    private double startLat;

    @Column(length = 15)
    private double startLng;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "crew_id")
    private Crew crew;

    @OneToMany(mappedBy = "plogging")
    List<Coordinate> coordinates = new ArrayList<>();

    public void updateImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
