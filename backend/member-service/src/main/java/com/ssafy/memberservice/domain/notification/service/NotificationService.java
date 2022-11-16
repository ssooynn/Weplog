package com.ssafy.memberservice.domain.notification.service;


import com.ssafy.memberservice.domain.member.dao.MemberRepository;
import com.ssafy.memberservice.domain.notification.repository.EmitterRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.Map;
import java.util.UUID;

import static org.springframework.retry.policy.TimeoutRetryPolicy.DEFAULT_TIMEOUT;

@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationService {

    private final EmitterRepository emitterRepository;

    private final MemberRepository memberRepository;

    public SseEmitter subscribe(UUID userId, String lastEventId) {

        String id = userId + "_" + System.currentTimeMillis();

        SseEmitter emitter = emitterRepository.save(id, new SseEmitter(60 * 1000L));
        emitter.onCompletion(() -> emitterRepository.deleteById(id));
        emitter.onTimeout(() -> emitterRepository.deleteById(id));

        // 503 에러를 방지하기 위한 더미"" 이벤트 전송
        sendToClient(emitter, id, "EventStream Created. [userId=" + userId + "]", "sse");

        // 클라이언트가 미수신한 Event 목록이 존재할 경우 전송하여 Event 유실을 예방
        if (!lastEventId.isEmpty()) {
            Map<String, Object> events = emitterRepository.findAllEventCacheStartWithId(String.valueOf(userId));
            events.entrySet().stream()
                    .filter(entry -> lastEventId.compareTo(entry.getKey()) < 0)
                    .forEach(entry -> sendToClient(emitter, entry.getKey(), entry.getValue(), "message"));
        }

        return emitter;
    }

    private void sendToClient(SseEmitter emitter, String id, Object data, String target) {

        try {
            emitter.send(SseEmitter.event()
                    .id(id)
                    .name(target)
                    .data(data));
        } catch (IOException exception) {
            emitterRepository.deleteById(id);
//            throw new RuntimeException("연결 오류!");
        }
    }

    public void send(UUID userId, String value, String target) {
        String id = String.valueOf(userId);

        log.info("Service send - id = {} - val - {}", id, value);
        Map<String, SseEmitter> sseEmitters = emitterRepository.findAllStartWithById(id);
        sseEmitters.forEach(
                (key, emitter) -> {
//                    friendRepository.save(friend);
                    emitterRepository.saveEventCache(key, value);
                    sendToClient(emitter, key, value, target);
                }
        );
    }
}
