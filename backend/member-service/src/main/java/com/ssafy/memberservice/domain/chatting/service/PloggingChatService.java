package com.ssafy.memberservice.domain.chatting.service;

import com.ssafy.memberservice.domain.chatting.dao.PloggingChatRepository;
import com.ssafy.memberservice.domain.chatting.domain.Participant;
import com.ssafy.memberservice.domain.chatting.domain.PloggingChatRoom;
import com.ssafy.memberservice.domain.chatting.domain.enums.Color;
import com.ssafy.memberservice.domain.chatting.domain.enums.MessageType;
import com.ssafy.memberservice.domain.chatting.domain.enums.PingType;
import com.ssafy.memberservice.domain.chatting.dto.PloggingChatMessage;
import com.ssafy.memberservice.domain.chatting.dto.PloggingChatRoomResponse;
import com.ssafy.memberservice.domain.member.dao.MemberRepository;
import com.ssafy.memberservice.domain.member.domain.Member;
import com.ssafy.memberservice.domain.membercrew.dao.MemberCrewRepository;
import com.ssafy.memberservice.domain.membercrew.domain.MemberCrew;
import com.ssafy.memberservice.global.common.error.exception.DuplicateException;
import com.ssafy.memberservice.global.common.error.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.stereotype.Service;

import java.util.*;

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

    public void joinRoom(Member member, String roomId) {
        PloggingChatRoom ploggingChatRoom = ploggingChatRepository.findById(roomId).orElseThrow(() -> new NotFoundException("해당 방이 존재하지 않습니다."));


        Participant participant = Participant.from(member);
        Color newColor = getNewColor(ploggingChatRoom);
        participant.setColor(newColor.name());
        if (ploggingChatRoom.getPlayerMap() == null || ploggingChatRoom.getPlayerMap().size() == 0) {
//            ploggingChatRoom = new HashMap<>();
        }
        ploggingChatRoom.getPlayerMap().put(member.getId().toString(), participant);
        ploggingChatRepository.save(ploggingChatRoom);
    }

    private Color getNewColor(PloggingChatRoom ploggingChatRoom) {
        Set<Color> usedColors = new HashSet<>();
        if (ploggingChatRoom.getPlayerMap() == null ||ploggingChatRoom.getPlayerMap().size() == 0) return Color.RED;
        for (Participant participant : ploggingChatRoom.getPlayerMap().values()) {
            usedColors.add(Color.valueOf(participant.getColor()));
        }

        int size = ploggingChatRoom.getPlayerMap().size() * 2;
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
            chatMessage.setMessage(chatMessage.getSender() + "님이 플로깅에 참여했습니다.");
            chatMessage.setSender("[알림]");
        } else if (MessageType.QUIT.equals(chatMessage.getType())) {
            chatMessage.setMessage(chatMessage.getSender() + "님이 플로깅을 종료했습니다.");
            chatMessage.setSender("[알림]");
        } else if (MessageType.POS.equals(chatMessage.getType())) {

        } else if (MessageType.PING.equals(chatMessage.getType())) {
            if (chatMessage.getPingType().equals(PingType.ONE)) {

            } else if (chatMessage.getPingType().equals(PingType.TWO)) {

            } else if (chatMessage.getPingType().equals(PingType.THREE)) {

            } else {

            }
        }
        redisTemplate.convertAndSend(ploggingTopic.getTopic(), chatMessage);
    }

    public void sendChatMessage(PloggingChatMessage chatMessage, String memberId) {
//        chatMessage.setUserCount(chatRoomRepository.getUserCount(chatMessage.getRoomId()));
        Member member = memberRepository.findById(UUID.fromString(memberId)).orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
        chatMessage.setSender(member.getNickname());
        sendChatMessage(chatMessage);
    }

    public void quitRoom(String roomId, Member member) {
        PloggingChatRoom ploggingChatRoom = ploggingChatRepository.findById(roomId).orElseThrow(() -> new NotFoundException("방이 없습니다."));

        ploggingChatRoom.getPlayerMap().remove(member.getId().toString());

        if (ploggingChatRoom.getPlayerMap().size() == 0) {
            ploggingChatRepository.deleteById(roomId);
        }
    }

    public PloggingChatRoomResponse getRoomByCrewId(Long crewId) {
        PloggingChatRoom ploggingChatRoom = ploggingChatRepository.findByCrewId(crewId).orElseThrow(() -> new NotFoundException("크루 플로깅 방이 없습니다."));

        return PloggingChatRoomResponse.of(ploggingChatRoom);
    }
}
