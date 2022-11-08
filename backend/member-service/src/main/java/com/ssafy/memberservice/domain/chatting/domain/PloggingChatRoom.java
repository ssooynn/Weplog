package com.ssafy.memberservice.domain.chatting.domain;

import com.ssafy.memberservice.domain.member.domain.Member;
import com.ssafy.memberservice.global.common.base.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.index.Indexed;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@RedisHash(value = "plogging_chat_room", timeToLive = 60*60*24)
public class PloggingChatRoom extends BaseEntity implements Serializable {

    @Id
    private String roomId;

    private Map<String, Participant> playerMap;

    private Participant host;

    @Indexed
    private Long crewId;

    public static PloggingChatRoom create(Long crewId, Member member) {
        PloggingChatRoom chatRoom = new PloggingChatRoom();
        chatRoom.roomId = UUID.randomUUID().toString();
        chatRoom.crewId = crewId;
        chatRoom.host = Participant.from(member);
        chatRoom.playerMap = new HashMap<>();
        return chatRoom;
    }
}
