package com.ssafy.memberservice.domain.memberdetail.dto;

import com.ssafy.memberservice.domain.memberdetail.domain.MemberDetail;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MyPageDetailRes {
    private String name;
    private String nickname;
    private String profileImageUrl;
    private int ploggingCnt;
    private int challengeCnt;
    private Long time;
    private long distance;
    private int point;

    public MyPageDetailRes(MemberDetail memberDetail){
        this.name = memberDetail.getMember().getName();
        this.nickname = memberDetail.getMember().getNickname();
        this.ploggingCnt = memberDetail.getPloggingCnt();
        this.challengeCnt = memberDetail.getChallengeCnt();
        this.time = memberDetail.getTime();
        this.distance = memberDetail.getDistance();
        this.point = memberDetail.getPoint();
    }
}
