package com.ssafy.memberservice.domain.chatting.dto;

import com.ssafy.memberservice.domain.chatting.domain.Participant;
import com.ssafy.memberservice.domain.chatting.domain.redis.PloggingChatRoom;
import lombok.Builder;
import lombok.Data;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Map;

@Data
@Builder
public class PloggingChatRoomResponse {
    private String roomId;

    private Map<String, Participant> playerMap;

    private Participant host;

    private long ploggingSeconds;

    public static PloggingChatRoomResponse of(PloggingChatRoom ploggingChatRoom) {
        return PloggingChatRoomResponse.builder()
                .playerMap(ploggingChatRoom.getParticipantMap())
                .host(ploggingChatRoom.getHost())
                .roomId(ploggingChatRoom.getRoomId())
                .ploggingSeconds(Duration.between(ploggingChatRoom.getCreatedTime(),LocalDateTime.now()).getSeconds())
                .build();
    }
}
