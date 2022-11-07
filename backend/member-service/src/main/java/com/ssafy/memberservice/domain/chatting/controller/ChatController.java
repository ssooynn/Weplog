//package com.ssafy.memberservice.domain.chatting.controller;
//
//import com.ssafy.memberservice.domain.chatting.dto.ChatMessage;
//import com.ssafy.memberservice.domain.chatting.dto.PloggingChatMessage;
//import com.ssafy.memberservice.domain.chatting.service.CrewChatService;
//import com.ssafy.memberservice.domain.chatting.service.PloggingChatService;
//import com.ssafy.memberservice.global.security.util.JwtTokenProvider;
//import lombok.RequiredArgsConstructor;
//import org.springframework.messaging.handler.annotation.Header;
//import org.springframework.messaging.handler.annotation.MessageMapping;
//import org.springframework.stereotype.Controller;
//
//@RequiredArgsConstructor
//@Controller
//public class ChatController {
//
//    private final JwtTokenProvider jwtTokenProvider;
//    private final CrewChatService chatService;
//
//    private final PloggingChatService ploggingChatService;
//
//    /**
//     * websocket "/pub/chat/message"로 들어오는 메시징을 처리한다.
//     */
//    @MessageMapping("/crew/chat/message")
//    public void message(ChatMessage message, @Header("token") String token) {
//        String nickname = jwtTokenProvider.getUserNameFromJwt(token);
//        // 로그인 회원 정보로 대화명 설정
//        message.setSender(nickname);
//        // 채팅방 인원수 세팅
//        message.setUserCount(chatRoomRepository.getUserCount(message.getRoomId()));
//        // Websocket에 발행된 메시지를 redis로 발행(publish)
//        chatService.sendChatMessage(message);
//    }
//
//    @MessageMapping("/plogging/chat/message")
//    public void message(PloggingChatMessage message, @Header("token") String token) {
//        String nickname = jwtTokenProvider.getUserNameFromJwt(token);
//        // 로그인 회원 정보로 대화명 설정
//        message.setSender(nickname);
//        // 채팅방 인원수 세팅
//        message.setUserCount(chatRoomRepository.getUserCount(message.getRoomId()));
//        // Websocket에 발행된 메시지를 redis로 발행(publish)
//        ploggingChatService.sendChatMessage(message);
//    }
//}