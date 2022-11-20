package com.ssafy.memberservice.domain.chatting.dto.chat;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.ssafy.memberservice.domain.chatting.domain.Participant;
import com.ssafy.memberservice.domain.chatting.domain.enums.MessageType;
import com.ssafy.memberservice.domain.chatting.domain.enums.PingType;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;


@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
@NoArgsConstructor
public class PloggingChatMessage extends ChatMessage {

    @Builder
    public PloggingChatMessage(MessageType type, String roomId, Participant sender, String message, LocalDateTime sendTime, PingType pingType, String lat, String lng) {
        super(type, roomId, sender, message, sendTime);
        this.pingType = pingType;
        this.lat = lat;
        this.lng = lng;
    }

    public PloggingChatMessage(PingType pingType, String lat, String lng) {
        this.pingType = pingType;
        this.lat = lat;
        this.lng = lng;
    }

    private PingType pingType;

    private String lat;
    private String lng;
}
