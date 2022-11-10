package com.ssafy.memberservice.domain.chatting.domain.redis;

import com.ssafy.memberservice.domain.chatting.domain.Participant;
import com.ssafy.memberservice.domain.member.domain.Member;
import lombok.*;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.index.Indexed;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@RedisHash(value = "plogging_chat_room", timeToLive = 60*60*24)
public class PloggingChatRoom implements Serializable {

    @Id
    private String roomId;

    private Map<String, Participant> participantMap;

    private Participant host;

    @Indexed
    private Long crewId;

    private int participantCnt;

    private LocalDateTime createdTime;

    public static PloggingChatRoom create(Long crewId, Member member) {
        PloggingChatRoom chatRoom = new PloggingChatRoom();
        chatRoom.roomId = UUID.randomUUID().toString();
        chatRoom.crewId = crewId;
        chatRoom.host = Participant.from(member);
        chatRoom.participantMap = new LinkedHashMap<>();
        chatRoom.createdTime = LocalDateTime.now();
        return chatRoom;
    }

    public void addParticipant(Participant participant) {
        if (this.getParticipantMap() == null) {
            this.participantMap = new LinkedHashMap<>();
        }

        this.participantCnt++;

        this.participantMap.put(participant.getId(), participant);
    }
}
