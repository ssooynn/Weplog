package com.ssafy.memberservice.domain.chatting.dao;

import com.ssafy.memberservice.domain.chatting.domain.PloggingChatRoom;
import org.springframework.data.repository.CrudRepository;

public interface PloggingChatRepository extends CrudRepository<PloggingChatRoom, String> {
}
