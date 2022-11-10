package com.ssafy.memberservice.domain.chatting.pubsub;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.memberservice.domain.chatting.dto.chat.ChatMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class CrewChatSubscriber {

    private final ObjectMapper objectMapper;
    private final SimpMessagingTemplate messagingTemplate;

    /**
     * Redis에서 메시지가 발행(publish)되면 대기하고 있던 Redis Subscriber가 해당 메시지를 받아 처리한다.
     */
    public void sendMessage(String publishMessage) {
        try {

            // ChatMessage 객채로 맵핑
            ChatMessage chatMessage = objectMapper.readValue(publishMessage, ChatMessage.class);
            log.info("sendMessage -> {}", chatMessage.getMessage());

            // 채팅방을 구독한 클라이언트에게 메시지 발송
            messagingTemplate.convertAndSend("/sub/chat/crew/" + chatMessage.getRoomId(), chatMessage);
        } catch (Exception e) {
            log.error("Exception {}", e);
        }
    }
}
