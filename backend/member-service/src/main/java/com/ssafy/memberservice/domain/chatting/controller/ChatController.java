package com.ssafy.memberservice.domain.chatting.controller;

import com.ssafy.memberservice.domain.chatting.dto.ChatMessage;
import com.ssafy.memberservice.domain.chatting.dto.PloggingChatMessage;
import com.ssafy.memberservice.domain.chatting.dto.PloggingChatRoomResponse;
import com.ssafy.memberservice.domain.chatting.service.CrewChatService;
import com.ssafy.memberservice.domain.chatting.service.PloggingChatService;
import com.ssafy.memberservice.global.security.util.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import javax.ws.rs.core.HttpHeaders;

@RequiredArgsConstructor
@Controller
public class ChatController {

    private final JwtTokenProvider jwtTokenProvider;
    private final CrewChatService crewChatService;

    private final PloggingChatService ploggingChatService;


    @GetMapping("/crew/room/{crewId}")
    public ResponseEntity<PloggingChatRoomResponse> getRoomByCrewId(@Header("memberId") String memberId, @PathVariable("crewId") Long crewId) {
        return ResponseEntity.ok(ploggingChatService.getRoomByCrewId(crewId));
    }

    @PostMapping("/crew/room")
    public ResponseEntity<PloggingChatRoomResponse> createCrewRoom(@Header("memberId") String memberId, Long crewId) {
        return ResponseEntity.status(HttpStatus.CREATED).body(ploggingChatService.makeRoom(memberId, crewId));
    }

    /**
     * websocket "/pub/chat/message"로 들어오는 메시징을 처리한다.
     */
    @MessageMapping("/crew/chat/message")
    public void message(ChatMessage message, @Header(HttpHeaders.AUTHORIZATION) String token) {
        String memberId = jwtTokenProvider.getSubject(token);
        // 로그인 회원 정보로 대화명 설정
        message.setSender(memberId);
        // 채팅방 인원수 세팅
        // Websocket에 발행된 메시지를 redis로 발행(publish)
        crewChatService.sendChatMessage(message, memberId);
    }

    @MessageMapping("/plogging/chat/message")
    public void message(PloggingChatMessage message, @Header(HttpHeaders.AUTHORIZATION) String token) {
        String memberId = jwtTokenProvider.getSubject(token);
        // Websocket에 발행된 메시지를 redis로 발행(publish)
        ploggingChatService.sendChatMessage(message, memberId);
    }
}