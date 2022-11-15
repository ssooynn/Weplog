package com.ssafy.memberservice.global.security.handler;

import com.ssafy.memberservice.domain.chatting.dao.redis.RoomOfSessionRepository;
import com.ssafy.memberservice.domain.chatting.domain.redis.CrewChatRoom;
import com.ssafy.memberservice.domain.chatting.domain.Participant;
import com.ssafy.memberservice.domain.chatting.domain.redis.PloggingChatRoom;
import com.ssafy.memberservice.domain.chatting.domain.redis.RoomOfSession;
import com.ssafy.memberservice.domain.chatting.domain.enums.MessageType;
import com.ssafy.memberservice.domain.chatting.domain.enums.RoomType;
import com.ssafy.memberservice.domain.chatting.dto.chat.ChatMessage;
import com.ssafy.memberservice.domain.chatting.dto.chat.PloggingChatMessage;
import com.ssafy.memberservice.domain.chatting.service.CrewChatService;
import com.ssafy.memberservice.domain.chatting.service.PloggingChatService;
import com.ssafy.memberservice.domain.member.dao.MemberRepository;
import com.ssafy.memberservice.domain.member.domain.Member;
import com.ssafy.memberservice.global.common.error.exception.NotFoundException;
import com.ssafy.memberservice.global.security.util.JwtTokenProvider;
import io.jsonwebtoken.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.UUID;

import static com.ssafy.memberservice.global.common.error.exception.NotFoundException.USER_NOT_FOUND;

@Slf4j
@Component
@RequiredArgsConstructor
public class StompHandler implements ChannelInterceptor {

    @Value("${token.secret}")
    private String secretKey;

    private final JwtTokenProvider jwtTokenProvider;

    private final CrewChatService crewChatService;

    private final PloggingChatService ploggingChatService;

    private final RoomOfSessionRepository roomOfSessionRepository;

    private final MemberRepository memberRepository;

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {

        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);

        if (StompCommand.CONNECT == accessor.getCommand()) {
            if (!jwtTokenProvider.validateToken(extractToken(accessor))) {
                throw new AccessDeniedException("연결 거부");
            }
        } else if (StompCommand.SUBSCRIBE == accessor.getCommand()) { // 채팅룸 구독요청
            // header정보에서 구독 destination정보를 얻고, roomId를 추출한다.
            String roomId = crewChatService.getRoomId(Optional.ofNullable((String) message.getHeaders().get("simpDestination")).orElse("InvalidRoomId"));
            String uri = crewChatService.getUriWithoutRoomId(Optional.ofNullable((String) message.getHeaders().get("simpDestination")).orElse("InvalidRoomId"));
            // 채팅방에 들어온 클라이언트 sessionId를 roomId와 맵핑해 놓는다.(나중에 특정 세션이 어떤 채팅방에 들어가 있는지 알기 위함)
            String sessionId = (String) message.getHeaders().get("simpSessionId");
            // 채팅방의 인원수를 +1한다.
//            chatRoomRepository.plusUserCount(roomId);
            // 클라이언트 입장 메시지를 채팅방에 발송한다.(redis publish)
            String memberId = jwtTokenProvider.getSubject(extractToken(accessor));
//            String memberId = Optional.ofNullable((Principal) message.getHeaders().get("simpUser")).map(Principal::getName).orElse("UnknownUser");

            Member member = memberRepository.findById(UUID.fromString(memberId)).orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
            if ("plogging".equals(uri)) {

                roomOfSessionRepository.save(RoomOfSession.builder()
                        .sessionId(sessionId)
                        .roomId(roomId)
                        .roomType(RoomType.PLOGGING)
                        .memberId(memberId)
                        .build());

                PloggingChatRoom ploggingChatRoom = ploggingChatService.joinRoom(member, roomId);
                ploggingChatService.sendChatMessage(PloggingChatMessage.builder().type(MessageType.ENTER).roomId(roomId).sender(ploggingChatRoom.getParticipantMap().get(memberId)).sendTime(LocalDateTime.now()).build());
            } else {
                roomOfSessionRepository.save(RoomOfSession.builder()
                        .sessionId(sessionId)
                        .roomId(roomId)
                        .roomType(RoomType.CREW)
                        .memberId(memberId)
                        .build());

                CrewChatRoom crewChatRoom = crewChatService.joinRoom(Long.valueOf(roomId), member);
                crewChatService.sendChatMessage(new ChatMessage(MessageType.ENTER, roomId, crewChatRoom.getParticipantMap().get(memberId), "", LocalDateTime.now()));
            }
            log.info("SUBSCRIBED {}, {}", member.getNickname(), roomId);
        } else if (StompCommand.DISCONNECT == accessor.getCommand()) { // Websocket 연결 종료
            // 연결이 종료된 클라이언트 sesssionId로 채팅방 id를 얻는다.
            String sessionId = (String) message.getHeaders().get("simpSessionId");
            RoomOfSession roomOfSession = roomOfSessionRepository.findById(sessionId).orElseThrow(NoSuchElementException::new);

//            String memberId = jwtTokenProvider.getSubject(extractToken(accessor));
            Member member = memberRepository.findById(UUID.fromString(roomOfSession.getMemberId())).orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));

            // 클라이언트 퇴장 메시지를 채팅방에 발송한다.(redis publish)
            // 채팅방의 인원수를 -1한다.
            if (roomOfSession.getRoomType().equals(RoomType.CREW)) {

                crewChatService.quitRoom(Long.valueOf(roomOfSession.getRoomId()), member);
                crewChatService.sendChatMessage(new ChatMessage(MessageType.QUIT, roomOfSession.getRoomId(), Participant.from(member), "", LocalDateTime.now()));

            } else {
                ploggingChatService.quitRoom(roomOfSession.getRoomId(), member);
                ploggingChatService.sendChatMessage(PloggingChatMessage.builder().type(MessageType.QUIT).roomId(roomOfSession.getRoomId()).sender(Participant.from(member)).build());
            }

            log.info("DISCONNECTED {}, {}", sessionId, roomOfSession.getRoomId());
            // 퇴장한 클라이언트의 roomId 맵핑 정보를 삭제한다.
            roomOfSessionRepository.deleteById(sessionId);
        }
        return message;
    }

    private String extractToken(StompHeaderAccessor accessor) {
        String bearerToken = accessor.getFirstNativeHeader(HttpHeaders.AUTHORIZATION);

        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }

    public boolean isValidToken(String jwtToken) {
        try {
            return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(jwtToken) != null;
        } catch (SignatureException ex) {
            log.error("Invalid JWT signature");
            throw ex;
        } catch (MalformedJwtException ex) {
            log.error("Invalid JWT token");
            throw ex;
        } catch (ExpiredJwtException ex) {
            log.error("Expired JWT token");
            throw ex;
        } catch (UnsupportedJwtException ex) {
            log.error("Unsupported JWT token");
            throw ex;
        } catch (IllegalArgumentException ex) {
            log.error("JWT claims string is empty.");
            throw ex;
        } catch (Exception e) {
            throw e;
        }
    }
}
