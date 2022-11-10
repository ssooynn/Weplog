package com.ssafy.memberservice.domain.chatting.service;

import com.ssafy.memberservice.domain.chatting.domain.Participant;
import com.ssafy.memberservice.domain.chatting.domain.enums.MessageType;
import com.ssafy.memberservice.domain.chatting.dto.chat.ChatMessage;
import com.ssafy.memberservice.domain.member.dao.MemberRepository;
import com.ssafy.memberservice.domain.member.domain.Member;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.time.LocalDateTime;
import java.util.Optional;

@SpringBootTest
class CrewChatServiceTest {

    @Autowired
    CrewChatService crewChatService;
    @Autowired
    MemberRepository memberRepository;
    @DisplayName("given object to save"
            + " when save object using MongoDB template"
            + " then object is saved")
    @Test
    public void test() throws InterruptedException {
        // given
        Optional<Member> aa = memberRepository.findByNickname("aa");
        String[] messages = {"하이", "바이", "석희", "굿바이"};

        for (String message:
             messages) {
            aa.ifPresent(member -> crewChatService.pushData("636b500a5f7c4e2ccfeb38d4", new ChatMessage(MessageType.TALK, "4", Participant.from(member), message, LocalDateTime.now())));
        }

//        Thread.sleep(3000);
//        aa.ifPresent(member -> crewChatService.pushData("636b500a5f7c4e2ccfeb38d4", new ChatMessage(MessageType.TALK, "4", Participant.from(member), "바이", LocalDateTime.now())));
//        Thread.sleep(3000);
//        aa.ifPresent(member -> crewChatService.pushData("636b500a5f7c4e2ccfeb38d4", new ChatMessage(MessageType.TALK, "4", Participant.from(member), "석희", LocalDateTime.now())));
    }
}