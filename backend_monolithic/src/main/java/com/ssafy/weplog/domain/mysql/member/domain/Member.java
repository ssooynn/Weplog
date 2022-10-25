package com.ssafy.weplog.domain.mysql.member.domain;

import com.ssafy.weplog.domain.mysql.challenge.domain.Challenge;
import com.ssafy.weplog.global.common.base.BaseEntity;
import lombok.*;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
@Builder
public class Member extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private String id;

    @Column(name = "social_id")
    private String socialId;

    @Enumerated(EnumType.STRING)
    @Column(length = 10)
    private LoginPath loginPath;

    @Column(length = 10)
    private String name;

    @Column(length = 50)
    private String email;

    @Column(unique = true, length = 10)
    private String nickname;

    private Integer weight;
    private Integer point;
    private Long distance;
    private Long time;
    private Integer challengeCnt;
    private String profileImageUrl;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private MemberRole role;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "challenging_id")
    private Challenge challenge;

    private String refreshToken;

    @Enumerated(EnumType.STRING)
    private AuthProvider authProvider;
}
