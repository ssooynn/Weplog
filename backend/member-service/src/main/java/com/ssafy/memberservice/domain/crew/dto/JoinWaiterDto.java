package com.ssafy.memberservice.domain.crew.dto;

import com.ssafy.memberservice.domain.joinwaiting.domain.JoinWaiting;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JoinWaiterDto {

    private Long joinWaitingId;
    private String nickname;
    private String imageUrl;
    private String comment;
    private String memberId;

    public static JoinWaiterDto from(JoinWaiting joinWaiting) {
        return JoinWaiterDto.builder()
                .joinWaitingId(joinWaiting.getId())
                .nickname(joinWaiting.getMember().getNickname())
                .imageUrl(joinWaiting.getProfileImageUrl())
                .comment(joinWaiting.getComment())
                .memberId(joinWaiting.getMember().getId().toString())
                .build();
    }
}
