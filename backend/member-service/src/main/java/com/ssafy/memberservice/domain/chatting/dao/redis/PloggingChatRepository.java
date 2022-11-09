package com.ssafy.memberservice.domain.chatting.dao.redis;

import com.ssafy.memberservice.domain.chatting.domain.redis.PloggingChatRoom;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface PloggingChatRepository extends CrudRepository<PloggingChatRoom, String> {

    Optional<PloggingChatRoom> findByCrewId(Long crewId);
}
