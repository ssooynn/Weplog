package com.ssafy.memberservice.domain.chatting.domain.redis;

import com.ssafy.memberservice.domain.chatting.domain.Participant;
import com.ssafy.memberservice.domain.member.domain.Member;
import com.ssafy.memberservice.domain.membercrew.domain.MemberCrew;
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

    private Map<String, Participant> participantMap;

    private String chatId;

    private int participantCnt;

    public static CrewChatRoom create(Long crewId, MemberCrew memberCrew, String chatId) {
        CrewChatRoom crewChatRoom = new CrewChatRoom();
        crewChatRoom.roomId = crewId;
        crewChatRoom.participantMap = new LinkedHashMap<>();
        crewChatRoom.chatId = chatId;
        return crewChatRoom;
    }


    public void addParticipant(Participant participant) {
        if (this.getParticipantMap() == null) {
            this.participantMap = new LinkedHashMap<>();
        }

        this.participantCnt++;

        this.participantMap.put(participant.getId(), participant);
    }

    public void removeParticipant(Member member) {

        this.participantCnt--;
        if (this.participantMap != null) {
            this.participantMap.remove(member.getId().toString());
        }
    }
}
