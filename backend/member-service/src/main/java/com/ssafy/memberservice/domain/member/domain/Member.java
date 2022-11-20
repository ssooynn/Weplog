package com.ssafy.memberservice.domain.member.domain;

import com.fasterxml.uuid.Generators;
import com.ssafy.memberservice.domain.member.dto.MemberReq;
import com.ssafy.memberservice.global.common.base.BaseEntity;

import lombok.*;

import javax.persistence.*;
import java.util.UUID;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
@Builder
public class Member extends BaseEntity {

    @Id
    @Column(name = "member_id" ,columnDefinition = "BINARY(16)")
    private UUID id;

    @Column(name = "social_id")
    private String socialId;

    @Enumerated(EnumType.STRING)
    @Column(name = "login_path",length = 10)
    private AuthProvider authProvider;

    @Column(length = 10)
    private String name;

    @Column(length = 50)
    private String email;

    @Column(unique = true, length = 10)
    private String nickname;

    private Integer weight;

    private String profileImageUrl;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private MemberRole role;

    private String refreshToken;

    @PrePersist
    public void createUserUniqId() {
        //sequential uuid 생성
        UUID uuid = Generators.timeBasedGenerator().generate();
        String[] uuidArr = uuid.toString().split("-");
        String uuidStr = uuidArr[2]+uuidArr[1]+uuidArr[0]+uuidArr[3]+uuidArr[4];
        StringBuffer sb = new StringBuffer(uuidStr);
        sb.insert(8, "-");
        sb.insert(13, "-");
        sb.insert(18, "-");
        sb.insert(23, "-");
        uuid = UUID.fromString(sb.toString());
        this.id = uuid;
    }

    public void updateMember(MemberReq memberReq, String profileImageUrl){
        this.name = memberReq.getName();
        this.nickname = memberReq.getNickname();
        this.weight = memberReq.getWeight();
        this.profileImageUrl = profileImageUrl;
    }
}
