package com.ssafy.memberservice.domain.chatting.domain;

import lombok.Getter;
import org.springframework.data.redis.core.RedisHash;

@Getter
@RedisHash(value = "crew_chat_room")
public class CrewChatRoom {

}
