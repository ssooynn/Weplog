package com.ssafy.memberservice.domain.chatting.domain;

import com.ssafy.memberservice.domain.member.domain.Member;
import lombok.Builder;
import lombok.Data;

import java.io.Serializable;
import java.util.UUID;

@Data
@Builder
public class Participant implements Serializable {

    private UUID id;

    private String nickname;
    private String color;
    private String profileImageUrl;

    public static Participant from(Member member) {
        return Participant.builder()
                .id(member.getId())
                .nickname(member.getNickname())
                .profileImageUrl(member.getProfileImageUrl())
                .build();
    }

}
