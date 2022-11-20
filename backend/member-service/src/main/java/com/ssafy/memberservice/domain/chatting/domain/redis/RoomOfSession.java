package com.ssafy.memberservice.domain.chatting.domain.redis;

import com.ssafy.memberservice.domain.chatting.domain.enums.RoomType;
import lombok.Builder;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Getter
@Slf4j
@RedisHash("room_of_session")
@Builder
public class RoomOfSession {
    @Id
    private final String sessionId;

    private final String roomId;

    private final String memberId;

    @Enumerated(EnumType.STRING)
    private final RoomType roomType;
}
