package com.ssafy.weplog.global.common.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Participant {

    private Long memberId;
    private String name;
    private String nickname;
    private String profileImageUrl;
}
