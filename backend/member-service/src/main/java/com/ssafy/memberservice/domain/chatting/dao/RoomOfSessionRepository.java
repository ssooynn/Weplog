package com.ssafy.memberservice.domain.chatting.dao;

import com.ssafy.memberservice.domain.chatting.domain.RoomOfSession;
import org.springframework.data.repository.CrudRepository;

public interface RoomOfSessionRepository extends CrudRepository<RoomOfSession, String> {
}
