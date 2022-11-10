package com.ssafy.memberservice.domain.chatting.domain.redis;

import com.ssafy.memberservice.domain.chatting.domain.Participant;
import com.ssafy.memberservice.domain.membercrew.domain.MemberCrew;
import lombok.Getter;
import lombok.Setter;
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

    public static CrewChatRoom create(Long crewId, MemberCrew memberCrew, String chatId) {
        CrewChatRoom crewChatRoom = new CrewChatRoom();
        crewChatRoom.roomId = crewId;
        crewChatRoom.playerMap = new LinkedHashMap<>();
        crewChatRoom.chatId = chatId;
        return crewChatRoom;
    }


    public void addParticipant(Participant participant) {
        if (this.getPlayerMap() == null || this.getPlayerMap().size() == 0) {
            this.playerMap= new LinkedHashMap<>();
        }

        this.playerMap.put(participant.getId(), participant);
    }
}
