package com.ssafy.memberservice.domain.joinwaiting.domain;


import com.ssafy.memberservice.domain.crew.domain.Crew;
import com.ssafy.memberservice.domain.member.domain.Member;
import com.ssafy.memberservice.global.common.base.BaseEntity;
import lombok.*;

import javax.persistence.*;


@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
@Builder
public class JoinWaiting extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "join_waiting_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "crew_id")
    private Crew crew;

    @Column(unique = true, length = 10)
    private String nickname;

    private String profileImageUrl;

    private String comment;

    public static JoinWaiting create(Member member, Crew crew, String comment) {
        return JoinWaiting.builder()
                .member(member)
                .crew(crew)
                .comment(comment)
                .nickname(member.getNickname())
                .profileImageUrl(member.getProfileImageUrl())
                .build();
    }
}
