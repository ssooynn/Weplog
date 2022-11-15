package com.ssafy.memberservice.domain.chatting.controller;

import com.ssafy.memberservice.domain.chatting.dto.ActivateCrewPloggingResponse;
import com.ssafy.memberservice.domain.chatting.dto.chat.ChatMessage;
import com.ssafy.memberservice.domain.chatting.dto.chat.PloggingChatMessage;
import com.ssafy.memberservice.domain.chatting.dto.PloggingChatRoomResponse;
import com.ssafy.memberservice.domain.chatting.service.CrewChatService;
import com.ssafy.memberservice.domain.chatting.service.PloggingChatService;
import com.ssafy.memberservice.global.security.util.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.ws.rs.core.HttpHeaders;
import java.util.List;

@RequiredArgsConstructor
@Controller
@Slf4j
public class ChatController {

    private final JwtTokenProvider jwtTokenProvider;
    private final CrewChatService crewChatService;

    private final PloggingChatService ploggingChatService;


    @GetMapping("/crew/room/{crewId}")
    public ResponseEntity<PloggingChatRoomResponse> getRoomByCrewId(@RequestHeader("memberId") String memberId, @PathVariable("crewId") Long crewId) {
        return ResponseEntity.ok(ploggingChatService.getRoomByCrewId(crewId));
    }

    @PostMapping("/crew/room")
    public ResponseEntity<PloggingChatRoomResponse> createCrewRoom(@RequestHeader("memberId") String memberId,@RequestBody Long crewId) {
        log.info("memberId {} - crewId {}", memberId, crewId);
        return ResponseEntity.status(HttpStatus.CREATED).body(ploggingChatService.makeRoom(memberId, crewId));
    }

    @GetMapping("/crew/rooms")
    public ResponseEntity<List<ActivateCrewPloggingResponse>> getCrewPloggingListFromMemberId(@RequestHeader("memberId") String memberId) {
        return ResponseEntity.ok(ploggingChatService.getCrewPloggingListFromMemberId(memberId));
    }

    @GetMapping("/crew/chat/{crewId}")
    public ResponseEntity<?> getCrewChats(@PathVariable("crewId") Long crewId, @RequestHeader("memberId") String memberId) {
        return ResponseEntity.ok(crewChatService.getCrewChats(crewId));
    }

    /**
     * websocket "/pub/chat/message"로 들어오는 메시징을 처리한다.
     */
    @MessageMapping("/crew/chat/message")
    public void message(ChatMessage message, @Header(HttpHeaders.AUTHORIZATION) String token) {
        String memberId = jwtTokenProvider.getSubject(parseBearerToken(token));
        // 로그인 회원 정보로 대화명 설정


        // 채팅방 인원수 세팅
        // Websocket에 발행된 메시지를 redis로 발행(publish)
        crewChatService.sendChatMessage(message, memberId);
    }

    @MessageMapping("/plogging/chat/message")
    public void message(PloggingChatMessage message, @Header(HttpHeaders.AUTHORIZATION) String token) {

        log.info("token - {}",token);
        log.info("message - {} - {} - {}",message.getMessage(), message.getLng(), message.getLng());

        String memberId = jwtTokenProvider.getSubject(parseBearerToken(token));
        // Websocket에 발행된 메시지를 redis로 발행(publish)
        ploggingChatService.sendChatMessage(message, memberId);
    }


    private String parseBearerToken(String bearerToken) {

//        log.info("parse Bearer = {}", bearerToken);
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}