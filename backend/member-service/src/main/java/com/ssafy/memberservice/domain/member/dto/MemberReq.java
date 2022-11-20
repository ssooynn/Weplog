package com.ssafy.memberservice.domain.member.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MemberReq {
    private String name;
    private String nickname;
    private int weight;
}
