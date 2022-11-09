package com.ssafy.memberservice.domain.chatting.dao.redis;

import com.ssafy.memberservice.domain.chatting.domain.redis.RoomOfSession;
import org.springframework.data.repository.CrudRepository;

public interface RoomOfSessionRepository extends CrudRepository<RoomOfSession, String> {
}
