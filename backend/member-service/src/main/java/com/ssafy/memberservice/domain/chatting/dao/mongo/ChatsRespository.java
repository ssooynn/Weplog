package com.ssafy.memberservice.domain.chatting.dao.mongo;

import com.ssafy.memberservice.domain.chatting.domain.mongo.Chats;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ChatsRespository extends MongoRepository<Chats, String> {
}
