package com.ssafy.memberservice.domain.chatting.dao.redis;

import com.ssafy.memberservice.domain.chatting.domain.redis.CrewChatRoom;
import org.springframework.data.repository.CrudRepository;

public interface CrewChatRepository extends CrudRepository<CrewChatRoom, Long> {
}
