package com.ssafy.memberservice.domain.chatting.dao;

import com.ssafy.memberservice.domain.chatting.domain.CrewChatRoom;
import org.springframework.data.repository.CrudRepository;

public interface CrewChatRepository extends CrudRepository<CrewChatRoom, Long> {
}
