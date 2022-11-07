package com.ssafy.memberservice.domain.chatting.domain;

import lombok.Getter;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.annotation.Id;
import java.io.Serializable;
import java.util.Map;

@Getter
@RedisHash(value = "plogging_chat_room", timeToLive = 60*60*24)
public class PloggingChatRoom implements Serializable {

    @Id
    private String roomId;

    private Map<String,Object> playerMap;

}
