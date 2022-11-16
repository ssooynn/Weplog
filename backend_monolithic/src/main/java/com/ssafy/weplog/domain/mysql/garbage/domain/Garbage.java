package com.ssafy.weplog.domain.mysql.garbage.domain;

import com.ssafy.weplog.global.common.base.BaseEntity;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
public class Garbage extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "garbage_id")
    private Long id;

    @Column(length = 100)
    private String address;

    @Column(length = 15)
    private String lat;

    @Column(length = 15)
    private String lng;
}
