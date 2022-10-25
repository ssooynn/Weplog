package com.ssafy.weplog.domain.mysql.pet.domain;

import com.ssafy.weplog.global.common.base.BaseEntity;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@AllArgsConstructor
public class Pet extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pet_id")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private String category;

    private Integer level;
    private String fileUrl;
    private Integer maxExp;

    @Column(length = 100)
    private String description;
}
