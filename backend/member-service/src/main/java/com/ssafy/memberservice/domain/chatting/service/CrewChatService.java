package com.ssafy.memberservice.domain.chatting.service;

import com.ssafy.memberservice.domain.chatting.dao.mongo.ChatsRepository;
import com.ssafy.memberservice.domain.chatting.dao.redis.CrewChatRepository;
import com.ssafy.memberservice.domain.chatting.domain.mongo.Chats;
import com.ssafy.memberservice.domain.chatting.domain.redis.CrewChatRoom;
import com.ssafy.memberservice.domain.chatting.domain.Participant;
import com.ssafy.memberservice.domain.chatting.domain.enums.MessageType;
import com.ssafy.memberservice.domain.chatting.dto.chat.ChatMessage;
import com.ssafy.memberservice.domain.member.dao.MemberRepository;
import com.ssafy.memberservice.domain.member.domain.Member;
import com.ssafy.memberservice.domain.membercrew.dao.MemberCrewRepository;
import com.ssafy.memberservice.domain.membercrew.domain.MemberCrew;
import com.ssafy.memberservice.global.common.error.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.redisson.api.RLock;
import org.redisson.api.RedissonClient;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.TimeUnit;

import static com.ssafy.memberservice.global.common.error.exception.NotFoundException.JOINWAITING_NOT_FOUND;
import static com.ssafy.memberservice.global.common.error.exception.NotFoundException.USER_NOT_FOUND;

@Slf4j
@RequiredArgsConstructor
@Service
public class CrewChatService {

    private final ChannelTopic crewTopic;

    private final RedisTemplate redisTemplate;

    private final CrewChatRepository crewChatRepository;

    private final MemberRepository memberRepository;

    private final MemberCrewRepository memberCrewRepository;

    private final ChatsRepository chatsRepository;

    private final MongoTemplate mongoTemplate;

//    private final RedissonClient redissonClient;
//
//    private static final String KEY = "CREW_CHAT";
//    private static final int WAIT_TIME = 2;
//    private static final int LEASE_TIME = 3;


    @Transactional
    public CrewChatRoom makeRoom(String memberId, Long crewId) {
        // 멤버가 해당 크루인지 확인
        MemberCrew memberCrew = memberCrewRepository.findMemberCrewByMemberIdAndCrewId(UUID.fromString(memberId), crewId).orElseThrow(() -> new NotFoundException(JOINWAITING_NOT_FOUND));

        Chats chats = chatsRepository.save(Chats.builder()
                .chatMessages(new ArrayList<>())
                .crewId(memberCrew.getCrew().getId())
                .build());
        // 문제 없으니 방 생성
        CrewChatRoom crewChatRoom = crewChatRepository.save(CrewChatRoom.create(crewId, memberCrew, chats.getId()));


        return crewChatRoom;
    }

    /**
     * destination정보에서 roomId 추출
     */
    public String getRoomId(String destination) {
        int lastIndex = destination.lastIndexOf('/');
        if (lastIndex != -1)
            return destination.substring(lastIndex + 1);
        else
            return "";
    }

    public String getUriWithoutRoomId(String destination) {
        int lastIndex = destination.lastIndexOf('/');
        if (lastIndex != -1)
            return destination.substring(10, lastIndex);
        else
            return "";
    }

    /**
     * 채팅방에 메시지 발송
     */
    public void sendChatMessage(ChatMessage chatMessage) {
//        chatMessage.setUserCount(chatRoomRepository.getUserCount(chatMessage.getRoomId()));
        if (MessageType.ENTER.equals(chatMessage.getType())) {
            chatMessage.setMessage(chatMessage.getSender().getNickname() + "님이 방에 입장했습니다.");
            chatMessage.getSender().setNickname("[알림]");
        } else if (MessageType.QUIT.equals(chatMessage.getType())) {
            chatMessage.setMessage(chatMessage.getSender().getNickname() + "님이 방에서 나갔습니다.");
            chatMessage.getSender().setNickname("[알림]");
        } else {
            CrewChatRoom crewChatRoom = crewChatRepository.findById(Long.valueOf(chatMessage.getRoomId())).orElseThrow(() -> new NotFoundException("해당 방이 존재하지 않습니다."));
            pushData(crewChatRoom.getChatId(), chatMessage);
        }

        log.info("crewchat - {}", chatMessage.getMessage());
        redisTemplate.convertAndSend(crewTopic.getTopic(), chatMessage);

    }

    @Transactional
    public void pushData(String chatId, ChatMessage chatMessage) {
        Query query = new Query().addCriteria(Criteria.where("_id").is(new ObjectId(chatId)));
        Update update = new Update();

        update.push("chatMessages", chatMessage);  //push라는 메소드에 키 값을 넣어주고 each를 통해서 해당 배열에 순차적으로 저장하게 하였습니다.
        mongoTemplate.updateFirst(query, update, "chats");
    }

    @Transactional
    public void sendChatMessage(ChatMessage chatMessage, String memberId) {
        Member member = memberRepository.findById(UUID.fromString(memberId)).orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
        chatMessage.setSender(Participant.from(member));
        chatMessage.setSendTime(LocalDateTime.now());
        sendChatMessage(chatMessage);
    }

    synchronized public CrewChatRoom joinRoom(Long roomId, Member member) {

//        RLock lock = redissonClient.getLock(KEY + roomId);

//        try {
//            if (!lock.tryLock(WAIT_TIME, LEASE_TIME, TimeUnit.SECONDS)) {
//                log.info("lock 획득 실패 {} - {}", KEY, roomId);
//                throw new RuntimeException("Lock 획득 실패!");
//            }

            CrewChatRoom crewChatRoom = crewChatRepository.findById(roomId).orElseThrow(() -> new NotFoundException("해당 방이 존재하지 않습니다."));

            Participant participant = Participant.from(member);
            crewChatRoom.addParticipant(participant);

            return crewChatRepository.save(crewChatRoom);
//        } catch (InterruptedException e) {
//            throw new RuntimeException(e);
//        } finally {
//            lock.unlock();
//            log.info("Lock 반납");
//        }
    }

    synchronized public void quitRoom(Long roomId, Member member) {

//        RLock lock = redissonClient.getLock(KEY + roomId);

//        try {
//            if (!lock.tryLock(WAIT_TIME, LEASE_TIME, TimeUnit.SECONDS)) {
//                log.info("lock 획득 실패 {} - {}", KEY, roomId);
//                throw new RuntimeException("Lock 획득 실패!");
//            }
            CrewChatRoom crewChatRoom = crewChatRepository.findById(roomId).orElseThrow(() -> new NotFoundException("방이 없습니다."));


            crewChatRoom.removeParticipant(member);
            crewChatRepository.save(crewChatRoom);
//        } catch (InterruptedException e) {
//            throw new RuntimeException(e);
//        } finally {
//            lock.unlock();
//            log.info("Lock 반납");
//        }
    }

    public List<ChatMessage> getCrewChats(Long crewId) {
        Optional<Chats> chatsByCrewId = chatsRepository.findChatsByCrewId(crewId);

        if (chatsByCrewId.isPresent()) {
            return chatsByCrewId.get().getChatMessages();
        }
        return new ArrayList<>();
    }
}