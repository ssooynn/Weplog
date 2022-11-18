package com.ssafy.memberservice.domain.chatting.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.memberservice.domain.chatting.dao.redis.PloggingChatRepository;
import com.ssafy.memberservice.domain.chatting.domain.Participant;
import com.ssafy.memberservice.domain.chatting.domain.redis.CrewChatRoom;
import com.ssafy.memberservice.domain.chatting.domain.redis.PloggingChatRoom;
import com.ssafy.memberservice.domain.chatting.domain.enums.Color;
import com.ssafy.memberservice.domain.chatting.domain.enums.MessageType;
import com.ssafy.memberservice.domain.chatting.domain.enums.PingType;
import com.ssafy.memberservice.domain.chatting.dto.ActivateCrewPloggingResponse;
import com.ssafy.memberservice.domain.chatting.dto.chat.PloggingChatMessage;
import com.ssafy.memberservice.domain.chatting.dto.PloggingChatRoomResponse;
import com.ssafy.memberservice.domain.member.dao.MemberRepository;
import com.ssafy.memberservice.domain.member.domain.Member;
import com.ssafy.memberservice.domain.membercrew.dao.MemberCrewRepository;
import com.ssafy.memberservice.domain.membercrew.domain.MemberCrew;
import com.ssafy.memberservice.global.common.error.exception.DuplicateException;
import com.ssafy.memberservice.global.common.error.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.redisson.api.RLock;
import org.redisson.api.RedissonClient;
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
public class PloggingChatService {
    private final RedisTemplate redisTemplate;

    private final ChannelTopic ploggingTopic;

    private final PloggingChatRepository ploggingChatRepository;

    private final MemberCrewRepository memberCrewRepository;

    private final MemberRepository memberRepository;

//    private final RedissonClient redissonClient;
//
//    private static final String KEY = "PLOGGING_CHAT";
//    private static final int WAIT_TIME = 2;
//    private static final int LEASE_TIME = 3;


    public PloggingChatRoomResponse makeRoom(String memberId, Long crewId) {
        // 멤버가 해당 크루인지 확인
        MemberCrew memberCrew = memberCrewRepository.findMemberCrewByMemberIdAndCrewId(UUID.fromString(memberId), crewId).orElseThrow(() -> new NotFoundException(JOINWAITING_NOT_FOUND));

        Optional<PloggingChatRoom> byCrewId = ploggingChatRepository.findByCrewId(crewId);

        if (byCrewId.isPresent()) {
            throw new DuplicateException("이미 크루 방이 존재합니다.");
        }

        Member member = memberRepository.findById(UUID.fromString(memberId)).orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));

        PloggingChatRoom ploggingChatRoom = ploggingChatRepository.save(PloggingChatRoom.create(crewId, member));
        // 문제 없으니 방 생성

        return PloggingChatRoomResponse.of(ploggingChatRoom);
    }

    synchronized public PloggingChatRoom joinRoom(Member member, String roomId) {
        PloggingChatRoom ploggingChatRoom = ploggingChatRepository.findById(roomId).orElseThrow(() -> new NotFoundException("해당 방이 존재하지 않습니다."));
//        RLock lock = redissonClient.getLock(KEY + roomId);
//
//        CrewChatRoom crewChatRoom = null;
//
//        boolean isLocked = false;
//        try {
//            isLocked = lock.tryLock(WAIT_TIME, LEASE_TIME, TimeUnit.SECONDS);
//        } catch (InterruptedException e) {
//            throw new RuntimeException(e);
//        }
//        if (!isLocked) {
//            log.info("lock 획득 실패 {} - {}", KEY, roomId);
//            throw new RuntimeException("Lock 획득 실패!");
//        }
//
//        try {
            Participant participant = Participant.from(member);
            Color newColor = getNewColor(ploggingChatRoom);
            participant.setColor(newColor.name());

            ploggingChatRoom.addParticipant(participant);
//        } catch (Exception e) {
//            throw new RuntimeException(e);
//        } finally {
//        }

        return ploggingChatRepository.save(ploggingChatRoom);
    }

    private Color getNewColor(PloggingChatRoom ploggingChatRoom) {
        Set<Color> usedColors = new HashSet<>();
        if (ploggingChatRoom.getParticipantMap() == null || ploggingChatRoom.getParticipantMap().size() == 0) return Color.RED;
        for (Participant participant : ploggingChatRoom.getParticipantMap().values()) {
            usedColors.add(Color.valueOf(participant.getColor()));
        }

        int size = ploggingChatRoom.getParticipantMap().size() * 2;
        for (int i = 0; i < size; i++) {
            Color newColor = Color.randomColor();
            if (!usedColors.contains(newColor)) {
                return newColor;
            }
        }
        return Color.RED;
    }


    public void sendChatMessage(PloggingChatMessage chatMessage) {
//        chatMessage.setUserCount(chatRoomRepository.getUserCount(chatMessage.getRoomId()));
        if (MessageType.ENTER.equals(chatMessage.getType())) {
            chatMessage.setMessage(chatMessage.getSender().getNickname() + "님이 플로깅에 참여했습니다.");
            chatMessage.getSender().setNickname("[알림]");
        } else if (MessageType.QUIT.equals(chatMessage.getType())) {
            chatMessage.setMessage(chatMessage.getSender().getNickname() + "님이 플로깅을 종료했습니다.");
            chatMessage.getSender().setNickname("[알림]");
        } else if (MessageType.POS.equals(chatMessage.getType())) {

        } else if (MessageType.PING.equals(chatMessage.getType())) {
            if (chatMessage.getPingType().equals(PingType.ONE)) {

            } else if (chatMessage.getPingType().equals(PingType.TWO)) {

            } else if (chatMessage.getPingType().equals(PingType.THREE)) {

            } else {

            }
        } else {

        }

        redisTemplate.convertAndSend(ploggingTopic.getTopic(), chatMessage);
    }

    public void sendChatMessage(PloggingChatMessage chatMessage, String memberId) {
//        chatMessage.setUserCount(chatRoomRepository.getUserCount(chatMessage.getRoomId()));
//        Member member = memberRepository.findById(UUID.fromString(memberId)).orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
        PloggingChatRoom ploggingChatRoom = ploggingChatRepository.findById(chatMessage.getRoomId()).orElseThrow(() -> new NotFoundException("해당하는 방을 찾을 수 없습니다."));
        chatMessage.setSender(ploggingChatRoom.getParticipantMap().get(memberId));
        chatMessage.setSendTime(LocalDateTime.now());
        sendChatMessage(chatMessage);
    }

    synchronized public void quitRoom(String roomId, Member member) {
        PloggingChatRoom ploggingChatRoom = ploggingChatRepository.findById(roomId).orElseThrow(() -> new NotFoundException("방이 없습니다."));

        if (ploggingChatRoom.getParticipantMap() != null) {
            ploggingChatRoom.getParticipantMap().remove(member.getId().toString());

            if (ploggingChatRoom.getParticipantMap().size() == 0) {
                ploggingChatRepository.deleteById(roomId);
            } else {
                ploggingChatRepository.save(ploggingChatRoom);
            }
        }
    }

    public PloggingChatRoomResponse getRoomByCrewId(Long crewId) {
        Optional<PloggingChatRoom> byCrewId = ploggingChatRepository.findByCrewId(crewId);

        return byCrewId.map(PloggingChatRoomResponse::of).orElse(null);
    }

    public List<ActivateCrewPloggingResponse> getCrewPloggingListFromMemberId(String memberId) {
        List<MemberCrew> memberCrewListByMemberId = memberCrewRepository.findMemberCrewListByMemberId(UUID.fromString(memberId));
        List<ActivateCrewPloggingResponse> activateCrewPloggingResponses = new ArrayList<>();
        memberCrewListByMemberId.forEach(memberCrew -> {
            Optional<PloggingChatRoom> byCrewId = ploggingChatRepository.findByCrewId(memberCrew.getCrew().getId());
            if (byCrewId.isPresent()) {
                PloggingChatRoom ploggingChatRoom = byCrewId.get();
                activateCrewPloggingResponses.add(ActivateCrewPloggingResponse.of(ploggingChatRoom.getRoomId(), memberCrew.getCrew().getName(), memberCrew.getCrew().getId()));
            }
        });

        return activateCrewPloggingResponses;
    }
}
