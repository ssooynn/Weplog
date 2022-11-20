package com.ssafy.weplog.domain.mysql.member.dto;

import lombok.Data;

@Data
public class MemberDto {
    private String memberId;
    private String name;
    private String email;
    private String nickname;
    private int weight;
    private int point;
    private long  distance;
    private long time;
    private int challengeCnt;
    private String profileImageUrl;
    private String role;
}
