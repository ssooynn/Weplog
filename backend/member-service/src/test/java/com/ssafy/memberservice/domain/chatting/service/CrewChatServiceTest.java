package com.ssafy.memberservice.domain.chatting.service;

import com.ssafy.memberservice.domain.chatting.dao.redis.CrewChatRepository;
import com.ssafy.memberservice.domain.chatting.domain.Participant;
import com.ssafy.memberservice.domain.chatting.domain.enums.MessageType;
import com.ssafy.memberservice.domain.chatting.domain.redis.CrewChatRoom;
import com.ssafy.memberservice.domain.chatting.dto.chat.ChatMessage;
import com.ssafy.memberservice.domain.member.dao.MemberRepository;
import com.ssafy.memberservice.domain.member.domain.Member;
import com.ssafy.memberservice.global.common.error.exception.NotFoundException;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
class CrewChatServiceTest {

    @Autowired
    CrewChatService crewChatService;
    @Autowired
    MemberRepository memberRepository;

    @Autowired
    CrewChatRepository crewChatRepository;
//    @DisplayName("given object to save"
//            + " when save object using MongoDB template"
//            + " then object is saved")
//    @Test
//    public void test() throws InterruptedException {
//        // given
//        Optional<Member> aa = memberRepository.findByNickname("aa");
//        String[] messages = {"하이", "바이", "석희", "굿바이"};
//
//        for (String message:
//             messages) {
//            aa.ifPresent(member -> crewChatService.pushData("636b500a5f7c4e2ccfeb38d4", new ChatMessage(MessageType.TALK, "4", Participant.from(member), message, LocalDateTime.now())));
//        }
//
////        Thread.sleep(3000);
////        aa.ifPresent(member -> crewChatService.pushData("636b500a5f7c4e2ccfeb38d4", new ChatMessage(MessageType.TALK, "4", Participant.from(member), "바이", LocalDateTime.now())));
////        Thread.sleep(3000);
////        aa.ifPresent(member -> crewChatService.pushData("636b500a5f7c4e2ccfeb38d4", new ChatMessage(MessageType.TALK, "4", Participant.from(member), "석희", LocalDateTime.now())));
//    }

//    @Test
//    @DisplayName("방에 동시에 입장시 save 잘 되는지 확인")
//    public void 멀티쓰레드_방_입장() throws InterruptedException {
//        Member member = memberRepository.findByNickname("aa").orElseThrow(() -> new NotFoundException("없"));
//        int maxCnt = 10;
//
//        for (int i = 0; i < maxCnt; i++) {
//            new Thread(() -> {
//                CrewChatRoom crewChatRoom = crewChatService.joinRoom(20L, member);
//                System.out.println(crewChatRoom.getParticipantCnt());
//            }).start();
//        }
//
//
//        Thread.sleep(100); // 모든 스레드가 종료될 때까지 잠깐 대기
//        CrewChatRoom 방_없음 = crewChatRepository.findById(20L).orElseThrow(() -> new NotFoundException("방 없음"));
//        assertThat(방_없음.getParticipantCnt()).isEqualTo(maxCnt);
//    }


//    @Test
//    void threadNotSafe() throws Exception {
//        int maxCnt = 10;
//
//        for (int i = 0; i < maxCnt; i++) {
//            new Thread(() -> {
//                count++;
//                System.out.println(count);
//            }).start();
//        }
//
//        Thread.sleep(100); // 모든 스레드가 종료될 때까지 잠깐 대기
//        assertThat(count).isEqualTo(maxCnt);
//    }

}