package com.ssafy.weplog.domain.mysql.memberdetail.domain;

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
public class MemberDetail extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_detail_id")
    private Long id;

    private Integer point;
    private Long distance;
    private Long time;
    private Integer challengeCnt;
    private Integer ploggingCnt;
    private String profileImageUrl;
}
