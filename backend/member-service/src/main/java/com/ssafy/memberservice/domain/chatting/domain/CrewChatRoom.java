package com.ssafy.memberservice.domain.chatting.domain;

import com.ssafy.memberservice.domain.member.domain.Member;
import com.ssafy.memberservice.domain.membercrew.domain.MemberCrew;
import com.ssafy.memberservice.global.common.base.BaseEntity;
import lombok.Getter;
import org.springframework.data.redis.core.RedisHash;

import org.springframework.data.annotation.Id;

import java.io.Serializable;
import java.util.LinkedHashMap;
import java.util.Map;

@Getter
@RedisHash(value = "crew_chat_room")
public class CrewChatRoom implements Serializable {

    @Id
    private Long roomId;

    private Map<String, Participant> playerMap;

    private String chatId;

    public static CrewChatRoom create(Long crewId, MemberCrew memberCrew) {
        CrewChatRoom crewChatRoom = new CrewChatRoom();
        crewChatRoom.roomId = crewId;
        crewChatRoom.playerMap = new LinkedHashMap<>();
        return crewChatRoom;
    }

}
