package com.ssafy.memberservice.domain.member.dao;

import com.ssafy.memberservice.domain.member.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

public interface MemberRepository extends JpaRepository<Member, UUID> {

    Optional<Member> findByEmail(String email);
    //
    boolean existsByEmail(String email);

    boolean existsByNickname(String nickname);
    //
    @Query("SELECT m.refreshToken FROM Member m WHERE m.id=:id")
    String getRefreshTokenById(@Param("id") UUID id);

    @Transactional
    @Modifying
    @Query("UPDATE Member m SET m.refreshToken=:token WHERE m.id=:id")
    void updateRefreshToken(@Param("id") UUID id, @Param("token") String token);

    Optional<Member> findBySocialId(String socialId);

    @Query("select m from Member m where m.nickname=:nickname")
    Optional<Member> findByNickname(String nickname);
}
