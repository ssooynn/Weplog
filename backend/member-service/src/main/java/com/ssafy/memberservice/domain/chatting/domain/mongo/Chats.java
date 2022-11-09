package com.ssafy.memberservice.domain.chatting.domain.mongo;

import com.ssafy.memberservice.domain.chatting.dto.chat.ChatMessage;
import lombok.*;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;
import java.util.List;

@Document(collection = "chats")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
@Builder
public class Chats {

    @Id
    private String id;

    private List<ChatMessage> chatMessages;

    @Indexed
    private Long crewId;
}