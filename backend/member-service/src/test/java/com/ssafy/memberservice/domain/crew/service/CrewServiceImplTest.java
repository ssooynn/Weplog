package com.ssafy.memberservice.domain.crew.service;

import com.ssafy.memberservice.domain.crew.dao.CrewRepository;
import com.ssafy.memberservice.domain.crew.domain.Crew;
import com.ssafy.memberservice.domain.joinwaiting.domain.JoinWaiting;
import com.ssafy.memberservice.domain.membercrew.dao.MemberCrewRepository;
import com.ssafy.memberservice.domain.membercrew.domain.MemberCrew;
import com.ssafy.memberservice.global.common.error.exception.NotMatchException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.orm.ObjectOptimisticLockingFailureException;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.LockModeType;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.atomic.AtomicInteger;

import static com.ssafy.memberservice.global.common.error.exception.NotMatchException.CREW_MAX_PARTICIPANT_CNT_NOT_MATCH;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

//@SpringBootTest
class CrewServiceImplTest {

    @Autowired
    CrewRepository crewRepository;

    @Autowired
    MemberCrewRepository memberCrewRepository;

    @Autowired
    CrewService crewService;

    /*********************************************************
     * !!!!!!삽질 주의!!!!!
    * 빈으로 등록되지 않아서 AOP가 Transaction을 관리해주지 못함.
    * ********************************************************/
//    @Transactional(propagation = Propagation.REQUIRES_NEW, isolation = Isolation.SERIALIZABLE)
//    String addCrewMemberTest(Long crewId, MemberCrew memberCrew, AtomicInteger successCount) {
//        Crew findCrew = crewRepository.findByCrewIdForLock(crewId).get();
//        // 크루 최대 참여자 수 안넘는지 체크(최대참여자 수보다 작아야 로직 실행)
//        if (findCrew.getMemberCrewList().size() < findCrew.getMaxParticipantCnt()) {
//            System.out.println("현재 인원 수 : " + findCrew.getMemberCrewList().size());
//            memberCrewRepository.save(memberCrew);
//            successCount.getAndIncrement();
//            System.out.println("성공");
//            return "성공";
//        }else {
//            System.out.println("참여자 수 넘었다고 인지");
//            return "참여자 수 넘었다고 인지";
//        }
//    }
//
//    /* 테스트 성공 */
//    @Test
//    @DisplayName("크루 참가 동시성 테스트 -> Service 직접 호출")
//    void crewServiceTest() throws InterruptedException {
//        AtomicInteger successCount = new AtomicInteger();
//        int numberOfExcute = 7;
//        ExecutorService service = Executors.newFixedThreadPool(7);
//        CountDownLatch latch = new CountDownLatch(numberOfExcute);
//
//        // when
//        for (int i = 0; i < numberOfExcute; i++) {
//            int finalI = i;
//            service.execute(() -> {
//                try {
//                    crewService.accessJoinCrew(UUID.fromString("11ed5e5f-d431-a2da-a087-db4453b45882"), (50000L + finalI));
//                    System.out.println("TestId : " + finalI);
//                    successCount.getAndIncrement();
//                } catch (ObjectOptimisticLockingFailureException oe) {
//                    System.out.println("충돌감지");
//                } catch (Exception e) {
//                    System.out.println(e.getMessage());
//                }
//                latch.countDown();
//            });
//        }
//        latch.await();
//
//        // then (총원 5, 현재원 1, 4번의 성공만 일어나야함.)
//        assertThat(successCount.get()).isEqualTo(4);
//    }
}