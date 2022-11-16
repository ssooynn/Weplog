package com.ssafy.memberservice.domain.member.dto;

import com.ssafy.memberservice.domain.member.domain.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MemberSimpleResponse {

    public String memberId;
    public String nickname;
    public String profileImageUrl;

    public static MemberSimpleResponse from(Member member) {
        return MemberSimpleResponse.builder()
                .memberId(member.getId().toString())
                .nickname(member.getNickname())
                .profileImageUrl(member.getProfileImageUrl())
                .build();
    }
}
