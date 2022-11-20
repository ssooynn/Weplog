package com.ssafy.weplog.domain.mysql.achievement.domain;

import com.ssafy.weplog.global.common.base.BaseEntity;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
public class Achievement extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "achievement_id")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(length = 10)
    private AchievementType type;

    private Integer level;
    private Integer goal;
    private Integer rewardPoint;

    @Column(length = 20)
    private String name;

    private String imageUrl;

}
