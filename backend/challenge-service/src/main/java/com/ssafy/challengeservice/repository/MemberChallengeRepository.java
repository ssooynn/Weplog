package com.ssafy.challengeservice.repository;

import com.ssafy.challengeservice.domain.challengetype.ChallengeType;
import com.ssafy.challengeservice.domain.memberchallenge.MemberChallenge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface MemberChallengeRepository extends JpaRepository<MemberChallenge, Long> {

    @Query("select count(m) from MemberChallenge m where m.challenge.id=:id")
    int getParticipantsCnt(Long id);

    @Query("select mc from MemberChallenge mc join fetch mc.challenge where mc.challenge.id = :challengeId and mc.member.id = :memberId")
    Optional<MemberChallenge> findByChallengeIdAndMemberId(Long challengeId, UUID memberId);

    @Query("select mc from MemberChallenge mc join fetch mc.challenge c join fetch c.challengeType ct where mc.member.id = :memberId and ct = :challengeType and c.finishFlag = false ")
    List<MemberChallenge> findDuplicatedChallengeType(UUID memberId, ChallengeType challengeType);

    @Query("select mc from MemberChallenge mc join fetch mc.challenge c where mc.member.id = :memberId and c.finishFlag = false")
    List<MemberChallenge> findByMemberIdWithChallengeInProgress(UUID memberId);

    @Query("select mc from MemberChallenge mc join fetch mc.challenge c where mc.member.id = :memberId and c.finishFlag = true")
    List<MemberChallenge> findByMemberIdWithChallengeEnd(UUID memberId);
}
