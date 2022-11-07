package com.ssafy.memberservice.domain.chatting.pubsub.service;

import com.ssafy.memberservice.domain.chatting.domain.enums.MessageType;
import com.ssafy.memberservice.domain.chatting.dto.PloggingChatMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class PloggingChatService {

    private final RedisTemplate redisTemplate;

    private final ChannelTopic ploggingTopic;

    public void sendChatMessage(PloggingChatMessage chatMessage) {
//        chatMessage.setUserCount(chatRoomRepository.getUserCount(chatMessage.getRoomId()));
        if (MessageType.ENTER.equals(chatMessage.getType())) {
            chatMessage.setMessage(chatMessage.getSender() + "님이 플로깅에 참여했습니다.");
            chatMessage.setSender("[알림]");
        } else if (MessageType.QUIT.equals(chatMessage.getType())) {
            chatMessage.setMessage(chatMessage.getSender() + "님이 플로깅을 종료했습니다.");
            chatMessage.setSender("[알림]");
        }
        redisTemplate.convertAndSend(ploggingTopic.getTopic(), chatMessage);
    }
}
