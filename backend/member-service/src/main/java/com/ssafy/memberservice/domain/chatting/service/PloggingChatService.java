package com.ssafy.memberservice.domain.chatting.service;

import com.ssafy.memberservice.domain.chatting.dao.PloggingChatRepository;
import com.ssafy.memberservice.domain.chatting.domain.Participant;
import com.ssafy.memberservice.domain.chatting.domain.PloggingChatRoom;
import com.ssafy.memberservice.domain.chatting.domain.enums.Color;
import com.ssafy.memberservice.domain.chatting.domain.enums.MessageType;
import com.ssafy.memberservice.domain.chatting.dto.PloggingChatMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Slf4j
@RequiredArgsConstructor
@Service
public class PloggingChatService {
    private final RedisTemplate redisTemplate;

    private final ChannelTopic ploggingTopic;

    private final PloggingChatRepository ploggingChatRepository;

    private Color getNewColor(PloggingChatRoom ploggingChatRoom) {
        Set<Color> usedColors = new HashSet<>();
        for (Participant participant : ploggingChatRoom.getPlayerMap().values()) {
            usedColors.add(Color.valueOf(participant.getColor()));
        }

        for (int i = 0; i < ploggingChatRoom.getMaxParticipantCnt(); i++) {
            Color newColor = Color.randomColor();
            if (!usedColors.contains(newColor)) {
                return newColor;
            }
        }
        return Color.RED;
    }


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
