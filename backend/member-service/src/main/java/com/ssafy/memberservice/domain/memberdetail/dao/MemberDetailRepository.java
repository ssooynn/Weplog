package com.ssafy.memberservice.domain.memberdetail.dao;

import com.ssafy.memberservice.domain.memberdetail.domain.MemberDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;
import java.util.UUID;

public interface MemberDetailRepository extends JpaRepository<MemberDetail, Long> {

    @Query("select md from MemberDetail md where md.member.id = :memberId")
    Optional<MemberDetail> findByMemberId(UUID memberId);
}
