package com.ssafy.ploggingservice.dto;

import com.ssafy.ploggingservice.domain.Member;
import com.ssafy.ploggingservice.domain.Plogging;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PloggingFeedRes {

    private Long ploggingId;
    private String imageUrl;
    private LocalDateTime createdDate;

    private String memberId;
    private String nickname;
    private String profileImageUrl;

    public static PloggingFeedRes from(Plogging plogging) {
        Member member = plogging.getMember();

        return PloggingFeedRes.builder()
                .ploggingId(plogging.getId())
                .imageUrl(plogging.getImageUrl())
                .createdDate(plogging.getCreatedDate())
                .memberId(member.getId().toString())
                .nickname(member.getNickname())
                .profileImageUrl(member.getProfileImageUrl())
                .build();
    }
}
