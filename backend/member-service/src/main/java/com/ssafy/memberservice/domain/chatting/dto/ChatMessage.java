package com.ssafy.memberservice.domain.chatting.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.ssafy.memberservice.domain.chatting.domain.enums.MessageType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ChatMessage {

    protected MessageType type; // 메시지 타입
    protected String roomId; // 방번호
    protected String sender; // 메시지 보낸사람
    protected String message; // 메시지
    protected Long userCount; // 채팅방 인원수, 채팅방 내에서 메시지가 전달될때 인원수 갱신시 사용
}
