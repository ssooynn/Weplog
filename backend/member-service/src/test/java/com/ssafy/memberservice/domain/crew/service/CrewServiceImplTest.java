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
import org.springframework.orm.ObjectOptimisticLockingFailureException;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.atomic.AtomicInteger;

import static com.ssafy.memberservice.global.common.error.exception.NotMatchException.CREW_MAX_PARTICIPANT_CNT_NOT_MATCH;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class CrewServiceImplTest {

    @Autowired
    CrewRepository crewRepository;

    @Autowired
    MemberCrewRepository memberCrewRepository;

    @Test
    @DisplayName("attend crew test -> concurrency complete O")
    public void attendCrewTest() throws InterruptedException {
        // given
//        Crew joinCrew = crewRepository.findById(8L).get();
//
//        MemberCrew TEST_MEMBER_CREW4= new MemberCrew(null, null, findCrew, 0, 0, 0, "test4", "");
//        MemberCrew TEST_MEMBER_CREW5= new MemberCrew(null, null, findCrew, 0, 0, 0, "test5", "");
//        MemberCrew TEST_MEMBER_CREW6= new MemberCrew(null, null, findCrew, 0, 0, 0, "test6", "");
//        MemberCrew TEST_MEMBER_CREW7= new MemberCrew(null, null, findCrew, 0, 0, 0, "test7", "");
//        List<MemberCrew> TEST_MEMBER_LIST = new ArrayList<>();
//        TEST_MEMBER_LIST.add(TEST_MEMBER_CREW1);
//        TEST_MEMBER_LIST.add(TEST_MEMBER_CREW2);
//        TEST_MEMBER_LIST.add(TEST_MEMBER_CREW3);
//        TEST_MEMBER_LIST.add(TEST_MEMBER_CREW4);
//        TEST_MEMBER_LIST.add(TEST_MEMBER_CREW5);
//        TEST_MEMBER_LIST.add(TEST_MEMBER_CREW6);
//        TEST_MEMBER_LIST.add(TEST_MEMBER_CREW7);

        AtomicInteger successCount = new AtomicInteger();
        int numberOfExcute = 7;
        ExecutorService service = Executors.newFixedThreadPool(7);
        CountDownLatch latch = new CountDownLatch(numberOfExcute);

        // when
        service.execute(() -> {
            try {
                Crew findCrew = crewRepository.findByCrewIdForLock(8L).get();
                // 크루 최대 참여자 수 안넘는지 체크(최대참여자 수보다 작아야 로직 실행)
                if (findCrew.getMemberCrewList().size() < findCrew.getMaxParticipantCnt()) {
                    MemberCrew TEST_MEMBER_CREW1= new MemberCrew(null, null, findCrew, 0, 0, 0, "test1", "");
                    memberCrewRepository.save(TEST_MEMBER_CREW1);
                    successCount.getAndIncrement();
                    System.out.println("성공");
                } else {
                    System.out.println("참여자 수 넘었다고 인지");
                }
            } catch (ObjectOptimisticLockingFailureException oe) {
                System.out.println("충돌감지");
            } catch (Exception e) {
                System.out.println(e.getMessage());
            }
            latch.countDown();
        });
        service.execute(() -> {
            try {
                Crew findCrew = crewRepository.findByCrewIdForLock(8L).get();
                // 크루 최대 참여자 수 안넘는지 체크(최대참여자 수보다 작아야 로직 실행)
                if (findCrew.getMemberCrewList().size() < findCrew.getMaxParticipantCnt()) {
                    MemberCrew TEST_MEMBER_CREW2= new MemberCrew(null, null, findCrew, 0, 0, 0, "test2", "");
                    memberCrewRepository.save(TEST_MEMBER_CREW2);
                    successCount.getAndIncrement();
                    System.out.println("성공");
                }else {
                    System.out.println("참여자 수 넘었다고 인지");
                }
            } catch (ObjectOptimisticLockingFailureException oe) {
                System.out.println("충돌감지");
            } catch (Exception e) {
                System.out.println(e.getMessage());
            }
            latch.countDown();
        });
        service.execute(() -> {
            try {
                Crew findCrew = crewRepository.findByCrewIdForLock(8L).get();
                // 크루 최대 참여자 수 안넘는지 체크(최대참여자 수보다 작아야 로직 실행)
                if (findCrew.getMemberCrewList().size() < findCrew.getMaxParticipantCnt()) {
                    MemberCrew TEST_MEMBER_CREW3= new MemberCrew(null, null, findCrew, 0, 0, 0, "test3", "");
                    memberCrewRepository.save(TEST_MEMBER_CREW3);
                    successCount.getAndIncrement();
                    System.out.println("성공");
                }else {
                    System.out.println("참여자 수 넘었다고 인지");
                }
            } catch (ObjectOptimisticLockingFailureException oe) {
                System.out.println("충돌감지");
            } catch (Exception e) {
                System.out.println(e.getMessage());
            }
            latch.countDown();
        });
        service.execute(() -> {
            try {
                Crew findCrew = crewRepository.findByCrewIdForLock(8L).get();
                // 크루 최대 참여자 수 안넘는지 체크(최대참여자 수보다 작아야 로직 실행)
                if (findCrew.getMemberCrewList().size() < findCrew.getMaxParticipantCnt()) {
                    MemberCrew TEST_MEMBER_CREW4= new MemberCrew(null, null, findCrew, 0, 0, 0, "test4", "");
                    memberCrewRepository.save(TEST_MEMBER_CREW4);
                    successCount.getAndIncrement();
                    System.out.println("성공");
                } else {
                    System.out.println("참여자 수 넘었다고 인지");
                }
            } catch (ObjectOptimisticLockingFailureException oe) {
                System.out.println("충돌감지");
            } catch (Exception e) {
                System.out.println(e.getMessage());
            }
            latch.countDown();
        });
        service.execute(() -> {
            try {
                Crew findCrew = crewRepository.findByCrewIdForLock(8L).get();
                // 크루 최대 참여자 수 안넘는지 체크(최대참여자 수보다 작아야 로직 실행)
                if (findCrew.getMemberCrewList().size() < findCrew.getMaxParticipantCnt()) {
                    MemberCrew TEST_MEMBER_CREW5= new MemberCrew(null, null, findCrew, 0, 0, 0, "test5", "");
                    memberCrewRepository.save(TEST_MEMBER_CREW5);
                    successCount.getAndIncrement();
                    System.out.println("성공");
                }else {
                    System.out.println("참여자 수 넘었다고 인지");
                }
            } catch (ObjectOptimisticLockingFailureException oe) {
                System.out.println("충돌감지");
            } catch (Exception e) {
                System.out.println(e.getMessage());
            }
            latch.countDown();
        });
        service.execute(() -> {
            try {
                Crew findCrew = crewRepository.findByCrewIdForLock(8L).get();
                // 크루 최대 참여자 수 안넘는지 체크(최대참여자 수보다 작아야 로직 실행)
                if (findCrew.getMemberCrewList().size() < findCrew.getMaxParticipantCnt()) {
                    MemberCrew TEST_MEMBER_CREW6= new MemberCrew(null, null, findCrew, 0, 0, 0, "test6", "");
                    memberCrewRepository.save(TEST_MEMBER_CREW6);
                    successCount.getAndIncrement();
                    System.out.println("성공");
                }else {
                    System.out.println("참여자 수 넘었다고 인지");
                }
            } catch (ObjectOptimisticLockingFailureException oe) {
                System.out.println("충돌감지");
            } catch (Exception e) {
                System.out.println(e.getMessage());
            }
            latch.countDown();
        });
        service.execute(() -> {
            try {
                Crew findCrew = crewRepository.findByCrewIdForLock(8L).get();
                // 크루 최대 참여자 수 안넘는지 체크(최대참여자 수보다 작아야 로직 실행)
                if (findCrew.getMemberCrewList().size() < findCrew.getMaxParticipantCnt()) {
                    MemberCrew TEST_MEMBER_CREW7= new MemberCrew(null, null, findCrew, 0, 0, 0, "test7", "");
                    memberCrewRepository.save(TEST_MEMBER_CREW7);
                    successCount.getAndIncrement();
                    System.out.println("성공");
                }else {
                    System.out.println("참여자 수 넘었다고 인지");
                }
            } catch (ObjectOptimisticLockingFailureException oe) {
                System.out.println("충돌감지");
            } catch (Exception e) {
                System.out.println(e.getMessage());
            }
            latch.countDown();
        });

        latch.await();

        // then (총원 5, 현재원 1, 4번의 성공만 일어나야함.)
        assertThat(successCount.get()).isEqualTo(4);
    }
}