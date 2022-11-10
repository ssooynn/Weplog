package com.ssafy.memberservice.domain.chatting.dto.chat;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.ssafy.memberservice.domain.chatting.domain.Participant;
import com.ssafy.memberservice.domain.chatting.domain.enums.MessageType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ChatMessage {

    protected MessageType type; // 메시지 타입
    protected String roomId; // 방번호
    protected Participant sender; // 메시지 보낸사람
    protected String message; // 메시지
    protected LocalDateTime sendTime;
}
