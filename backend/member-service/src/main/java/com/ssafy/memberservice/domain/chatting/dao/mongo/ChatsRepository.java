package com.ssafy.memberservice.domain.chatting.dao.mongo;

import com.ssafy.memberservice.domain.chatting.domain.mongo.Chats;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface ChatsRepository extends MongoRepository<Chats, String> {
    Optional<Chats> findChatsByCrewId(Long crewId);
}
