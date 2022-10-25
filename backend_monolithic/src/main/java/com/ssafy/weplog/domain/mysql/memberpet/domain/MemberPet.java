package com.ssafy.weplog.domain.mysql.memberpet.domain;

import com.ssafy.weplog.domain.mysql.member.domain.Member;
import com.ssafy.weplog.domain.mysql.pet.domain.Pet;
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
public class MemberPet extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_pet_id")
    private Long id;

    private Integer currentLevel;
    private Integer currentExp;
    private Integer maxExp;

    @Column(length = 10)
    private String name;

    private String fileUrl;
    private Integer imageLevel;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pet_id")
    private Pet pet;
}
