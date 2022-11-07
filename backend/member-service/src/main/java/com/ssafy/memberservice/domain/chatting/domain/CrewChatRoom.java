package com.ssafy.memberservice.domain.chatting.domain;

import lombok.Getter;
import org.springframework.data.redis.core.RedisHash;

import org.springframework.data.annotation.Id;
import java.util.Map;

@Getter
@RedisHash(value = "crew_chat_room")
public class CrewChatRoom {

    @Id
    private String roomId;

    private Map<String,Object> playerMap;

    private String chatId;

}
