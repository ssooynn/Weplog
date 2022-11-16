package com.ssafy.memberservice.domain.chatting.domain;

import com.ssafy.memberservice.domain.member.domain.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Participant implements Serializable {

    private String id;

    private String nickname;
    private String color;
    private String profileImageUrl;

    public static Participant from(Member member) {
        return Participant.builder()
                .id(member.getId().toString())
                .nickname(member.getNickname())
                .profileImageUrl(member.getProfileImageUrl())
                .build();
    }

}
