package com.ssafy.memberservice.domain.member.dto;

import lombok.Data;

@Data
public class MemberReq {
    private String name;
    private String nickname;
    private int weight;
}
