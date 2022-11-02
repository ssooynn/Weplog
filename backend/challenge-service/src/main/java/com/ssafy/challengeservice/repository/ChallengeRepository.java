package com.ssafy.challengeservice.repository;

import com.ssafy.challengeservice.domain.challenge.Challenge;
import com.ssafy.challengeservice.dto.ChallengeRankingDtoInterface;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ChallengeRepository extends JpaRepository<Challenge, Long> {
    @Query("select c from Challenge c where c.finishFlag=false")
    Slice<Challenge> getChallengeList(Pageable pageable);

    @Query("select c from Challenge c where c.title like %:title% and c.finishFlag=false")
    Slice<Challenge> getChallengeByTitle(String title, Pageable pageable);

    @Query("select c.challenge from MemberChallenge c where c.member.id=:id")
    Slice<Challenge> getChallengeByID(String id, Pageable pageable);

    @Query("select c from Challenge c join fetch c.challengeType ct join fetch ct.challengeLimit where c.id = :challengeId")
    Optional<Challenge> findByChallengeIdWithLimit(Long challengeId);

    @Query("select c from Challenge c join fetch c.member where c.id = :challengeId")
    Optional<Challenge> findByIdWithMember(Long challengeId);

    @Query("select c from Challenge c join fetch c.member where c.endDate < current_date")
    List<Challenge> findAllMustFinishChallenge();

    @Modifying
    @Query("update Challenge c set c.finishFlag = true where c.endDate < current_date ")
    int updateFinishChallenge();

    @Query(value = "select pr.member_id memberId, m.name name, m.nickname nickname, m.profile_image_url profileImageUrl, contribution, rank() over (ORDER BY contribution desc) as ranking, pr.challenge_id challengeId\n" +
            "from (select p.member_id, sum_distance, (sum_distance / c.goal * 100) contribution, p.challenge_id\n" +
            "from (select member_id, sum(distance) sum_distance, challenge_id, challenge_id\n" +
            "            from plogging\n" +
            "            where challenge_id = :challengeId\n" +
            "            group by member_id) p join challenge c on p.challenge_id = c.challenge_id) pr join member m on pr.member_id = m.member_id;"
            , nativeQuery = true)
    List<ChallengeRankingDtoInterface> getDistanceRankingByChallengeId(Long challengeId);

    @Query(value = "select pr.member_id memberId, m.name name, m.nickname nickname, m.profile_image_url profileImageUrl, contribution, rank() over (ORDER BY contribution desc) as ranking, pr.challenge_id challengeId\n" +
            "from (select p.member_id, sum_time, (sum_time / c.goal * 100) contribution, p.challenge_id\n" +
            "from (select member_id, sum(time) sum_time, challenge_id, challenge_id\n" +
            "            from plogging\n" +
            "            where challenge_id = :challengeId\n" +
            "            group by member_id) p join challenge c on p.challenge_id = c.challenge_id) pr join member m on pr.member_id = m.member_id;"
            , nativeQuery = true)
    List<ChallengeRankingDtoInterface> getTimeRankingByChallengeId(Long challengeId);

    @Query(value = "select pr.member_id memberId, m.name name, m.nickname nickname, m.profile_image_url profileImageUrl, contribution, rank() over (ORDER BY contribution desc) as ranking, pr.challenge_id challengeId\n" +
            "from (select p.member_id, cnt, (cnt / c.goal * 100) contribution, p.challenge_id\n" +
            "from (select member_id, count(*) cnt, challenge_id, challenge_id\n" +
            "            from plogging\n" +
            "            where challenge_id = :challengeId\n" +
            "            group by member_id) p join challenge c on p.challenge_id = c.challenge_id) pr join member m on pr.member_id = m.member_id;"
            , nativeQuery = true)
    List<ChallengeRankingDtoInterface> getCntRankingByChallengeId(Long challengeId);
}
