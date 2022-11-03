package com.ssafy.memberservice.domain.memberdetail.dto;

import com.ssafy.memberservice.domain.member.domain.Member;
import lombok.Builder;
import lombok.Data;
import net.bytebuddy.utility.nullability.NeverNull;

@Data
@Builder
public class MyPageRes {
    private String name;
    private String nickname;
    private int weight;
    private String profileImageUrl;

    public MyPageRes(Member member){
        this.name = member.getName();
        this.nickname = member.getNickname();
        this.weight = member.getWeight();
        this.profileImageUrl = member.getProfileImageUrl();
    }

}
